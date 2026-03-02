ii++;
iii = ii + _parent._i;
thisX = this._x + this._width / 2;
if(_parent.RightLimit._X < thisX)
{
   this._x = _parent.LeftLimit._x;
}
if(thisX < _parent.LeftLimit._X)
{
   this._x = _parent.RightLimit._x;
}
encircled = 240 + Math.sin(ii / 40) * 160;
mainWave = Math.cos(thisX / encircled);
mainSinWave = Math.sin(thisX / encircled);
cWave = Math.cos(iii / 24) * (8 + Math.cos(iii / 256) * 4);
abs = Math.abs(thisX) / thisX;
radius = 180;
iCos = Math.cos(thisX / radius);
iSin = Math.sin(thisX / radius);
suction = 1 + iCos;
sintion = 2 + iSin;
s1ntion = 1 + iSin;
costion = Math.cos(thisX / radius);
slowtion = Math.sin(thisX / radius);
this._x += cWave - slowtion * 4 + Math.cos(iii / 180) * (10 + mainWave) * _parent.xdecay / 10 * sintion;
speed = 400 / (Math.abs(_parent.xdecay) + 4 + 1);
allWaves = Math.sin(iii / 8) + Math.sin(iii / 16);
this._y = allWaves * speed;
Blocktation = slowtion * 60 + _parent.xdecay / 4 * abs;
addrot = Math.sin(iii / 50) * 10;
Block.TopBlock._rotation = 180 - Blocktation + addRot;
Block.BotBlock._rotation = 180 + Blocktation + addRot;
thiScale = mainWave * 8 + mainSinWave * 24 + suction * 50;
this._xscale = 140 - thiScale + cWave * 2;
this._yscale = 140 - thiScale + cWave * 2;
this._alpha = Math.pow(suction,4) * 16 - thiScale / 8;
if(100 < this._alpha)
{
   this._alpha = 100;
}
Blay = Math.round(s1ntion * 40);
Block.topBlock.gotoAndStop(Blay);
Block.botBlock.gotoAndStop(Blay);
