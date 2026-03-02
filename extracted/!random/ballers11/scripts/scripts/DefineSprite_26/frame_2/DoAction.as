fernBallMax = 0;
if(fernBallNum < fernBallMax)
{
   fernBallNum += 1;
}
i = 1;
m += 0.1;
do
{
   Fern.duplicateMovieClip("Fern" + i,i);
   q = Math.cos(m);
   xFor = i * i;
   Yspacing = 5;
   FernX = Fern._x + xFor * q / 2;
   FernY = Fern._y - i * Yspacing;
   setProperty("Fern" + i, _X, FernX);
   setProperty("Fern" + i, _Y, FernY);
   setProperty("Fern" + i, _xscale, 100 - i * 4);
   setProperty("Fern" + i, _yscale, 100 - i * 4);
   rotate = i * FernX / 3;
   setProperty("Fern" + i, _rotation, rotate);
   i += 1;
}
while(i < fernBallNum);
