i++;
if(i < 120)
{
   cir.duplicateMovieClip("cir" + i,i);
   cir._x = i * 12;
   cirScale = Math.sin(i * 2) * 300;
   cir._xscale = cirScale;
   cir._yscale = cirScale;
}
