#!/usr/bin/env node
/**
 * Generate gallery thumbnails for all Phong animations.
 *
 * Uses Playwright to render each animation for a few seconds in a headless
 * browser, then screenshots the canvas.  A manifest tracks source-file hashes
 * so only changed animations are re-rendered on subsequent runs.
 *
 * Usage:
 *   node scripts/generate-thumbnails.js          # incremental (skip unchanged)
 *   node scripts/generate-thumbnails.js --force   # regenerate all
 */
import { chromium } from 'playwright';
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(__dirname, '..');
const THUMB_DIR = resolve(PROJECT, 'thumbnails');
const MANIFEST_PATH = resolve(THUMB_DIR, 'manifest.json');
const REGISTRY_PATH = resolve(PROJECT, 'src/registry.js');
const VITE_PORT = 3099; // use a non-default port to avoid conflicts
const RENDER_WAIT_MS = 2500; // time to let animation build up
const FORCE = process.argv.includes('--force');

// ── Parse registry to extract animation entries ──

function parseRegistry() {
  const src = readFileSync(REGISTRY_PATH, 'utf-8');
  const entries = [];
  // Match each object literal in the animations array
  const re = /\{\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*module:\s*\(\)\s*=>\s*import\('([^']+)'\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, slug, name, category, modulePath] = m;
    // Resolve source path relative to src/
    const srcFile = resolve(PROJECT, 'src', modulePath.replace('./', ''));
    entries.push({ slug, name, category, modulePath, srcFile });
  }
  return entries;
}

function hashFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return createHash('md5').update(content).digest('hex');
  } catch {
    return null;
  }
}

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function saveManifest(manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}

// ── Vite dev server management ──

function startVite() {
  return new Promise((resolve, reject) => {
    const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--no-open'], {
      cwd: PROJECT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let started = false;
    const onData = (data) => {
      const line = data.toString();
      if (!started && line.includes('Local:')) {
        started = true;
        resolve(vite);
      }
    };

    vite.stdout.on('data', onData);
    vite.stderr.on('data', onData);
    vite.on('error', reject);

    // Timeout after 15 seconds
    setTimeout(() => {
      if (!started) {
        vite.kill();
        reject(new Error('Vite failed to start within 15s'));
      }
    }, 15000);
  });
}

// ── Main ──

async function main() {
  mkdirSync(THUMB_DIR, { recursive: true });

  const entries = parseRegistry();
  console.log(`Found ${entries.length} animations in registry`);

  const manifest = FORCE ? {} : loadManifest();

  // Determine which thumbnails need (re)generating
  const queue = [];
  for (const entry of entries) {
    const hash = hashFile(entry.srcFile);
    const thumbPath = resolve(THUMB_DIR, `${entry.slug}.jpg`);
    const existing = manifest[entry.slug];

    if (!FORCE && existing && existing.hash === hash && existsSync(thumbPath)) {
      continue; // up to date
    }

    queue.push({ ...entry, hash, thumbPath });
  }

  if (queue.length === 0) {
    console.log('All thumbnails up to date.');
    return;
  }

  console.log(`${queue.length} thumbnail(s) to generate${FORCE ? ' (forced)' : ''}...`);

  // Start Vite
  console.log('Starting Vite dev server...');
  const vite = await startVite();
  console.log(`Vite running on port ${VITE_PORT}`);

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 550, height: 400 },
    deviceScaleFactor: 2,
  });

  let generated = 0;
  let failed = 0;

  for (const entry of queue) {
    const url = `http://localhost:${VITE_PORT}/viewer/?animation=${entry.slug}`;
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for the animation to render frames
      await page.waitForTimeout(RENDER_WAIT_MS);

      // Screenshot just the canvas element
      const canvas = page.locator('canvas#stage');
      await canvas.screenshot({ path: entry.thumbPath, type: 'jpeg', quality: 85 });

      manifest[entry.slug] = { hash: entry.hash, file: `${entry.slug}.jpg` };
      generated++;
      console.log(`  [${generated + failed}/${queue.length}] ${entry.slug} ✓`);
    } catch (err) {
      failed++;
      console.error(`  [${generated + failed}/${queue.length}] ${entry.slug} ✗ ${err.message}`);
    } finally {
      await page.close();
    }
  }

  // Cleanup
  await browser.close();
  vite.kill();

  saveManifest(manifest);
  console.log(`\nDone: ${generated} generated, ${failed} failed, ${entries.length - queue.length} unchanged`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
