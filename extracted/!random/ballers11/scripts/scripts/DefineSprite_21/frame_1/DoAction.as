speed = 1;
if(Key.isDown(Key.RIGHT))
{
   dir += speed;
   right = 1;
}
if(Key.isDown(Key.LEFT))
{
   dir -= speed;
   left = 1;
}
dir += -1 * (dir / 8);
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
Big.duplicateMovieClip("Big" + i,i);
Big._x = _root.Ball._x;
Center._x = _root.Ball._x;
Center._y = _root.Ball._y;
Big._rotation += cosFun;
ScaleIt = 100 + cosFun * 10;
Big._xscale = ScaleIt;
Big._yscale = ScaleIt;
Big._alpha = 50 + velocity * 20;
