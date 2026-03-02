eGrow++;
sinGrow = Math.sin(eGrow);
sinGrow2 = Math.sin(eGrow / 5);
sinGrow3 = Math.sin(eGrow / 50);
mIt = 4 + 8 * Math.sin(eGrow / 250);
nIt = 20 + 50 * Math.abs(Math.sin(eGrow / 100));
RingScale = 300 + Math.cos(eGrow / mIt) * nIt;
DotScale = RingScale * 2 - 350;
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
