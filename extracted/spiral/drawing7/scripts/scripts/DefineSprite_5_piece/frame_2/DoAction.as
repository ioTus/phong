i++;
this._rotation = _parent.i * _parent.i * 0.01;
theta = this._rotation / 360 * 3.141592653589793;
place._y = 20 + _parent.i / 1 * 1 + Math.sin(theta * 16) * 20;
thisScale = _parent.i / 4 * (1 + Math.sin(theta * 16) * 0.1) + 5;
this._xscale = thisScale;
this._yscale = thisScale;
