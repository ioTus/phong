cosNum += 2;
if(i < 1)
{
   i += 1;
}
else
{
   i = 0;
}
Ball.duplicateMovieClip("Ball" + i,i);
Ball._x += Math.cos(cosNum) * 8;
Ball._y += Math.cos(cosNum) * 2;
Ball._xscale += Math.cos(cosNum) * 18;
Ball._yscale = Ball._xscale + Math.cos(cosNum) * 18;
