cosNum += 20;
if(i < 16)
{
   i += 1;
}
else
{
   i = 0;
}
BallAni.duplicateMovieClip("BallAni" + i,i);
BallAni._x = _xmouse;
BallAni._x += Math.cos(cosNum) * 80;
BallAni._y += Math.cos(cosNum * _ymouse);
BallAni._xscale += Math.cos(cosNum) * 180;
BallAni._yscale = BallAni._xscale + Math.cos(cosNum) * 180;
BallAni._rotation = _xmouse + 100;
BallAni._alpha = 100;
BallAni._alpha -= BallAni._xscale;
