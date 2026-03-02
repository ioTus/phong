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
Ball._x = Ball._x + Math.cos(cosNum) * 18 - _xmouse / 200;
Ball._xscale += Math.cos(cosNum) * 18;
Ball._yscale = Ball._xscale + Math.cos(cosNum) * 18;
Ball._alpha = 120 - Ball._xscale;
Ball._alpha -= Math.cos(cosNum) * 18;
Ball._alpha -= 8;
