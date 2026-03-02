cosNum = 20;
Mouse.hide();
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
BallAni._y = _ymouse;
BallAni._rotation += Math.cos(cosNum) * 50;
