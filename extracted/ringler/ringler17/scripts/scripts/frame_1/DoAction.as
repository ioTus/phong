eGrow++;
eGrow3++;
sinGrow = Math.sin(eGrow);
sinGrow2 = Math.sin(eGrow / 4);
sinGrow3 = Math.sin(eGrow / 16);
cosGrow3 = Math.cos(eGrow / 16);
mIt = 8 * Math.sin(eGrow / 256);
nIt = 50 * Math.abs(Math.sin(eGrow / 100));
RingScale = sinGrow3 * 100 + Math.cos(eGrow / (mIt + 100)) * nIt;
DotScale = 150 + RingScale;
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
   thisDot = this["Dot" + num3];
   _root.thisDot.Deep._rotation = num3 * (num3 / 1) - num2 * num3;
   num3++;
}
