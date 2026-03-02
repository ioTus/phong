Mouse.hide();
iMax = 18;
if(i < iMax)
{
   i += 1;
}
else
{
   i = 0;
}
Ball.duplicateMovieClip("Ball" + i,i);
Ball.stop();
Ball._alpha = 0;
xmouse = hori.shori.hori._x;
ymouse = hori.shori.hori._y;
Ball._x = xmouse;
Ball._y = ymouse;
Ball._rotation += Math.abs(ymouse + 0.05) / Math.abs(xmouse + 0.04) * 80;
Ball._rotation += 2;
Ball._alpha = 45;
everGrowing += 0.1;
ballScale = 100 + Math.cos(everGrowing) * 10;
Ball._xscale = ballScale;
Ball._yscale = ballScale;
