eGrow = _root.eGrow;
sinGrow = Math.sin(eGrow / 8);
BallScale = 100 + _root.Dot._xscale / 4;
Ball._xscale = BallScale / 4;
Ball._yscale = BallScale / 4;
mousePos = _xmouse;
ballStop = Math.round(Math.abs(mousePos + Math.cos(eGrow / 100) * 200));
Ball.gotoAndStop(ballStop);
