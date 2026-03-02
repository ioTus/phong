import { PhongStage } from './lib/phong-runtime.js';
import { getAnimation } from './registry.js';
import { InsightPanel } from './insight-panel.js';

const STORAGE_PREFIX = 'phong:custom:';

// ── Customization persistence ──

function loadCustomization(slug) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveCustomization(slug, data) {
  const existing = loadCustomization(slug) || {};
  localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify({ ...existing, ...data }));
}

function clearCustomization(slug) {
  localStorage.removeItem(STORAGE_PREFIX + slug);
}

// ── Thumbnail capture (downscaled to save localStorage space) ──

function captureThumbnail(canvas) {
  const thumb = document.createElement('canvas');
  const tw = 560;
  const th = 420;
  thumb.width = tw;
  thumb.height = th;
  const tctx = thumb.getContext('2d');
  tctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, tw, th);
  return thumb.toDataURL('image/jpeg', 0.8);
}

// ── Navigate back to gallery (with thumbnail capture) ──

function navigateBack(slug, canvas) {
  const custom = loadCustomization(slug);
  if (custom) {
    const thumbnail = captureThumbnail(canvas);
    saveCustomization(slug, { thumbnail });
  }
  sessionStorage.setItem('gallery:scroll', window.scrollY);
  window.location.href = import.meta.env.BASE_URL;
}

// ── Init ──

const params = new URLSearchParams(window.location.search);
const slug = params.get('animation');
const titleEl = document.getElementById('title');
const fpsEl = document.getElementById('fps');
const canvas = document.getElementById('stage');

if (!slug) {
  titleEl.textContent = 'No animation specified';
} else {
  const entry = getAnimation(slug);
  if (!entry) {
    titleEl.textContent = `Unknown animation: ${slug}`;
  } else {
    titleEl.textContent = `${entry.name} — ${entry.category}`;
    document.title = `${entry.name} — Phong`;
    init(entry);
  }
}

async function init(entry) {
  // Original defaults from the registry
  const defaults = {
    bgColor: entry.bgColor,
    hueRotate: 0,
    speed: 1,
    tintColor: null,
    tintIntensity: 0,
  };

  const stage = new PhongStage(canvas, {
    width: entry.stageWidth,
    height: entry.stageHeight,
    bgColor: entry.bgColor,
  });

  // Run animation setup FIRST (it may set stage.bgColor)
  const mod = await entry.module();
  await mod.setup(stage);

  // Apply saved customizations AFTER setup so they override animation defaults
  const saved = loadCustomization(entry.slug);
  if (saved) {
    if (saved.bgColor) stage.bgColor = saved.bgColor;
    if (saved.hueRotate != null) stage.hueRotate = saved.hueRotate;
    if (saved.speed != null) stage._speed = saved.speed;
    if (saved.tintColor) stage.tintColor = saved.tintColor;
    if (saved.tintIntensity != null) stage.tintIntensity = saved.tintIntensity;
  }

  stage.start();

  // Insight panel — pass defaults and persistence callbacks
  const panel = new InsightPanel(stage, entry, mod.setup, {
    defaults,
    onControlChange: (data) => saveCustomization(entry.slug, data),
    onReset: () => clearCustomization(entry.slug),
  });

  // Intercept back link (set href for middle-click/right-click)
  const backLink = document.getElementById('back');
  backLink.href = import.meta.env.BASE_URL;
  backLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateBack(entry.slug, canvas);
  });

  // FPS counter
  let frames = 0;
  let lastTime = performance.now();
  function updateFPS() {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      fpsEl.textContent = `${frames} fps`;
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(updateFPS);
  }
  updateFPS();

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;

    if (e.key === 'Escape') {
      navigateBack(entry.slug, canvas);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (stage._running) stage.stop();
      else stage.start();
    } else if (e.key === 'i' || e.key === 'I') {
      panel.toggle();
    }
  });
}
