if(_xmouse < box._x + box._width / 2 and box._x - box._width / 2 < _xmouse and _ymouse < box._y + box._height / 2 and box._y - box._height / 2 < _ymouse)
{
   mover = true;
   hori._visible = 1;
}
else
{
   mover = false;
   hori._visible = 0;
}
if(mover)
{
   box._alpha += 8;
}
else
{
   box._alpha -= box._alpha / 10;
}
if(box._alpha < 0)
{
   box._visible = 0;
   box._alpha = 0;
}
else
{
   box._visible = 1;
}
if(100 < box._alpha)
{
   box._alpha = 100;
}
hori._y = _parent.yM;
