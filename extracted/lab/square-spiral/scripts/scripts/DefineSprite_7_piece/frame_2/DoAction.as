i++;
this._rotation = _parent.i * 8;
theta = this._rotation / 360 * 3.141592653589793;
polar = Math.sin(theta * 8);
place._y = 20 + _parent.i * _parent.i / 300 + polar;
thisScale = _parent.i * _parent.i / 50 * (1 + polar * 0.3) + 0;
this._xscale = thisScale;
this._yscale = thisScale;
