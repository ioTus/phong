xmouse = _xmouse;
ymouse = _ymouse;
centerDiff = Math.sqrt(Math.pow(Math.abs(xmouse + 0.01),2) + Math.pow(Math.abs(ymouse + 0.01),2)) + 0.001;
cSmooth += Math.round((centerDiff - cSmooth) / 20);
maxCenter = 200;
radDeg = 57.29577951308232;
x = _xmouse + 0.01;
y = _ymouse + 0.01;
velHyp = Math.sqrt(Math.abs(x ^ 2) + Math.abs(y ^ 2));
if(x <= 0 and y >= 0)
{
   Q = 1;
}
if(x <= 0 and y <= 0)
{
   Q = 2;
}
if(x >= 0 and y <= 0)
{
   Q = 3;
}
if(x >= 0 and y >= 0)
{
   Q = 4;
}
if(prevQ == 4 and Q == 1)
{
   t++;
}
if(prevQ == 1 and Q == 4)
{
   t--;
}
if(y < 0)
{
   arcSide = 180;
}
else
{
   arcSide = 0;
   if(x >= 0)
   {
      arcSide = 360;
   }
}
ballRot = Math.atan(x / y) * -1 * radDeg + arcSide + t * 360 + 180;
dialRot += (ballRot - dialRot) / 20;
centerEase += (centerDiff - centerEase) / 20;
oldBallRot = ballRot;
prevQ = Q;
spinDiv = 8;
line._rotation = dialRot;
line._yscale = centerEase;
i++;
