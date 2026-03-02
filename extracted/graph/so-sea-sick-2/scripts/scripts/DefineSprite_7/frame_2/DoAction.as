ii += 1;
if(ii < 128)
{
   mult -= 1;
}
i = 0;
while(i < Onum)
{
   iii = i + ii;
   thisO = this["O" + i];
   edgeLation = Math.sin(i / 14.8);
   cosLation = Math.cos(i / 14.8);
   sinLength = Math.cos(iii / (16 + thisO._y / mult)) * 32 + ii;
   sSinLation = Math.sin(thisO._x / sinLength - iii / 10);
   cosiii = Math.sin(ii / 256);
   Wave = Math.sin(iii / 16 + iii / 16) * Math.sin(iii / 32 * cosiii + iii / 4) * Math.sin(iii / 64 + iii / 6) * Math.sin(ii / (256 + Math.sin(iii / 8) + ii / 8)) * edgeLation * (mult / 4) + Math.cos(iii / 8 + i / 16) * Math.sin(ii / 16) * (mult / 1) * edgeLation + Math.cos(ii / (Math.sin(iii / 32 + iii / 4) + 80 + iii / 16)) * (mult / 2) * sSinLation;
   xm = thisO._xmouse;
   ym = thisO._ymouse;
   xmDisplace = xm - thisO.O._x;
   ymDisplace = ym - thisO.O._y;
   mDiff = Math.sqrt(Math.pow(xmDisplace,2) + Math.pow(ymDisplace,2));
   mDisplace = ymDisplace * 2 * Math.abs(xmDisplace) * -0.3 * edgeLation;
   thisO.O._y = Wave - mDisplace / 100;
   i++;
}
