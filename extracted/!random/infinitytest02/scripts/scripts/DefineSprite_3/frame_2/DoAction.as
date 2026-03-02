xEase += (_xmouse - ball1._x) / 10;
yEase += (_ymouse - ball1._y) / 10;
ball1._x = Math.cos(i / 10) * 500;
ball1._y = Math.sin(i / 5) * 200;
i++;
ball1.duplicateMovieClip("ball0" + i,i);
ball1._alpha = 100;
