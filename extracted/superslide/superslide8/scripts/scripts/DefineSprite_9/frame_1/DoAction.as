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
cWave = Math.cos(iii / 24) * (8 + Math.cos(iii / 256) * 4);
abs = Math.abs(this._x) / this._x;
radius = 200;
iCos = Math.cos(this._x / radius);
iSin = Math.sin(this._x / radius);
suction = 1 + iCos;
sintion = 2 + iSin;
s1ntion = 1 + iSin;
costion = Math.cos(this._x / radius);
slowtion = Math.sin(this._x / radius);
this._x += cWave - slowtion * 4 + Math.cos(iii / 180) * (10 + mainWave) * _parent.xdecay / 10 * sintion;
Blocktation = slowtion * 60 + _parent.xdecay / 4 * abs;
Block.TopBlock._rotation = 180 - Blocktation;
Block.BotBlock._rotation = 180 + Blocktation;
thiScale = mainWave * 8 + mainSinWave * 24 + suction * 50;
this._xscale = 140 - thiScale + cWave * 2;
this._yscale = 140 - thiScale + cWave * 2;
this._alpha = Math.pow(suction,4) * 8 - thiScale / 8;
if(100 < this._alpha)
{
   this._alpha = 100;
}
Blay = Math.round(s1ntion * 40);
Block.topBlock.gotoAndStop(Blay);
Block.botBlock.gotoAndStop(Blay);
