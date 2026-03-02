BallNum = 40;
BallSpacing = 10;
if(mouseGood == 1)
{
   Xbase = 164;
   Ybase = 300;
   do
   {
      Ball.duplicateMovieClip(Ball + i,i);
      exe = Ball._X;
      Ball._X = exe + BallSpacing;
      eye = Ball._Y;
      Wave = _xmouse - 13;
      realWave += (Wave - realWave) / 200;
      cosIt = i / 200 * realWave - q / 300 * i;
      Ycos = i / 2 * Math.sin(cosIt) + Ybase + (_ymouse - Ybase) * i / 40 * i / 40;
      Ball._Y = Ycos;
      i++;
      endLine._y = 40;
      if(2 < Ball._alpha)
      {
         Ball._alpha -= 2.1;
      }
      else
      {
         phyc = 2;
         Ball._alpha = BallNum * phyc + 10;
      }
      BallScale = Ball._alpha * 2;
      Ball._xscale = BallScale;
      Ball._yscale = BallScale;
      if(BallNum < i)
      {
         Ball._x = Xbase + 2;
         Ball._y = Ybase + 2;
         i = 0;
         q++;
      }
      endLineDot._X = Ball._x;
      endLineDot._Y = Ball._Y;
   }
   while(i < BallNum);
}
Out._x = _xmouse;
Out._y = _ymouse;
if(superScene == 1)
{
   gotoAndPlay(26);
}
