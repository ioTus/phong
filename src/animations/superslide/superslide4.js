/**
 * Superslide4 — Interactive sliding blocks with momentum.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  const blockImg = await stage.loadSVG('/extracted/superslide/superslide4/shapes/1.svg');
  let i = 0, inpressed = 0, sxmouse = 0, symouse = 0;
  let sxdiff = 0, sydiff = 0, xdecay = 0, pusherX = 0;
  const fRadius = 200, leftLimit = -400, rightLimit = 400;
  const blocks = {};

  const container = new MovieClip(stage, stage.root);
  container._name = 'slideContainer';
  stage.root.addChild(container);

  const block = new MovieClip(stage, container);
  block._name = 'Block';
  block._shapeImg = blockImg;
  block._shapeW = blockImg.naturalWidth;
  block._shapeH = blockImg.naturalHeight;
  block._shapeOffsetX = blockImg.naturalWidth / 2;
  block._shapeOffsetY = blockImg.naturalHeight / 2;
  block._visible = false;
  container.addChild(block);

  stage.canvas.addEventListener('mousedown', () => { inpressed = 1; sxmouse = stage.mouse.x; });
  stage.canvas.addEventListener('mouseup', () => { inpressed = 0; xdecay = stage.mouse.x - sxmouse; });
  stage.canvas.addEventListener('touchstart', (e) => {
    inpressed = 1;
    const rect = stage.canvas.getBoundingClientRect();
    sxmouse = (e.touches[0].clientX - rect.left) / stage._scaleX - stage.stageWidth / 2;
  }, { passive: true });
  stage.canvas.addEventListener('touchend', () => { inpressed = 0; xdecay = stage.mouse.x - sxmouse; });

  container.onFrame = function() {
    i++;
    sxmouse += (stage.mouse.x - sxmouse) / 2;
    sxdiff += (sxmouse - sxdiff) / 32;

    if (inpressed === 1) {
      pusherX = stage.mouse.x;
    } else {
      const bsc = 100 - Math.cos(pusherX / fRadius) * 80;
      pusherX += xdecay * (bsc / 100);
      xdecay -= xdecay / 20;
      if (pusherX > rightLimit) pusherX = leftLimit;
      if (pusherX < leftLimit) pusherX = rightLimit;
    }

    const i5 = Math.abs(Math.round(pusherX / 15));
    if (!blocks[i5]) {
      const clone = block.duplicateMovieClip('Block' + i5, i5);
      if (clone) {
        clone._visible = true;
        clone._x = pusherX;
        const bScale = 100 - Math.cos(pusherX / fRadius) * 80;
        clone._xscale = bScale;
        clone._yscale = bScale;
        blocks[i5] = clone;
        let ii = 0;
        clone.onFrame = function(b) {
          ii++;
          if (b._x > rightLimit) b._x = leftLimit;
          if (b._x < leftLimit) b._x = rightLimit;
          b._x += Math.cos((ii + i) / 18) * 18 + Math.cos((ii + i) / 9) * 9;
          const sc = Math.cos(b._x / (fRadius / 20)) * 0.8;
          b._xscale += sc;
          b._yscale += sc;
        };
      }
    }
  };
}
