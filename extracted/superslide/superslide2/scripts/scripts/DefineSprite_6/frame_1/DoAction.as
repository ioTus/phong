ii++;
iii = ii + _parent._i;
if(_parent.RightLimit._X < this._x)
{
   this._x = _parent.LeftLimit._x;
}
if(this._x < _parent.LeftLimit._X)
{
   this._x = _parent.RightLimit._x;
}
this._x += Math.cos(iii / 18) * 18 + Math.cos(iii / 9) * 9;
thiScale = Math.cos(this._x / (_parent.fRadius / 20)) * 0.8;
this._xscale += thiScale;
this._yscale += thiScale;
