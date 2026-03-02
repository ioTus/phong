/**
 * Superslide 2 — Mouse-interactive sliding blocks with momentum.
 *
 * Blocks duplicate along X axis, scale with cosine perspective.
 * Click-drag creates momentum (xdecay), blocks wrap at edges.
 * Each block oscillates with combined cosine frequencies.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  // Load block shape (vertical bar)
  const blockSvg = '/extracted/superslide/superslide2/shapes/1.svg';
  const blockImg = await stage.loadSVG(blockSvg);

  // State variables
  let i = 0;
  let inpressed = 0;
  let sxmouse = 0, symouse = 0;
  let sxdiff = 0, sydiff = 0;
  let xdecay = 0;
  let pusherX = 0;
  const fRadius = 200;
  const leftLimit = -400;
  const rightLimit = 400;

  // Container
  const container = new MovieClip(stage, stage.root);
  container._name = 'slideContainer';
  stage.root.addChild(container);

  // Template block
  const block = new MovieClip(stage, container);
  block._name = 'Block';
  block._shapeImg = blockImg;
  block._shapeW = blockImg.naturalWidth;
  block._shapeH = blockImg.naturalHeight;
  block._shapeOffsetX = blockImg.naturalWidth / 2;
  block._shapeOffsetY = blockImg.naturalHeight / 2;
  block._visible = false;
  container.addChild(block);

  // Track active blocks
  const blocks = {};

  // Mouse events on canvas
  stage.canvas.addEventListener('mousedown', (e) => {
    inpressed = 1;
    const rect = stage.canvas.getBoundingClientRect();
    sxmouse = (e.clientX - rect.left) / stage._scaleX - stage.stageWidth / 2;
  });
  stage.canvas.addEventListener('mouseup', () => {
    inpressed = 0;
    xdecay = stage.mouse.x - sxmouse;
  });
  stage.canvas.addEventListener('touchstart', (e) => {
    inpressed = 1;
    const rect = stage.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    sxmouse = (touch.clientX - rect.left) / stage._scaleX - stage.stageWidth / 2;
  }, { passive: true });
  stage.canvas.addEventListener('touchend', () => {
    inpressed = 0;
    xdecay = stage.mouse.x - sxmouse;
  });

  container.onFrame = function(self) {
    i++;

    // Mouse easing
    sxmouse += (stage.mouse.x - sxmouse) / 2;
    symouse += (stage.mouse.y - symouse) / 8;
    sxdiff += (sxmouse - sxdiff) / 32;
    sydiff += (symouse - sydiff) / 32;

    // Position pusher
    if (inpressed === 1) {
      pusherX = stage.mouse.x;
    } else {
      const blockScale = 100 - Math.cos(pusherX / fRadius) * 80;
      pusherX += xdecay * (blockScale / 100);
      xdecay -= xdecay / 20;
      // Wrap
      if (pusherX > rightLimit) pusherX = leftLimit;
      if (pusherX < leftLimit) pusherX = rightLimit;
    }

    // Duplicate block at current position
    const i5 = Math.abs(Math.round(pusherX / 15));
    const name = 'Block' + i5;
    if (!blocks[i5]) {
      const clone = block.duplicateMovieClip(name, i5);
      if (clone) {
        clone._visible = true;
        clone._x = pusherX;
        const bScale = 100 - Math.cos(pusherX / fRadius) * 80;
        clone._xscale = bScale;
        clone._yscale = bScale;
        blocks[i5] = clone;

        // Per-block animation
        let ii = 0;
        clone.onFrame = function(b) {
          ii++;
          const iii = ii + i;
          // Wrap check
          if (b._x > rightLimit) b._x = leftLimit;
          if (b._x < leftLimit) b._x = rightLimit;
          // Movement from cosine waves
          b._x += Math.cos(iii / 18) * 18 + Math.cos(iii / 9) * 9;
          // Scale oscillation
          const thiScale = Math.cos(b._x / (fRadius / 20)) * 0.8;
          b._xscale += thiScale;
          b._yscale += thiScale;
        };
      }
    }
  };
}
