/**
 * Fractal Engine — Recursive branching tree that responds to mouse Y position.
 *
 * Original AS1 structure:
 *   DefineSprite_6 "fractal" (placed on _root):
 *     Frame 1: attachMovie("branch", ..., depth++); stemScale=100; stop();
 *
 *   DefineSprite_5 "branch" (ExportAsset):
 *     Frame 1: if stemScale > 10, split into 2 child branches
 *     Frame 2: this._yscale = _parent._ymouse / 1000
 *     Frame 3: gotoAndPlay(2)  // loop
 *
 * In Flash, attachMovie clips don't execute frame 1 until the next global tick,
 * so the tree grows one level per frame (not all at once).
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  // Load both stem SVGs
  const stemSvg1 = '/extracted/fractal/fractal-engine/shapes/1.svg';
  const stemSvg2 = '/extracted/fractal/fractal-engine/shapes/2.svg';
  const [stemImg1, stemImg2] = await Promise.all([
    stage.loadSVG(stemSvg1),
    stage.loadSVG(stemSvg2),
  ]);

  // Global state
  let depth = 0;
  const MAX_DEPTH = 128;

  // The fractal container
  const fractal = new MovieClip(stage, stage.root);
  fractal._name = 'fractal';
  fractal.stemScale = 100;
  stage.root.addChild(fractal);

  // Register "branch" in the library
  stage.registerSymbol('branch', (stg, parent) => {
    const branch = new MovieClip(stg, parent);
    // Alternate between the two stem shapes
    const img = depth % 2 === 0 ? stemImg1 : stemImg2;
    branch._shapeImg = img;
    branch._shapeW = img.naturalWidth;
    branch._shapeH = img.naturalHeight;
    branch._shapeOffsetX = img.naturalWidth / 2;
    branch._shapeOffsetY = img.naturalHeight;  // pivot at bottom

    // Frame state: tracks which "frame" this branch is on
    // Frame 0 = just created (do nothing, wait one tick)
    // Frame 1 = spawn children
    // Frame 2+ = animate yscale based on mouse
    let frameNum = 0;

    branch.onFrame = function(self) {
      frameNum++;

      if (frameNum === 1) {
        // Frame 1: recursive branch creation (one level per global frame)
        if (fractal.stemScale > 10 && depth < MAX_DEPTH) {
          const splitNum = 2;
          fractal.stemScale -= 1;

          for (let n = 0; n < splitNum; n++) {
            const name = 'branch' + depth;
            const child = self.attachMovie('branch', name, depth++);
            if (child) {
              child._rotation = Math.random() * 50;
              child._y = -100;
              child._xscale = fractal.stemScale;
              child._yscale = fractal.stemScale;
            }
          }
        }
      } else {
        // Frame 2+: scale response to mouse Y
        // Original: this._yscale = _parent._ymouse / 1000
        // The /1000 makes it very subtle — mouse Y ranges ~-200..200,
        // so this gives -0.2..0.2 scale. In Flash this oscillates the branches.
        if (self._parent) {
          const mouseInfluence = self._parent._ymouse / 1000;
          // Blend with existing scale so it doesn't collapse to zero
          self._yscale = self._yscale + mouseInfluence;
        }
      }
    };

    return branch;
  });

  // Initial attachment: fractal attaches one "branch"
  const firstBranch = fractal.attachMovie('branch', 'branch' + depth, depth++);
  if (firstBranch) {
    firstBranch._y = 80; // position trunk below center
  }
}
