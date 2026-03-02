/**
 * 16 Arms — Recursive fractal tree with mouse-responsive rotation.
 *
 * 63-level deep recursion, branches rotate based on mouse position.
 * "Gummy" easing function provides elastic mouse-following behavior.
 * Green semi-transparent branch shapes with red circle nodes.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  stage.bgColor = '#000000';

  // Load branch shape (green curved stem)
  const branchSvg = '/extracted/lab/16-arms/shapes/1.svg';
  const branchImg = await stage.loadSVG(branchSvg);

  // Global state
  let depth = 0;
  const oLevels = 63;
  let levels = oLevels;
  const MAX_DEPTH = 128;

  // Main timeline counter
  let rootI = 0;

  // Register "branch" symbol
  stage.registerSymbol('branch', (stg, parent) => {
    const branch = new MovieClip(stg, parent);
    branch._shapeImg = branchImg;
    branch._shapeW = branchImg.naturalWidth;
    branch._shapeH = branchImg.naturalHeight;
    branch._shapeOffsetX = branchImg.naturalWidth / 2;
    branch._shapeOffsetY = branchImg.naturalHeight;

    let frameNum = 0;
    let oRot = 0;
    let i = 0;
    let centerPos = 0;
    let pLitGummy = 2; // start above threshold so it animates

    branch.onFrame = function(self) {
      frameNum++;

      if (frameNum === 1) {
        // Frame 5 logic: spawn child branches
        const splitNum = Math.round(Math.random()) + 1;
        if (levels >= 0 && depth < MAX_DEPTH) {
          for (let n = 0; n < splitNum; n++) {
            const name = 'branch' + depth;
            const child = self.attachMovie('branch', name, depth++);
            if (child) {
              child._y = -100;
              child._rotation = Math.cos(n * Math.PI) * 60 + Math.random() * 30;
              child.oRot = child._rotation;
            }
          }
        }
        levels--;
      } else {
        // Frame 6+ logic: mouse-responsive rotation and scaling
        i++;
        const mx = self._xmouse;
        const my = self._ymouse;
        const aCenterPos = Math.sqrt(mx * mx + my * my);
        centerPos += (aCenterPos - centerPos) / 2;

        if (pLitGummy > 1.5) {
          self._rotation += mx / ((80 + (oRot || 1) / 2) * 0.5);
        } else {
          self._rotation -= mx / ((80 + (oRot || 1) / 2) * 1);
        }

        // Scale based on mouse proximity
        const minNodeS = 20;
        const maxNodeS = 40;
        const baseScale = Math.min(pLitGummy, 3);
        let thisScale = minNodeS + baseScale * maxNodeS;
        const minScale = 50;
        if (thisScale < minScale) thisScale = minScale;
        self._xscale = thisScale;
        self._yscale = thisScale;
      }
    };

    return branch;
  });

  // Create fractal container
  const fractal = new MovieClip(stage, stage.root);
  fractal._name = 'fractal';
  stage.root.addChild(fractal);

  // Attach initial branch
  const firstBranch = fractal.attachMovie('branch', 'branch' + depth, depth++);
  if (firstBranch) {
    firstBranch._y = 100;
  }

  // Root timeline loop
  stage.root.onFrame = function() {
    rootI++;
  };
}
