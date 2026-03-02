eGrow += 0.1;
cosFun = Math.cos(eGrow) * 4;
if(i < 16)
{
   i += 1;
}
else
{
   i = 0;
}
Hori.duplicateMovieClip("Hori" + i,i);
ScaleIt = 100 + cosFun * 8;
Hori._alpha = 0;
