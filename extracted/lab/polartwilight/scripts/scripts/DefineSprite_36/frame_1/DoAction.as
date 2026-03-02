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
maxA = 90;
minA = 20;
this._alpha = minA;
var mouseOver;
