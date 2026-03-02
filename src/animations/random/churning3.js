/**
 * Churning 3 — Sine-wave circle pattern.
 *
 * Duplicates 120 circles spaced along X axis,
 * scaled by sin(i*2) creating an oscillating wave pattern.
 * 240-frame animation loop.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  const svgPath = '/extracted/!random/churning3/shapes/1.svg';
  const shapeImg = await stage.loadSVG(svgPath);

  // Container
  const container = new MovieClip(stage, stage.root);
  container._name = 'container';
  container._x = -550; // start from left edge
  stage.root.addChild(container);

  // Template circle
  const cir = new MovieClip(stage, container);
  cir._name = 'cir';
  cir._shapeImg = shapeImg;
  cir._shapeW = shapeImg.naturalWidth;
  cir._shapeH = shapeImg.naturalHeight;
  cir._shapeOffsetX = shapeImg.naturalWidth / 2;
  cir._shapeOffsetY = shapeImg.naturalHeight / 2;
  cir._visible = false;
  container.addChild(cir);

  let i = 0;

  container.onFrame = function(self) {
    i++;
    if (i < 120) {
      const name = 'cir' + i;
      const clone = cir.duplicateMovieClip(name, i);
      if (clone) {
        clone._visible = true;
        clone._x = i * 12;
        const cirScale = Math.sin(i * 2) * 300;
        clone._xscale = cirScale;
        clone._yscale = cirScale;
      }
    }
  };
}
