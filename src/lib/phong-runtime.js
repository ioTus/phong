/**
 * Phong Runtime — Flash MovieClip scene graph rendered on Canvas 2D.
 * Mirrors AS1/AS2 MovieClip API for mechanical translation of extracted ActionScript.
 */

// ─── MovieClip ───────────────────────────────────────────────────────────────

export class MovieClip {
  constructor(stage, parent = null) {
    this._stage = stage;
    this._parent = parent;
    this._children = [];
    this._childByName = {};
    this._depth = 0;

    // Flash MovieClip properties
    this._x = 0;
    this._y = 0;
    this._rotation = 0;  // degrees
    this._xscale = 100;  // percentage (100 = normal)
    this._yscale = 100;
    this._alpha = 100;   // percentage (100 = opaque)
    this._visible = true;
    this._name = '';

    // Shape rendering
    this._shapeImg = null;    // pre-loaded SVG Image
    this._shapeW = 0;
    this._shapeH = 0;
    this._shapeOffsetX = 0;  // SVG internal offset (from transform in SVG)
    this._shapeOffsetY = 0;

    // Frame simulation (for clips with per-frame logic)
    this._currentframe = 1;
    this._totalframes = 1;
    this._playing = true;
    this._frameActions = {};  // frame number → function

    // Per-frame update function (replaces onEnterFrame / gotoAndPlay loop)
    this.onFrame = null;

    // Arbitrary user properties (AS1 lets you set any property on a clip)
    this._userProps = {};
  }

  // ── Hierarchy ──

  get _root() {
    return this._stage ? this._stage.root : this;
  }

  addChild(clip) {
    clip._parent = this;
    clip._stage = this._stage;
    this._children.push(clip);
    if (clip._name) {
      this._childByName[clip._name] = clip;
    }
    this._sortChildren();
    return clip;
  }

  removeChild(clip) {
    const idx = this._children.indexOf(clip);
    if (idx !== -1) {
      this._children.splice(idx, 1);
      if (clip._name && this._childByName[clip._name] === clip) {
        delete this._childByName[clip._name];
      }
      clip._parent = null;
    }
  }

  _sortChildren() {
    this._children.sort((a, b) => a._depth - b._depth);
  }

  // ── Flash MovieClip Methods ──

  attachMovie(libraryId, instanceName, depth) {
    if (this._stage && this._stage._objectCount >= this._stage.MAX_OBJECTS) return null;
    const template = this._stage.library[libraryId];
    if (!template) {
      console.warn(`attachMovie: "${libraryId}" not in library`);
      return null;
    }
    const clip = template.create(this._stage, this);
    clip._name = instanceName;
    clip._depth = depth;
    this._childByName[instanceName] = clip;
    this._children.push(clip);
    this._sortChildren();
    if (this._stage) this._stage._objectCount++;
    return clip;
  }

  duplicateMovieClip(newName, depth) {
    if (this._stage && this._stage._objectCount >= this._stage.MAX_OBJECTS) return null;
    const clip = new MovieClip(this._stage, this._parent);
    clip._name = newName;
    clip._depth = depth;
    clip._x = this._x;
    clip._y = this._y;
    clip._rotation = this._rotation;
    clip._xscale = this._xscale;
    clip._yscale = this._yscale;
    clip._alpha = this._alpha;
    clip._visible = this._visible;
    clip._shapeImg = this._shapeImg;
    clip._shapeW = this._shapeW;
    clip._shapeH = this._shapeH;
    clip._shapeOffsetX = this._shapeOffsetX;
    clip._shapeOffsetY = this._shapeOffsetY;
    clip._totalframes = this._totalframes;
    clip._frameActions = this._frameActions;
    clip.onFrame = this.onFrame;

    // Copy children templates (shallow)
    for (const child of this._children) {
      const childClone = child.duplicateMovieClip(child._name, child._depth);
      // duplicateMovieClip adds to parent, but we want it on the new clip
      if (this._parent) this._parent.removeChild(childClone);
      clip.addChild(childClone);
    }

    if (this._parent) {
      this._parent.addChild(clip);
    }
    if (this._stage) this._stage._objectCount++;
    return clip;
  }

  removeMovieClip() {
    if (this._parent) {
      this._parent.removeChild(this);
    }
    if (this._stage) this._stage._objectCount--;
  }

  gotoAndPlay(frame) {
    this._currentframe = frame;
    this._playing = true;
  }

  gotoAndStop(frame) {
    this._currentframe = frame;
    this._playing = false;
  }

  stop() {
    this._playing = false;
  }

  play() {
    this._playing = true;
  }

  // ── Property Access (bracket notation support) ──

  getChild(name) {
    return this._childByName[name] || null;
  }

  // Proxy-like access for this[name]
  $(name) {
    return this._childByName[name] || null;
  }

  // ── Mouse Coordinates (relative to this clip) ──

  get _xmouse() {
    if (!this._stage) return 0;
    // Transform stage mouse position into this clip's local coordinate space
    const global = this._stage.mouse;
    const local = this._globalToLocal(global.x, global.y);
    return local.x;
  }

  get _ymouse() {
    if (!this._stage) return 0;
    const global = this._stage.mouse;
    const local = this._globalToLocal(global.x, global.y);
    return local.y;
  }

  _globalToLocal(gx, gy) {
    // Build transform chain from root to this clip
    const chain = [];
    let clip = this;
    while (clip && clip !== this._stage?.root?._parent) {
      chain.unshift(clip);
      clip = clip._parent;
    }

    let x = gx;
    let y = gy;

    for (const c of chain) {
      // Undo translation
      x -= c._x;
      y -= c._y;
      // Undo rotation
      if (c._rotation !== 0) {
        const rad = -c._rotation * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const nx = x * cos - y * sin;
        const ny = x * sin + y * cos;
        x = nx;
        y = ny;
      }
      // Undo scale
      if (c._xscale !== 100) x /= (c._xscale / 100);
      if (c._yscale !== 100) y /= (c._yscale / 100);
    }

    return { x, y };
  }

  // ── Bounding box approximations ──

  get _width() {
    return this._shapeW * Math.abs(this._xscale / 100);
  }

  get _height() {
    return this._shapeH * Math.abs(this._yscale / 100);
  }

  // ── Rendering ──

  render(ctx) {
    if (!this._visible || this._alpha <= 0) return;

    ctx.save();

    // Apply transforms (same order as Flash: translate → rotate → scale)
    ctx.translate(this._x, this._y);
    if (this._rotation !== 0) {
      ctx.rotate(this._rotation * Math.PI / 180);
    }
    if (this._xscale !== 100 || this._yscale !== 100) {
      ctx.scale(this._xscale / 100, this._yscale / 100);
    }
    if (this._alpha < 100) {
      ctx.globalAlpha *= (this._alpha / 100);
    }

    // Draw this clip's shape
    if (this._shapeImg) {
      ctx.drawImage(
        this._shapeImg,
        -this._shapeOffsetX,
        -this._shapeOffsetY,
        this._shapeW,
        this._shapeH
      );
    }

    // Draw children (sorted by depth)
    for (const child of this._children) {
      child.render(ctx);
    }

    ctx.restore();
  }

  // ── Frame Update ──

  update() {
    // Snapshot children BEFORE running frame logic.
    // This prevents newly-attached children from being updated in the
    // same frame they were created — matching Flash's behaviour where
    // new MovieClips don't execute until the next global tick.
    const children = [...this._children];

    // Run this clip's per-frame logic
    if (this.onFrame) {
      this.onFrame(this);
    }

    // Run frame actions if defined
    const action = this._frameActions[this._currentframe];
    if (action) {
      action(this);
    }

    // Advance frame if playing
    if (this._playing && this._totalframes > 1) {
      this._currentframe++;
      if (this._currentframe > this._totalframes) {
        this._currentframe = 1;
      }
    }

    // Update children (from the BEFORE snapshot)
    for (const child of children) {
      child.update();
    }
  }
}

// ─── Library Symbol ──────────────────────────────────────────────────────────

export class LibrarySymbol {
  constructor(id, createFn) {
    this.id = id;
    this.create = createFn;  // (stage, parent) => MovieClip
  }
}

// ─── PhongStage ──────────────────────────────────────────────────────────────

export class PhongStage {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.root = new MovieClip(this, null);
    this.root._name = '_root';

    this.library = {};  // symbol name → LibrarySymbol
    this._svgCache = {};  // path → Image
    this._objectCount = 1;  // count root
    this.MAX_OBJECTS = 2000;  // global safety cap

    this.mouse = { x: 0, y: 0 };
    this._running = false;
    this._rafId = null;
    this._frameCount = 0;
    this._speed = 1.0;
    this._accumulator = 0;
    this.hueRotate = 0;  // degrees, 0 = no shift
    this.tintColor = null;      // hex string like '#ff0000', null = no tint
    this.tintIntensity = 0;     // 0.0 to 1.0
    this._offscreenCanvas = null;
    this._offscreenCtx = null;

    // Stage dimensions (original Flash stage size)
    this.stageWidth = options.width || 550;
    this.stageHeight = options.height || 400;
    this.bgColor = options.bgColor || '#ffffff';

    this._setupCanvas();
    this._setupMouse();
  }

  _setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);

    // Scale to fit stage dimensions into canvas
    this._scaleX = rect.width / this.stageWidth;
    this._scaleY = rect.height / this.stageHeight;

    this._resizeObserver = new ResizeObserver(() => {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      this._scaleX = rect.width / this.stageWidth;
      this._scaleY = rect.height / this.stageHeight;
    });
    this._resizeObserver.observe(this.canvas);
  }

  _setupMouse() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // Convert to stage coordinates
      this.mouse.x = (e.clientX - rect.left) / this._scaleX - this.stageWidth / 2;
      this.mouse.y = (e.clientY - rect.top) / this._scaleY - this.stageHeight / 2;
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = (touch.clientX - rect.left) / this._scaleX - this.stageWidth / 2;
      this.mouse.y = (touch.clientY - rect.top) / this._scaleY - this.stageHeight / 2;
    }, { passive: false });
  }

  // ── SVG Loading ──

  async loadSVG(path) {
    // Prepend base URL for absolute paths (handles /phong/ subpath in production)
    if (path.startsWith('/')) {
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      path = base + path;
    }

    if (this._svgCache[path]) return this._svgCache[path];

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this._svgCache[path] = img;
        resolve(img);
      };
      img.onerror = reject;
      img.src = path;
    });
  }

  async loadShapeForClip(clip, svgPath) {
    const img = await this.loadSVG(svgPath);
    clip._shapeImg = img;
    clip._shapeW = img.naturalWidth;
    clip._shapeH = img.naturalHeight;
    // Default: center the shape on the clip origin
    clip._shapeOffsetX = img.naturalWidth / 2;
    clip._shapeOffsetY = img.naturalHeight / 2;
  }

  // ── Library Registration ──

  registerSymbol(name, createFn) {
    this.library[name] = new LibrarySymbol(name, createFn);
  }

  // ── Animation Loop ──

  start() {
    if (this._running) return;
    this._running = true;
    this._tick();
  }

  stop() {
    this._running = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  _ensureOffscreen() {
    if (!this._offscreenCanvas) {
      this._offscreenCanvas = document.createElement('canvas');
      this._offscreenCtx = this._offscreenCanvas.getContext('2d');
    }
    if (this._offscreenCanvas.width !== this.canvas.width ||
        this._offscreenCanvas.height !== this.canvas.height) {
      this._offscreenCanvas.width = this.canvas.width;
      this._offscreenCanvas.height = this.canvas.height;
    }
  }

  renderOneFrame() {
    this._frameCount++;
    this.root.update();

    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const filter = this.hueRotate !== 0
      ? `hue-rotate(${this.hueRotate}deg)`
      : 'none';

    // Draw background on main canvas
    this.ctx.save();
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, rect.width, rect.height);
    this.ctx.restore();

    const tinting = this.tintColor && this.tintIntensity > 0;

    if (tinting) {
      // Render objects to offscreen canvas (transparent bg)
      this._ensureOffscreen();
      const oCtx = this._offscreenCtx;
      oCtx.setTransform(1, 0, 0, 1, 0, 0);
      oCtx.scale(dpr, dpr);
      oCtx.clearRect(0, 0, rect.width, rect.height);

      oCtx.save();
      oCtx.translate(rect.width / 2, rect.height / 2);
      oCtx.scale(this._scaleX, this._scaleY);
      oCtx.filter = filter;
      this.root.render(oCtx);
      oCtx.restore();

      // Apply tint: colorize non-transparent pixels
      oCtx.save();
      oCtx.setTransform(1, 0, 0, 1, 0, 0);
      oCtx.globalCompositeOperation = 'source-atop';
      oCtx.globalAlpha = this.tintIntensity;
      oCtx.fillStyle = this.tintColor;
      oCtx.fillRect(0, 0, this._offscreenCanvas.width, this._offscreenCanvas.height);
      oCtx.restore();

      // Composite tinted objects onto main canvas
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.drawImage(this._offscreenCanvas, 0, 0);
      this.ctx.restore();
    } else {
      // Fast path — no tint, render directly
      this.ctx.save();
      this.ctx.translate(rect.width / 2, rect.height / 2);
      this.ctx.scale(this._scaleX, this._scaleY);
      this.ctx.filter = filter;
      this.root.render(this.ctx);
      this.ctx.restore();
    }
  }

  _tick() {
    if (!this._running) return;

    // Speed-aware frame advancement
    this._accumulator += this._speed;
    while (this._accumulator >= 1) {
      this.renderOneFrame();
      this._accumulator -= 1;
    }

    this._rafId = requestAnimationFrame(() => this._tick());
  }

  reset() {
    this.stop();
    // Remove all children from root
    while (this.root._children.length > 0) {
      this.root._children[0].removeMovieClip();
    }
    this.root._childByName = {};
    this.root.onFrame = null;
    this.library = {};
    this._objectCount = 1;
    this._frameCount = 0;
    this._accumulator = 0;
    this._svgCache = {};
  }

  destroy() {
    this.stop();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    this._offscreenCanvas = null;
    this._offscreenCtx = null;
  }
}

// ─── Flash Compatibility Utilities ───────────────────────────────────────────

const _startTime = performance.now();

export function getTimer() {
  return Math.floor(performance.now() - _startTime);
}

export function getProperty(target, prop) {
  if (!target) return undefined;
  return target[prop];
}

export function setProperty(target, prop, value) {
  if (!target) return;
  target[prop] = value;
}
