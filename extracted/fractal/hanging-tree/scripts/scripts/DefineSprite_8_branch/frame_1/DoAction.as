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
splitNum = 2;
levelNum = 6;
cap = 512;
this.aLevel = _parent.aLevel + 1;
over = 0;
mOver = 0;
root = 0;
shrunk = 0;
growing = 0;
grown = 0;
above = 0;
rootSc = 0;
