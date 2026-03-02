ii++;
iii = ii + _parent.i;
speed = 12;
addSpeed = this._xscale / 8;
this._x = this._x - speed - addSpeed;
crossScale = Math.sin(this._x / limit / 4) * (1.2 + Math.sin(iii / 16));
crossCos = Math.cos(this._x / limit);
thisY = Math.cos(iii / 64) + this._y / 64 * crossScale + Math.sin(iii / (180 - Math.sin(ii / Math.sin(ii / 320)) * 160)) * 0.6;
this._y += thisY * Math.cos(ii / 8);
this._xscale += speed * crossScale;
this._yscale += thisY * crossScale;
limit = _parent.Ball._x;
if(this._x < -1 * limit)
{
   removeMovieClip(this);
}
