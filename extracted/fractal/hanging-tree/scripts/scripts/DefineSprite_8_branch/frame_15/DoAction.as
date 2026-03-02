pLitGummy = _parent.pLitGummy;
baseScale = _parent.pLitGummy;
oscillation = Math.sin(i / 8 + stem.thisNum / 37.69911184307752) * 8;
this._rotation += _xmouse / ((100 + oRot / 2) * 0.5) + oscillation;
i++;
this._rotation *= Math.pow(aLevel / levelNum,0.25);
aCenterPos = Math.sqrt(Math.pow(_xmouse,2) + Math.pow(_ymouse,2));
centerPos += (aCenterPos - centerPos) / 2;
minNodeS = 20;
maxNodeS = 33;
thisScale = minNodeS + baseScale * maxNodeS;
minScale = 50;
if(thisScale < minScale)
{
   thisScale = minScale;
}
this._xscale = thisScale;
this._yscale = thisScale;
