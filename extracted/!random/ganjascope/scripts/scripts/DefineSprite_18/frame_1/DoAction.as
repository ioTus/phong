imgx = kscope.kscope.img._x;
imgy = kscope.kscope.img._y;
ii++;
centerDiff = Math.sqrt(Math.pow(Math.abs(_xmouse),2) + Math.pow(Math.abs(_ymouse),2));
if(centerDiff < 325)
{
   xmouse = _xmouse;
   ymouse = _ymouse;
}
else
{
   Mouse.show();
   cursor._visible = 0;
   lV = 30;
   xmouse += Math.sin(ii / 32) * lV / 16 + Math.cos(ii / 16) * lV / 4 + Math.cos(ii / 8) * lV / 4 + Math.sin(ii / 4) * lV / 2;
   ymouse += Math.cos(ii / 32) * lV / 16 + Math.sin(ii / 16) * lV / 4 + Math.sin(ii / 8) * lV / 4 + Math.cos(ii / 4) * lV / 2;
}
