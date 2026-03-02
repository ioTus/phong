i++;
if(i < 120)
{
   cir.duplicateMovieClip("cir" + i,i);
   cir._x = i * 8;
   cir._y = Math.random() * 20;
   cirScale = Math.random() * 400;
   cir._xscale = cirScale;
   cir._yscale = cirScale;
}
