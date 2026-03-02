everGrowing2 += 0.1;
CosGrow = Math.cos(everGrowing2);
BallSScale = 100 + CosGrow * 250;
Baller._xscale = BallSScale;
Baller._yscale = BallSScale;
Baller._y += 2;
