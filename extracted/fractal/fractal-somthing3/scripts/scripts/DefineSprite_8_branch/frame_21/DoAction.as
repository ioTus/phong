this._rotation += _xmouse / ((80 + oRot / 2) * 2) + Math.sin(i / 32) * 2 + Math.cos(i / 10) * 2;
i++;
aCenterPos = Math.sqrt(Math.pow(_xmouse,2) + Math.pow(_ymouse,2));
centerPos += (aCenterPos - centerPos) / 2;
thisScale = 100 - Math.abs(Math.pow(Math.sqrt(centerPos),2)) / 120;
if(thisScale < 5)
{
   thisScale = 5;
}
this._xscale = thisScale;
this._yscale = thisScale;
