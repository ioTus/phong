i++;
ease += (ideal - ease) / 10 + seed / 1;
plusX = Math.sin(i / 8 * (seed * 2)) * 10;
plusY = Math.cos(i / 8 * (seed * 2)) * 10;
slightEase = ease / 10 / (wave + 0.02);
this._x += (plusX * seed + 10 / ((seed + 0.25) * 20) * slightEase) * side;
this._y -= plusY * seed * (1 + i / 200) - seed * 0.5 * slightEase / 10 + 80 / ease * seed;
this._alpha = ease * (ease / 2) + 10;
downScale += seedScale / 15;
aDownScale = downScale;
this._yscale = aDownScale;
this._xscale = aDownScale;
if(0.5 >= this._alpha or this._y < -940)
{
   _root.fractal.blueTotal--;
   this.removeMovieClip();
}
