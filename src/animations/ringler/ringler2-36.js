/**
 * Ringler2 36 — Advanced ring animation with nested rotations.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  const shapeImg = await stage.loadSVG('/extracted/ringler/ringler2-36/shapes/1.svg');
  let eGrow = 0, num2 = 0;
  const DotNum = 64;
  const dots = {};

  const dot = new MovieClip(stage, stage.root);
  dot._name = 'Dot';
  dot._shapeImg = shapeImg;
  dot._shapeW = shapeImg.naturalWidth;
  dot._shapeH = shapeImg.naturalHeight;
  dot._shapeOffsetX = shapeImg.naturalWidth / 2;
  dot._shapeOffsetY = shapeImg.naturalHeight / 2;
  dot._alpha = 0;
  stage.root.addChild(dot);

  stage.root.onFrame = function() {
    eGrow++;
    const sinGrow = Math.sin(eGrow);
    const sinGrow2 = Math.sin(eGrow / 4);
    const sinGrow3 = Math.sin(eGrow / 16);
    const cosGrow3 = Math.cos(eGrow / 16);
    const mIt = 8 * Math.sin(eGrow / 256);
    const nIt = 48 * Math.abs(Math.sin(eGrow / 96));
    const RingScale = sinGrow3 * 100 + Math.cos(eGrow / (mIt + 100)) * nIt;
    const DotScale = 180 + RingScale;

    num2++;
    const name = 'Dot' + num2;
    const clone = dot.duplicateMovieClip(name, num2);
    if (clone) {
      clone._xscale = DotScale;
      clone._yscale = DotScale;
      clone._alpha = 100;
      dots[num2] = clone;
    }

    const removal = num2 - DotNum;
    if (removal > 0 && dots[removal]) {
      dots[removal].removeMovieClip();
      delete dots[removal];
    }

    for (let n = 0; n < DotNum; n++) {
      const idx = num2 - n;
      if (dots[idx]) dots[idx]._alpha = 100 - n * (100 / DotNum);
    }
  };
}
