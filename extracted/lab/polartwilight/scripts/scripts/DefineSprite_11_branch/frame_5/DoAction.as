if(_root.fractal.pause == 1)
{
   gotoAndPlay(_currentframe + 2);
}
pLitGummy = _parent.pLitGummy;
baseScale = _parent.pLitGummy;
eXmouse += (_xmouse - eXmouse) / 10;
eYmouse += (_ymouse - eYmouse) / 10;
mSide = eXmouse / Math.abs(eXmouse);
cDiff = Math.abs(_root.fractal._xmouse);
aCenterPos = Math.sqrt(Math.pow(eXmouse,2) + Math.pow(eYmouse,2));
centerMax = 5000;
if(centerMax < aCenterPos)
{
   aCenterPos = centerMax;
}
centerPos += (aCenterPos - centerPos) / 20;
pLevel = Math.pow(aLevel / levelNum,0.5);
uCenterPos = centerPos;
minCenterPos = 50;
if(mincenterPos >= uCenterPos)
{
   uCenterPos = mincenterPos;
}
if(1.5 < pLitGummy)
{
   toRot = eXmouse / ((uCenterPos / 20 + oRot * (alevel / 3)) / (0.8 * aLevel));
   if(22.5 < Math.abs(toRot))
   {
      toRot = 22.5 * mSide;
   }
   this._rotation += toRot;
   nNodeS = 20;
   maxNodeS = 53;
   osc = Math.sin(i / 32 + aLevel / 0.5) * Math.pow(aLevel,1.8) * _root.fractal.oscMult * 3;
   thisScale = (100 / (aLevel / 5 + 1) + Math.abs(Math.pow(Math.sqrt(centerPos),2)) / 30 + Math.pow(cDiff,1.5) / 1000) * (0.95 + cDiff / 10000) + osc;
   oSideScale = eXmouse / 3 + oscSide;
   minScale = 120;
   _parent.minScale = minScale;
   _parent.stickRot = this._rotation;
   if(stickRot == 0)
   {
      stickRot = 1;
   }
   avRot = (stickRot + this._rotation) / 2;
   stem.stick.gotoAndStop(Math.round(Math.abs(avRot / 90) * stem.stick._totalframes));
}
else
{
   this._rotation -= this._rotation / 20;
   thisScale = oScale;
   sideScale -= sideScale / 10;
}
i++;
this._rotation *= pLevel;
minNodeS = 20;
maxNodeS = 33;
minScale = 50;
_parent.upSideScale = oSideScale;
stem._xscale = sideScale;
this._x = _parent.sideScale * xMult;
sideScale = _parent.upSideScale;
easeThisScale += (thisScale - easeThisScale) / 20;
this._xscale = easethisScale;
this._yscale = easethisScale;
