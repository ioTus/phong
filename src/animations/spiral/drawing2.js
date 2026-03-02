/**
 * Drawing 2 — Growing spiral of duplicated shapes.
 *
 * Each frame increments counter i, duplicates "piece" clip.
 * Each piece rotates by i*2 degrees, scales by i/2,
 * and Y-offset uses cosine wave for wave-like spacing.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  const svgPath = '/extracted/spiral/drawing2/shapes/1.svg';
  const shapeImg = await stage.loadSVG(svgPath);

  // Container sprite (DefineSprite_4)
  const container = new MovieClip(stage, stage.root);
  container._name = 'spiral';
  container.i = 0;
  stage.root.addChild(container);

  // Template "piece" clip (DefineSprite_3_piece)
  const piece = new MovieClip(stage, container);
  piece._name = 'piece';
  piece._shapeImg = shapeImg;
  piece._shapeW = shapeImg.naturalWidth;
  piece._shapeH = shapeImg.naturalHeight;
  piece._shapeOffsetX = shapeImg.naturalWidth / 2;
  piece._shapeOffsetY = shapeImg.naturalHeight / 2;
  piece._visible = false; // template is invisible
  container.addChild(piece);

  // Main loop: each frame duplicates a new piece
  container.onFrame = function(self) {
    self.i++;

    if (self.i > 300) return; // cap growth

    const name = 'piece' + self.i;
    const clone = piece.duplicateMovieClip(name, self.i);
    if (clone) {
      clone._visible = true;
      // Frame 1 logic for each piece:
      // this._rotation = _parent.i * 2
      clone._rotation = self.i * 2;
      // place._y = _parent.i / 2 * 1 + Math.cos(this._rotation / 360 * PI * 40) * 10
      const place_y = self.i / 2 + Math.cos(clone._rotation / 360 * Math.PI * 40) * 10;
      clone._y = place_y;
      // thisScale = _parent.i / 2
      const thisScale = self.i / 2;
      clone._xscale = thisScale;
      clone._yscale = thisScale;
    }
  };
}
