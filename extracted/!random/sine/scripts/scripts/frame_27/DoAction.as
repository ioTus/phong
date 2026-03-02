if(mouseGood == 1)
{
   secretBall.duplicateMovieClip(secretBall + ii,ii);
   exe = secretBall._X;
   secretBall._X = exe + 5;
   eye = secretBall._Y;
   cosIt = ii / 200 * (_xmouse - 510);
   Ycos = ii / 2 * Math.cos(cosIt) + 300 + (_ymouse - 300) * ii / 20;
   secretBall._Y = Ycos;
   ii += 1;
   BallNum = 128;
   if(2 < secretBall._alpha)
   {
      secretBall._alpha -= 10;
   }
   else
   {
      secretBall._alpha = BallNum / 2;
   }
   if(BallNum < ii)
   {
      secretBall._x = 102;
      secretBall._y = 302;
      ii = 0;
   }
}
