/**
 * Fractal Fire2 — Recursive branching fractal tree.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  stage.bgColor = '#0a0e1a';
  const branchImg = await stage.loadSVG('/extracted/fractal/fractal-fire2/shapes/1.svg');
  let depth = 0, levels = 60;
  const MAX_DEPTH = 128;

  stage.registerSymbol('branch', (stg, parent) => {
    const branch = new MovieClip(stg, parent);
    branch._shapeImg = branchImg;
    branch._shapeW = branchImg.naturalWidth;
    branch._shapeH = branchImg.naturalHeight;
    branch._shapeOffsetX = branchImg.naturalWidth / 2;
    branch._shapeOffsetY = branchImg.naturalHeight;
    let frameNum = 0;

    branch.onFrame = function(self) {
      frameNum++;
      if (frameNum === 1) {
        if (levels >= 0 && depth < MAX_DEPTH) {
          const splitNum = 2;
          for (let n = 0; n < splitNum; n++) {
            const child = self.attachMovie('branch', 'branch' + depth, depth++);
            if (child) {
              child._rotation = Math.cos(n * Math.PI) * 60 + Math.random() * 30;
              child._y = -100;
              child._xscale = levels > 0 ? 100 - (100 / 60) * (60 - levels) : 50;
              child._yscale = child._xscale;
              child.oRot = child._rotation;
            }
          }
          levels--;
        }
      } else {
        // Mouse-responsive rotation
        const mx = self._xmouse;
        if (Math.abs(mx) > 0.1) {
          self._rotation += mx / ((80 + (self.oRot || 1) / 2) * 0.5);
        }
        if (self._parent) {
          const mouseY = self._parent._ymouse;
          self._yscale += mouseY / 2000;
        }
      }
    };
    return branch;
  });

  const fractal = new MovieClip(stage, stage.root);
  fractal._name = 'fractal';
  stage.root.addChild(fractal);
  const first = fractal.attachMovie('branch', 'branch' + depth, depth++);
  if (first) first._y = 80;
}
