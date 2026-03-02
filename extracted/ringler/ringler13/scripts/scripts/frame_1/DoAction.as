eGrow++;
sinGrow = Math.sin(eGrow);
sinGrow2 = Math.sin(eGrow / 5);
sinGrow3 = Math.sin(eGrow / 20);
cosGrow3 = Math.cos(eGrow / 20);
mIt = 8 * Math.sin(eGrow / 250);
nIt = 50 * Math.abs(Math.sin(eGrow / 100));
RingScale = sinGrow3 * 100 + Math.cos(eGrow / mIt) * nIt;
DotScale = 200 + RingScale;
Dot._xscale = DotScale;
Dot._yscale = DotScale;
DotNum = 64;
DotMax = DotNum;
num2++;
Dot.duplicateMovieClip("Dot" + num2,num2);
if(DotNum < num2)
{
   var removal = num2;
}
removeMovieClip("Dot" + removal);
Dot._alpha = 0;
num3 = 0;
while(num3 < DotMax)
{
   setProperty("Dot" + num3, _alpha, 100 - num3 * (100 / DotNum));
   num3++;
}
Dot1._alpha = 20;
Dot2._alpha = 40;
Dot3._alpha = 60;
Dot4._alpha = 80;
