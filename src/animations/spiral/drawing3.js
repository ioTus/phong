/**
 * Drawing3 — Growing spiral of duplicated shapes.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  const shapeImg = await stage.loadSVG('/extracted/spiral/drawing3/shapes/1.svg');
  const container = new MovieClip(stage, stage.root);
  container._name = 'spiral';
  container.i = 0;
  stage.root.addChild(container);

  const piece = new MovieClip(stage, container);
  piece._name = 'piece';
  piece._shapeImg = shapeImg;
  piece._shapeW = shapeImg.naturalWidth;
  piece._shapeH = shapeImg.naturalHeight;
  piece._shapeOffsetX = shapeImg.naturalWidth / 2;
  piece._shapeOffsetY = shapeImg.naturalHeight / 2;
  piece._visible = false;
  container.addChild(piece);

  container.onFrame = function(self) {
    self.i++;
    if (self.i > 300) return;
    const clone = piece.duplicateMovieClip('piece' + self.i, self.i);
    if (clone) {
      clone._visible = true;
      clone._rotation = self.i * 8;
      clone._y = self.i / 2 + Math.cos(clone._rotation / 360 * Math.PI * 40) * 10;
      const s = self.i / 2;
      clone._xscale = s;
      clone._yscale = s;
    }
  };
}
