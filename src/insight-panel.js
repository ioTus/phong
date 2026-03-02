/**
 * Insight Panel — Controls and code exploration for the Phong viewer.
 */
import { getModulePath } from './registry.js';

export class InsightPanel {
  constructor(stage, entry, setupFn, options = {}) {
    this.stage = stage;
    this.entry = entry;
    this.setupFn = setupFn;
    this._defaults = options.defaults || { bgColor: '#000000', hueRotate: 0, speed: 1 };
    this._onControlChange = options.onControlChange || (() => {});
    this._onReset = options.onReset || (() => {});
    this._open = false;
    this._activeTab = 'controls';
    this._panelEl = document.getElementById('insight-panel');
    this._toggleBtn = document.getElementById('insight-toggle');

    this._buildDOM();
    this._bindControls();
    this._startStatsUpdate();

    this._toggleBtn.addEventListener('click', () => this.toggle());

    // Open by default
    this.toggle();
  }

  // ── Panel Toggle ──

  toggle() {
    this._open = !this._open;
    this._panelEl.classList.toggle('open', this._open);
    this._toggleBtn.classList.toggle('active', this._open);
    if (this._open && this._activeTab === 'code' && !this._codeLoaded) {
      this._loadSource();
    }
  }

  // ── DOM Construction ──

  _buildDOM() {
    this._panelEl.innerHTML = `
      <div class="insight-tabs">
        <button class="active" data-tab="controls">Controls</button>
        <button data-tab="code">Code</button>
      </div>
      <div class="insight-tab-content">
        <div class="active" data-tab="controls">
          ${this._buildControlsHTML()}
        </div>
        <div data-tab="code">
          <div class="code-loading">Loading source...</div>
        </div>
      </div>
    `;

    // Tab switching
    const tabs = this._panelEl.querySelectorAll('.insight-tabs button');
    const panels = this._panelEl.querySelectorAll('.insight-tab-content > div');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        this._panelEl.querySelector(`.insight-tab-content > [data-tab="${target}"]`).classList.add('active');
        this._activeTab = target;
        if (target === 'code' && !this._codeLoaded) {
          this._loadSource();
        }
      });
    });
  }

  _buildControlsHTML() {
    return `
      <div class="control-group">
        <label>Background Color</label>
        <div class="control-row">
          <div class="color-swatch" id="bg-swatch" style="background: ${this.stage.bgColor}">
            <input type="color" id="bg-color-picker" value="${this.stage.bgColor}">
          </div>
          <input type="text" class="color-hex" id="bg-hex" value="${this.stage.bgColor}" maxlength="7" spellcheck="false">
          <div class="color-presets">
            <div class="color-preset" style="background: #000000" data-color="#000000" title="Black"></div>
            <div class="color-preset" style="background: #ffffff" data-color="#ffffff" title="White"></div>
            <div class="color-preset" style="background: #1a1a2e" data-color="#1a1a2e" title="Navy"></div>
            <div class="color-preset" style="background: #2d1b2e" data-color="#2d1b2e" title="Plum"></div>
          </div>
        </div>
      </div>

      <div class="control-group">
        <label>Hue Shift</label>
        <div class="slider-row">
          <input type="range" id="hue-slider" min="0" max="360" step="1" value="${this.stage.hueRotate}">
          <span class="slider-value" id="hue-value">${this.stage.hueRotate}&deg;</span>
        </div>
      </div>

      <div class="control-group">
        <label>Object Color</label>
        <div class="control-row">
          <div class="color-swatch" id="tint-swatch" style="background: ${this.stage.tintColor || 'transparent'}">
            <input type="color" id="tint-color-picker" value="${this.stage.tintColor || '#ff4444'}">
          </div>
          <input type="text" class="color-hex" id="tint-hex"
                 value="${this.stage.tintColor || ''}"
                 placeholder="none" maxlength="7" spellcheck="false">
          <div class="color-presets" id="tint-presets">
            <div class="color-preset" style="background: #ff4444" data-color="#ff4444" title="Red"></div>
            <div class="color-preset" style="background: #44aaff" data-color="#44aaff" title="Blue"></div>
            <div class="color-preset" style="background: #44ff88" data-color="#44ff88" title="Green"></div>
            <div class="color-preset tint-clear" data-color="" title="Clear tint">&times;</div>
          </div>
        </div>
        <div class="slider-row" style="margin-top: 0.5rem;">
          <input type="range" id="tint-intensity" min="0" max="100" step="1"
                 value="${Math.round((this.stage.tintIntensity || 0) * 100)}">
          <span class="slider-value" id="tint-intensity-value">${Math.round((this.stage.tintIntensity || 0) * 100)}%</span>
        </div>
      </div>

      <div class="control-group">
        <label>Playback</label>
        <div class="control-row">
          <button class="control-btn active" id="play-btn">Pause</button>
          <button class="control-btn" id="reset-btn">Reset</button>
        </div>
        <div class="slider-row" style="margin-top: 0.5rem;">
          <input type="range" id="speed-slider" min="0.25" max="3" step="0.25" value="${this.stage._speed}">
          <span class="slider-value" id="speed-value">${this.stage._speed}x</span>
        </div>
        <div class="control-row" style="margin-top: 0.5rem;">
          <button class="control-btn restore-btn" id="restore-btn">Restore Defaults</button>
        </div>
      </div>

      <div class="control-group">
        <label>Stats</label>
        <div class="stats-grid">
          <span class="stat-label">Objects</span>
          <span class="stat-value" id="stat-objects">—</span>
          <span class="stat-label">Frame</span>
          <span class="stat-value" id="stat-frame">—</span>
          <span class="stat-label">Mouse</span>
          <span class="stat-value" id="stat-mouse">—</span>
        </div>
      </div>
    `;
  }

  // ── Control Bindings ──

  _bindControls() {
    const $ = (id) => this._panelEl.querySelector(`#${id}`);

    // Background color picker
    const picker = $('bg-color-picker');
    const swatch = $('bg-swatch');
    const hexInput = $('bg-hex');

    const setBgColor = (color) => {
      this.stage.bgColor = color;
      swatch.style.background = color;
      picker.value = color;
      hexInput.value = color;
      this._onControlChange({ bgColor: color });
    };

    picker.addEventListener('input', (e) => setBgColor(e.target.value));

    hexInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        setBgColor(val);
      }
    });
    hexInput.addEventListener('blur', () => {
      hexInput.value = this.stage.bgColor;
    });

    // Bg presets (only the ones NOT inside #tint-presets)
    this._panelEl.querySelectorAll('.color-presets:not(#tint-presets) .color-preset').forEach(preset => {
      preset.addEventListener('click', () => setBgColor(preset.dataset.color));
    });

    // Hue shift
    const hueSlider = $('hue-slider');
    const hueValue = $('hue-value');
    hueSlider.addEventListener('input', () => {
      const v = parseInt(hueSlider.value);
      this.stage.hueRotate = v;
      hueValue.innerHTML = `${v}&deg;`;
      this._onControlChange({ hueRotate: v });
    });

    // Object color tint
    const tintPicker = $('tint-color-picker');
    const tintSwatch = $('tint-swatch');
    const tintHex = $('tint-hex');
    const tintSlider = $('tint-intensity');
    const tintSliderValue = $('tint-intensity-value');

    const setTintColor = (color) => {
      if (color) {
        this.stage.tintColor = color;
        tintSwatch.style.background = color;
        tintPicker.value = color;
        tintHex.value = color;
        // Auto-bump intensity if currently off
        if (this.stage.tintIntensity === 0) {
          this.stage.tintIntensity = 1.0;
          tintSlider.value = 100;
          tintSliderValue.textContent = '100%';
        }
      } else {
        this.stage.tintColor = null;
        this.stage.tintIntensity = 0;
        tintSwatch.style.background = 'transparent';
        tintHex.value = '';
        tintSlider.value = 0;
        tintSliderValue.textContent = '0%';
      }
      this._onControlChange({
        tintColor: this.stage.tintColor,
        tintIntensity: this.stage.tintIntensity,
      });
    };

    tintPicker.addEventListener('input', (e) => setTintColor(e.target.value));

    tintHex.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        setTintColor(val);
      }
    });
    tintHex.addEventListener('blur', () => {
      tintHex.value = this.stage.tintColor || '';
    });

    this._panelEl.querySelectorAll('#tint-presets .color-preset').forEach(preset => {
      preset.addEventListener('click', () => setTintColor(preset.dataset.color || null));
    });

    tintSlider.addEventListener('input', () => {
      const v = parseInt(tintSlider.value);
      this.stage.tintIntensity = v / 100;
      tintSliderValue.textContent = `${v}%`;
      this._onControlChange({ tintIntensity: this.stage.tintIntensity });
    });

    // Play/Pause
    const playBtn = $('play-btn');
    playBtn.addEventListener('click', () => {
      if (this.stage._running) {
        this.stage.stop();
        playBtn.textContent = 'Play';
        playBtn.classList.remove('active');
      } else {
        this.stage.start();
        playBtn.textContent = 'Pause';
        playBtn.classList.add('active');
      }
    });

    // Speed
    const speedSlider = $('speed-slider');
    const speedValue = $('speed-value');
    speedSlider.addEventListener('input', () => {
      const v = parseFloat(speedSlider.value);
      this.stage._speed = v;
      speedValue.textContent = `${v}x`;
      this._onControlChange({ speed: v });
    });

    // Reset — restarts the animation but keeps color customizations
    const resetBtn = $('reset-btn');
    resetBtn.addEventListener('click', async () => {
      // Snapshot current color state
      const bg = this.stage.bgColor;
      const hue = this.stage.hueRotate;
      const tint = this.stage.tintColor;
      const tintInt = this.stage.tintIntensity;
      // Reset and re-run setup
      this.stage.reset();
      await this.setupFn(this.stage);
      // Restore color customizations
      this.stage.bgColor = bg;
      this.stage.hueRotate = hue;
      this.stage.tintColor = tint;
      this.stage.tintIntensity = tintInt;
      this.stage._speed = parseFloat(speedSlider.value);
      this.stage.start();
      playBtn.textContent = 'Pause';
      playBtn.classList.add('active');
    });

    // Restore Defaults — reverts everything to original state and clears saved data
    const restoreBtn = $('restore-btn');
    restoreBtn.addEventListener('click', async () => {
      this.stage.reset();
      this.stage.bgColor = this._defaults.bgColor;
      this.stage.hueRotate = this._defaults.hueRotate;
      this.stage._speed = this._defaults.speed;
      this.stage.tintColor = this._defaults.tintColor || null;
      this.stage.tintIntensity = this._defaults.tintIntensity || 0;
      await this.setupFn(this.stage);
      this.stage.start();
      // Reset all UI controls
      setBgColor(this._defaults.bgColor);
      hueSlider.value = this._defaults.hueRotate;
      hueValue.innerHTML = `${this._defaults.hueRotate}&deg;`;
      setTintColor(this._defaults.tintColor || null);
      speedSlider.value = this._defaults.speed;
      speedValue.textContent = `${this._defaults.speed}x`;
      playBtn.textContent = 'Pause';
      playBtn.classList.add('active');
      // Clear saved customization
      this._onReset();
    });
  }

  // ── Live Stats ──

  _startStatsUpdate() {
    const update = () => {
      if (this._open && this._activeTab === 'controls') {
        const objectsEl = this._panelEl.querySelector('#stat-objects');
        const frameEl = this._panelEl.querySelector('#stat-frame');
        const mouseEl = this._panelEl.querySelector('#stat-mouse');
        if (objectsEl) {
          objectsEl.textContent = `${this.stage._objectCount} / ${this.stage.MAX_OBJECTS}`;
        }
        if (frameEl) {
          frameEl.textContent = this.stage._frameCount;
        }
        if (mouseEl) {
          mouseEl.textContent = `${Math.round(this.stage.mouse.x)}, ${Math.round(this.stage.mouse.y)}`;
        }
      }
      requestAnimationFrame(update);
    };
    update();
  }

  // ── Code Tab ──

  _codeLoaded = false;

  async _loadSource() {
    const path = getModulePath(this.entry);
    const codePanel = this._panelEl.querySelector('.insight-tab-content > [data-tab="code"]');

    if (!path) {
      codePanel.innerHTML = '<div class="code-loading">Source path not available</div>';
      return;
    }

    try {
      const res = await fetch(path);
      const source = await res.text();
      const annotations = this._findAnnotations(source);
      const highlighted = this._highlightAndAnnotate(source, annotations);
      codePanel.innerHTML = `
        <div class="code-toolbar">
          <button class="control-btn active" id="wrap-toggle">\u2713 Word Wrap</button>
        </div>
        <div class="code-container"><pre class="wrap">${highlighted}</pre></div>`;
      this._codeLoaded = true;

      const wrapBtn = codePanel.querySelector('#wrap-toggle');
      const pre = codePanel.querySelector('pre');
      wrapBtn.addEventListener('click', () => {
        const on = pre.classList.toggle('wrap');
        wrapBtn.classList.toggle('active', on);
        wrapBtn.textContent = on ? '\u2713 Word Wrap' : 'Word Wrap';
      });
    } catch (e) {
      codePanel.innerHTML = `<div class="code-loading">Could not load source: ${e.message}</div>`;
    }
  }

  _highlightAndAnnotate(source, annotations) {
    const lines = source.split('\n');
    const annotationMap = {};
    for (const a of annotations) {
      if (!annotationMap[a.line]) annotationMap[a.line] = [];
      annotationMap[a.line].push(a.text);
    }

    return lines.map((line, i) => {
      const num = `<span class="line-num">${i + 1}</span>`;
      const highlighted = this._highlightLine(line);
      const annots = annotationMap[i]
        ? annotationMap[i].map(t => `<span class="annotation">\u25B6 ${t}</span>`).join('')
        : '';
      return num + highlighted + annots;
    }).join('\n');
  }

  _highlightLine(line) {
    // Escape HTML
    let s = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Comments (line comments only — block comments rare in these small files)
    s = s.replace(/(\/\/.*)$/, '<span class="hl-comment">$1</span>');

    // Strings
    s = s.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
      '<span class="hl-string">$1</span>');

    // Math methods
    s = s.replace(/\b(Math\.\w+)/g, '<span class="hl-math">$1</span>');

    // Keywords
    s = s.replace(/\b(const|let|var|function|async|await|if|else|for|while|return|new|import|export|from|of|in)\b/g,
      '<span class="hl-keyword">$1</span>');

    // Numbers (after keywords to avoid conflicts)
    s = s.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');

    return s;
  }

  // ── Geometry Annotations ──

  _findAnnotations(source) {
    const annotations = [];
    const lines = source.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Sin/cos wave patterns: Math.sin(x * freq) * amplitude
      const sinAmpMatch = line.match(/Math\.(sin|cos)\(\s*\w+\s*\*\s*([\d.]+)\s*\)\s*\*\s*([\d.]+)/);
      if (sinAmpMatch) {
        const [, fn, freq, amp] = sinAmpMatch;
        const period = Math.round((2 * Math.PI) / parseFloat(freq));
        annotations.push({
          line: i,
          text: `${fn === 'sin' ? 'Sine' : 'Cosine'} wave: period ~${period} items, amplitude ${amp}px`
        });
        continue;  // One annotation per line max
      }

      // Sin/cos with addition: Math.sin(x) * A + B (scale oscillation)
      const sinOffsetMatch = line.match(/Math\.(sin|cos)\(.*?\)\s*\*\s*([\d.]+)\s*\+\s*([\d.]+)/);
      if (sinOffsetMatch && (line.includes('scale') || line.includes('Scale'))) {
        const [, , amp, offset] = sinOffsetMatch;
        const min = parseInt(offset) - parseInt(amp);
        const max = parseInt(offset) + parseInt(amp);
        annotations.push({
          line: i,
          text: `Scale oscillates between ${min} and ${max}`
        });
        continue;
      }

      // Rotation increments: _rotation = var * N
      const rotMatch = line.match(/_rotation\s*=\s*\w+\s*\*\s*([\d.]+)/);
      if (rotMatch) {
        annotations.push({
          line: i,
          text: `Each item rotated ${rotMatch[1]} degrees more than the last`
        });
        continue;
      }

      // Rotation accumulation: _rotation += expression
      const rotAccMatch = line.match(/_rotation\s*\+=\s*(.+?)(?:;|$)/);
      if (rotAccMatch) {
        annotations.push({
          line: i,
          text: `Rotation incremented each frame: adds ${rotAccMatch[1].trim()}`
        });
        continue;
      }

      // Alpha fade: _alpha = N - (... / count) * M
      const alphaMatch = line.match(/_alpha\s*=\s*(\d+)\s*-.*\/\s*(\d+)\s*\)\s*\*\s*(\d+)/);
      if (alphaMatch) {
        const start = parseInt(alphaMatch[1]);
        const end = start - parseInt(alphaMatch[3]);
        annotations.push({
          line: i,
          text: `Alpha fades from ${start} to ${end} across ${alphaMatch[2]} items`
        });
        continue;
      }

      // Alpha linear fade: _alpha = N - index * (N / total)
      const alphaMatch2 = line.match(/_alpha\s*=\s*(\d+)\s*-\s*\w+\s*\*\s*\((\d+)\s*\/\s*(\w+)\)/);
      if (alphaMatch2) {
        annotations.push({
          line: i,
          text: `Alpha fades from ${alphaMatch2[1]} to 0 across ${alphaMatch2[3]} items`
        });
        continue;
      }

      // Mouse influence: mouse.x * factor or mouse.y * factor
      const mouseMatch = line.match(/mouse\.(x|y)\s*[\*/]\s*([\d.]+)/);
      if (mouseMatch) {
        const [, axis, factor] = mouseMatch;
        const f = parseFloat(factor);
        const desc = line.includes('/')
          ? `Mouse ${axis.toUpperCase()} dampened ${f}x`
          : f < 1
            ? `Mouse ${axis.toUpperCase()} dampened ${Math.round(1/f)}x`
            : `Mouse ${axis.toUpperCase()} amplified ${f}x`;
        annotations.push({ line: i, text: desc });
        continue;
      }

      // duplicateMovieClip
      if (line.includes('duplicateMovieClip') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
        annotations.push({
          line: i,
          text: 'Clones the template shape as a new scene object'
        });
        continue;
      }

      // attachMovie
      if (line.includes('attachMovie') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
        annotations.push({
          line: i,
          text: 'Creates a new instance from the symbol library'
        });
        continue;
      }

      // removeMovieClip
      if (line.includes('removeMovieClip') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
        annotations.push({
          line: i,
          text: 'Removes this object from the scene to free resources'
        });
        continue;
      }

      // loadSVG
      if (line.includes('loadSVG') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
        annotations.push({
          line: i,
          text: 'Loads the SVG shape asset used by this animation'
        });
        continue;
      }

      // onFrame callback assignment
      if (line.match(/\.onFrame\s*=\s*function/) || line.match(/\.onFrame\s*=\s*\(/)) {
        annotations.push({
          line: i,
          text: 'This function runs every animation frame (~60 times/sec)'
        });
        continue;
      }

      // stage.bgColor assignment
      if (line.includes('stage.bgColor') && line.includes('=') && !line.trim().startsWith('//')) {
        const colorMatch = line.match(/#[0-9a-fA-F]{3,6}/);
        if (colorMatch) {
          annotations.push({
            line: i,
            text: `Sets canvas background to ${colorMatch[0]}`
          });
        }
        continue;
      }
    }

    return annotations;
  }
}
