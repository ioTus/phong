function ballTranslation(amouse, ahori)
{
   if(amouse == xmouse)
   {
      xhDiff = amouse - ahori;
      xhoriDiff = Math.abs(xhDiff);
      nN = xhDiff / xhoriDiff;
      inPull = xhoriDiff / multi * nN;
      xforce = xhoriDiff * nN / Math.sqrt(xhoriDiff) / fDiv;
      xaddVelo = xforce / slow;
      xvelocity += xaddVelo;
      xflingMouse += xvelocity + inPull;
      return xflingMouse;
   }
   if(amouse == ymouse)
   {
      yhDiff = amouse - ahori;
      yhoriDiff = Math.abs(yhDiff);
      nN = yhDiff / yhoriDiff;
      inPull = yhoriDiff / multi * nN;
      yforce = yhoriDiff * nN / Math.sqrt(yhoriDiff) / fDiv;
      yaddVelo = yforce / slow;
      yvelocity += yaddVelo;
      yflingMouse += yvelocity + inPull;
      return yflingMouse;
   }
}
xmouse = _xmouse + 0.002;
ymouse = _ymouse + 0.002;
Hori._alpha = 100;
frameDown = 40;
if(xhoriDiff < Hori._width / 2 and yhoriDiff < Hori._height / 2)
{
   cD++;
}
else
{
   menu = false;
   cD = 0;
   Hori.gotoAndStop(1);
}
if(cD == frameDown)
{
   menu = true;
   Hori.gotoAndPlay(2);
}
bmDiff = amouse - Beauti._x;
lagMouse += bmDiff / 8;
fDiv = 8;
Hori._x = ballTranslation(xmouse,Hori._x);
x = xvelocity;
y = yvelocity;
velHyp = Math.sqrt(Math.abs(x ^ 2) + Math.abs(y ^ 2));
if(y < 0)
{
   arcSide = 0;
}
else
{
   arcSide = 180;
}
ballRot = Math.atan(x / y) * -1 * 180 / 3.141592653589793 + arcSide;
Hori._rotation = BallRot;
Hori._yscale = 100 + velHyp * 10;
ii++;
