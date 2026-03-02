pLitGummy = _parent.pLitGummy;
baseScale = _parent.pLitGummy;
if(pLitGummy > 1.5)
{
}
i++;
aCenterPos = Math.sqrt(Math.pow(_xmouse,2) + Math.pow(_ymouse,2));
centerPos += (aCenterPos - centerPos) / 2;
minNodeS = 20;
maxNodeS = 33;
thisScale = minNodeS + baseScale * maxNodeS;
minScale = 40;
if(thisScale < minScale)
{
   thisScale = minScale;
}
this._xscale = thisScale;
this._yscale = thisScale;
