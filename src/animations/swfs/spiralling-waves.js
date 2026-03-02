/**
 * Spiralling Waves — Randomly scaled black circles in a row.
 *
 * 120 circles spaced at x = i*8, random y offset and scale.
 * 240-frame animation loop in the shape sprite.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  stage.bgColor = '#0a0e1a';
  const svgPath = '/extracted/swfs/spiralling-waves/shapes/1.svg';
  const shapeImg = await stage.loadSVG(svgPath);

  // Container
  const container = new MovieClip(stage, stage.root);
  container._name = 'container';
  container._x = -450; // start from left
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
        clone._x = i * 8;
        clone._y = Math.random() * 20;
        const cirScale = Math.random() * 400;
        clone._xscale = cirScale;
        clone._yscale = cirScale;
      }
    }
  };
}
