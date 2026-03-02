i++;
this._rotation = _parent.i * _parent.i;
thisScale = _parent.i / 8;
place._y = _parent.i / 2 * 1 + Math.cos(this._rotation / 360 * 3.141592653589793 * 8) * thisScale * 2;
this._xscale = thisScale;
this._yscale = thisScale;
