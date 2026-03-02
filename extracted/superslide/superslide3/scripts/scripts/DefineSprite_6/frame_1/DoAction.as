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
encircled = 240 + Math.sin(ii / 40) * 160;
mainWave = Math.cos(this._x / encircled);
mainSinWave = Math.sin(this._x / encircled);
this._x += (Math.cos(iii / 360) * 8 + Math.cos(iii / 180) * (10 + mainWave)) * _parent.xdecay / 10 * sintion;
suction = 1 + Math.cos(this._x / 200);
sintion = 2 + Math.sin(this._x / 200);
thiScale = mainWave * 10 + mainSinWave * 10 + suction * 85;
this._xscale = 200 - thiScale;
this._yscale = 200 - thiScale;
