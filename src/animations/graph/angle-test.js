/**
 * Angle Test — Mouse-reactive arrow that points toward the cursor.
 *
 * Original AS1 (DefineSprite_3):
 *   x = _xmouse;
 *   y = _ymouse;
 *   if(y < 0) arcSide = 0; else arcSide = 180;
 *   Arrow._rotation = Math.atan(x / y) * -1 * 180 / PI + arcSide;
 *   gotoAndPlay(1);  // loop
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  // Load the arrow SVG shape
  const arrowSvg = '/extracted/graph/angle-test/shapes/1.svg';
  const arrowImg = await stage.loadSVG(arrowSvg);

  // Create the main sprite (DefineSprite_3)
  const sprite = new MovieClip(stage, stage.root);
  sprite._name = 'sprite';
  stage.root.addChild(sprite);

  // Create the Arrow child clip with the arrow shape
  const arrow = new MovieClip(stage, sprite);
  arrow._name = 'Arrow';
  arrow._shapeImg = arrowImg;
  arrow._shapeW = arrowImg.naturalWidth;
  arrow._shapeH = arrowImg.naturalHeight;
  arrow._shapeOffsetX = arrowImg.naturalWidth / 2;
  arrow._shapeOffsetY = arrowImg.naturalHeight;  // pivot at bottom of arrow
  sprite.addChild(arrow);

  // Per-frame logic from the original ActionScript
  sprite.onFrame = function(self) {
    const x = self._xmouse;
    const y = self._ymouse;
    const arcSide = y < 0 ? 0 : 180;
    const arrowClip = self.$(  'Arrow');
    if (arrowClip) {
      arrowClip._rotation = Math.atan(x / y) * -1 * 180 / Math.PI + arcSide;
    }
  };
}
