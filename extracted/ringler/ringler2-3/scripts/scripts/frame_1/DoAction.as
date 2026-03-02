eGrow++;
eGrow3++;
sinGrow = Math.sin(eGrow);
sinGrow2 = Math.sin(eGrow / 4);
sinGrow3 = Math.sin(eGrow / 16);
cosGrow3 = Math.cos(eGrow / 16);
mIt = 8 * Math.sin(eGrow / 256);
nIt = 48 * Math.abs(Math.sin(eGrow / 96));
RingScale = sinGrow3 * 100 + Math.cos(eGrow / (mIt + 100)) * nIt;
DotScale = RingScale * 2 - 350;
DotScale = 180 + RingScale;
Dot._xscale = DotScale;
Dot._yscale = DotScale;
DotNum = 64;
DotMax = DotNum;
num2++;
Dot.duplicateMovieClip("Dot" + num2,num2);
space += Math.cos(num2);
if(DotNum < num2)
{
   var removal = num2;
}
removeMovieClip("Dot" + removal);
Dot._alpha = 0;
num3 = 0;
while(num3 < DotNum)
{
   setProperty("Dot" + num3, _alpha, 100 - num3 * (100 / DotNum));
   thisDot = this["Dot" + num3];
   thisDot.Deep._rotation += Math.cos(num3 / 64) * 2;
   num3++;
}
