function gummy(innput, speeed, closin)
{
   inn = innput + 0.002;
   lOut = flingMouse;
   horiDiff = Math.abs(inn - lOut);
   uping = horiDiff;
   speed = speeed;
   multi = closin;
   mouseDiff = inn - lOut;
   nN = mouseDiff / Math.abs(mouseDiff);
   velocity += uping * nN / Math.sqrt(horiDiff) / speed;
   inPull = horiDiff / multi * nN;
   flingMouse += velocity + inPull;
   return flingMouse;
}
if(mouseOver and this._alpha <= maxA)
{
   this._alpha += 100;
}
else if(this._alpha >= minA)
{
   this._alpha -= 1;
}
var pLitA;
pLitA = (this._alpha - minA) / (maxA - minA);
pLitGummy = gummy(mouseOver + 1,10,5);
