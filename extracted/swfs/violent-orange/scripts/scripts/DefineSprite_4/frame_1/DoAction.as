i++;
if(i < 120)
{
   cir.duplicateMovieClip("cir" + i,i);
   cir._x = Math.cos(i / 9) * 400;
   cir._y = Math.sin(i / 9) * 400;
   cirScale = i * Math.cos(i * 3.141592653589793) * 4;
   cir._xscale = cirScale;
   cir._yscale = cirScale;
}
