eGrow = _root.eGrow3;
sinGrow = Math.sin(eGrow / 8);
BallScale = 100 + _root.Dot._xscale / 4;
Ball._xscale = BallScale / 4;
Ball._yscale = BallScale / 4;
xmouse += (xmouse - _xmouse) / 20;
ymouse += (ymouse - _ymouse) / 20;
mousePos = (xmouse + ymouse) / 2;
Ball.gotoAndPlay(1);
