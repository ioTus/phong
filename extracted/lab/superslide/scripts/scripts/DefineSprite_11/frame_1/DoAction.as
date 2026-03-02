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
sWave = Math.sin(iii / 8) * 16 + Math.cos(iii / 4) * 2;
this._x += cWave - slowtion * 4 + Math.cos(iii / 180) * (10 + mainWave) * _parent.xdecay / 10 * sintion + sWave;
speed = 400 / (Math.abs(_parent.xdecay) + 4 + 1);
iv = Math.sin(iii / speed) * 16 * 3.141592653589793;
allWaves = Math.sin(iv / 8) + Math.sin(iv / 16);
this._y = allWaves * 1.5 * speed + sWave / speed;
Blocktation = slowtion * 60 + _parent.xdecay / 4 * abs;
addrot = Math.sin(iii / 50) * 10;
Block.TopBlock._rotation = 180 - Blocktation + addRot;
Block.BotBlock._rotation = 180 + Blocktation + addRot;
radDeg = 57.29577951308232;
x = this._x - _parent.Pusher._x;
y = this._y;
velHyp = Math.sqrt(Math.abs(x ^ 2) + Math.abs(y ^ 2));
if(y < 0)
{
   arcSide = 180;
}
else
{
   arcSide = 0;
   if(x >= 0)
   {
      arcSide = 360;
   }
}
ballRot = Math.atan(x / y) * -1 * radDeg + arcSide;
this._rotation = 90 + ballRot;
inYourFace = Math.abs(1600 / (Math.abs(this._x - _parent.Pusher._x) - 10));
thiScale = MainWave * 8 + mainSinWave * 24 + suction * 50 - inYourFace;
this._xscale = 140 - thiScale + cWave * 2 + Math.abs(this._x) / 3;
this._yscale = 140 - thiScale + cWave * 2;
if(100 < this._alpha)
{
   this._alpha = 100;
}
Blay = 40 + Math.round(Math.sin(Math.abs(this._x) / 360) * 40);
Block.topBlock.gotoAndStop(Blay);
Block.botBlock.gotoAndStop(Blay);
cC++;
if(100 < cc)
{
   BlockColor = new Color(Block);
   BlockTransform = new Object();
   white = Math.sqrt(Math.abs(xmouse * xmouse) + Math.abs(ymouse * ymouse));
   rC = 4 + Math.abs(thiScale);
   gC = 0;
   bC = 0;
   BlockTransform.rb = Math.abs(speed) * rC;
   BlockTransform.gb = Math.abs(speed) * gC;
   BlockTransform.bb = Math.abs(speed) * bC;
   BlockColor.setTransform(BlockTransform);
   cc = 0;
}
