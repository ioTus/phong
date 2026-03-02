function ballTranslation(amouse, ahori)
{
   hmDiff = amouse - ahori;
   horiDiff = Math.abs(hmDiff);
   nN = hmDiff / horiDiff;
   inPull = horiDiff / multi * nN;
   velocity += horiDiff * nN / Math.sqrt(horiDiff) / 1;
   flingMouse += velocity + inPull;
   return flingMouse;
}
io++;
ii += 1;
xmouse = _xmouse + 0.002;
ymouse = _ymouse + 0.002;
bmDiff = amouse - Beauti._y;
lagMouse += bmDiff / 8;
multi = 4;
Hori = yM;
if(xmouse < b1._width * 1.5 and b1._width * -1.5 < xmouse)
{
   yM = ballTranslation(ymouse,Hori);
}
else
{
   yM = ballTranslation(1,Hori);
}
i = -1;
while(i < Onum)
{
   iii = i + ii;
   thisO = this["O" + i];
   edgeLation = Math.sin(i / 14.8);
   cosLation = Math.cos(i / 14.8);
   sinLength = Math.cos(iii / (16 + thisO._y / mult)) * 32 + ii;
   sSinLation = Math.sin(thisO._x / sinLength - iii / 10);
   cosiii = Math.sin(ii / 256);
   mult = 80;
   Wave = Math.sin(iii / 16 + iii / 16) * Math.sin(iii / 32 * cosiii + iii / 4) * Math.sin(iii / 64 + iii / 6) * Math.sin(ii / (256 + Math.sin(iii / 8) + ii / 8)) * edgeLation * (mult / 4) + Math.cos(iii / 8 + i / 16) * Math.sin(ii / 16) * (mult / 2) * edgeLation + Math.cos(ii / (Math.sin(iii / 32 + iii / 4) + 80 + iii / 16)) * (mult / 1) * sSinLation;
   xmouse = thisO._xmouse;
   prevY = Wave;
   yDiff = yM - prevY;
   thisO.yEase += (yDiff - thisO.yEase) / 2;
   playline = thisO.yEase * (Math.cos(xmouse / 100) * Math.cos(xmouse / 200) * Math.cos(xmouse / 300) * Math.cos(xmouse / 400));
   thisO.O._y = Wave + playline;
   i++;
}
