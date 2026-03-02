ii++;
iii = ii + _parent.i;
BallScale = 100 + Math.cos(ii / 16) * 100;
Ball._xscale = BallScale;
Ball._yscale = BallScale;
this._x += Math.cos(ii / 8) * (this._x / 2);
this._y += Math.sin(ii / 8) - this._y / 20;
this._x /= 1.5;
