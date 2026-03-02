/**
 * Particle1 Orange2 — Generative duplication animation.
 */
import { MovieClip } from '../../lib/phong-runtime.js';

export async function setup(stage) {
  stage.bgColor = '#000000';
  const shapeImg = await stage.loadSVG('/extracted/!random/particle1-orange2/shapes/1.svg');

  const container = new MovieClip(stage, stage.root);
  container._name = 'container';
  stage.root.addChild(container);

  const template = new MovieClip(stage, container);
  template._name = 'kew';
  template._shapeImg = shapeImg;
  template._shapeW = shapeImg.naturalWidth;
  template._shapeH = shapeImg.naturalHeight;
  template._shapeOffsetX = shapeImg.naturalWidth / 2;
  template._shapeOffsetY = shapeImg.naturalHeight / 2;
  template._visible = false;
  container.addChild(template);

  let i = 0;
  const clones = {};

  container.onFrame = function(self) {
    i++;
    if (i <= 8) {
      const clone = template.duplicateMovieClip('kew' + i, i);
      if (clone) {
        clone._visible = true;
        clone._x = (i - 8/2) * (64 / 8);
        clone._y = Math.sin(i * 0.2) * 50;
        const s = Math.sin(i * 0.15) * 200 + 100;
        clone._xscale = s;
        clone._yscale = s;
        clone._rotation = i * 3;
        clone._alpha = 100 - (i / 8) * 60;
      clone._x += self._stage.mouse.x * 0.1;
        clones[i] = clone;
      }
    }
  };
}
