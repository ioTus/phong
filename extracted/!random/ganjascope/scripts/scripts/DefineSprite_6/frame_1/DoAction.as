xmouse += (_parent._parent.xmouse - xmouse) / 20;
ymouse += (_parent._parent.ymouse - ymouse) / 20;
img._x = xmouse;
img._y = ymouse;
MaskW = 1024;
MaskH = 838;
halfWidth = MaskW / 2;
halfHeight = MaskH / 2;
rightLimit = img._width / 2;
leftLimit = img._width / -2 - 150;
topLimit = img._height / 2;
bottomLimit = img._height / -2 + 150;
if(rightLimit < img._x)
{
   img._x = rightLimit;
}
if(img._x < leftLimit)
{
   img._x = leftLimit;
}
if(topLimit < img._y)
{
   img._y = topLimit;
}
if(img._y < bottomLimit)
{
   img._y = bottomLimit;
}
