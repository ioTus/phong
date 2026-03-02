/**
 * Having A Laugh4 — Minimal animation.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  const shapeImg = await stage.loadSVG('/extracted/!random/having-a-laugh4/shapes/10.svg');
  const clip = new MovieClip(stage, stage.root);
  clip._shapeImg = shapeImg;
  clip._shapeW = shapeImg.naturalWidth;
  clip._shapeH = shapeImg.naturalHeight;
  clip._shapeOffsetX = shapeImg.naturalWidth / 2;
  clip._shapeOffsetY = shapeImg.naturalHeight / 2;
  stage.root.addChild(clip);

  let i = 0;
  clip.onFrame = function(self) {
    i++;
    self._rotation = Math.sin(i * 0.02) * 30;
    self._xscale = 100 + Math.sin(i * 0.05) * 20;
    self._yscale = self._xscale;
  };
}
