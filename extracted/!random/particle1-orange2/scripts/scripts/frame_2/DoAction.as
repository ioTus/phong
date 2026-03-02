Xdiff = _xmouse - Xmouse;
Xplus = Xdiff / 30;
Ydiff = _ymouse - Ymouse;
Yplus = Ydiff / 30;
Xmouse += Xplus;
Ymouse += Yplus;
Line._xscale = Xdiff * 10;
Line._yscale = Ydiff * 10;
Line._x = Xmouse;
Line._y = Ymouse;
dotBall._x = _xmouse;
dotBall._y = _ymouse;
i = 1;
while(numy >= i)
{
   kew.duplicateMovieClip("kew" + i,i);
   exes = getProperty("kew" + i, _X);
   eyes = getProperty("kew" + i, _Y);
   kewX = getProperty("kew", _X);
   kewY = getProperty("kew", _Y);
   supx = ((- i) * (kewX - xmouse * i / numy) + kewX) / numy + kewX - kewX / numy;
   supy = ((- i) * (kewY - ymouse * i / numy) + kewY) / numy + kewY - kewY / numy;
   kewScale = 2 + 40 * i;
   setProperty("kew" + i, _xscale, kewScale);
   setProperty("kew" + i, _yscale, kewScale);
   setProperty("kew" + i, _X, supx);
   setProperty("kew" + i, _Y, supy);
   setProperty("kew" + i, _alpha, 50);
   XdiffAft = _xmouse - Xmouse;
   i++;
}
