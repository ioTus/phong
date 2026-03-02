i++;
xmouse += (_xmouse - xmouse) / 40;
ymouse += (_ymouse - ymouse) / 40;
mDiff = Math.sqrt(Math.abs(xmouse * xmouse + ymouse * ymouse));
sinGrow = Math.sin(i);
sinGrow2 = Math.sin(i / 4);
sinGrow3 = Math.sin(i / 16);
cosGrow3 = Math.cos(i / 16);
mIt = 8 * Math.sin(i / 256);
nIt = 48 * Math.abs(Math.sin(i / 96));
RingScale = sinGrow3 * 100 + Math.cos(i / (mIt + 100)) * nIt;
DotScale = RingScale * 2;
DotScale = 180 + RingScale;
Dot.duplicateMovieClip("Dot" + i,i);
removeMovieClip("Dot" + removal);
thisDot = this["Dot" + i];
thisDot._xscale = DotScale;
thisDot._yscale = DotScale;
DotNum = 64;
DotMax = DotNum;
space += Math.cos(i);
if(DotNum < i)
{
   var removal = i;
}
Dot._alpha = 0;
ii = 0;
while(ii < DotNum)
{
   setProperty("Dot" + ii, _alpha, 100 - ii * (100 / DotNum));
   ii++;
}
