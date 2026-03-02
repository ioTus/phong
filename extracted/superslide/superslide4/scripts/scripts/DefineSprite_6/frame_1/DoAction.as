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
cWave = Math.cos(iii / 48) * 8;
suction = 1 + Math.cos(this._x / 200);
sintion = 2 + Math.sin(this._x / 200);
slowtion = Math.sin(this._x / 200);
this._x += cWave - slowtion * 4 + Math.cos(iii / 180) * (10 + mainWave) * _parent.xdecay / 10 * sintion;
this._rotation = slowtion * _parent.xdecay / 3;
thiScale = mainWave * 8 + mainSinWave * 8 + suction * 50;
this._xscale = 140 - thiScale + cWave * 2;
this._yscale = 140 - thiScale + cWave * 2;
this._alpha = Math.pow(suction,8) * 50;
if(100 < this._alpha)
{
   this._alpha = 100;
}
