x = _xmouse;
y = _ymouse;
if(y < 0)
{
   arcSide = 0;
}
else
{
   arcSide = 180;
}
Arrow._rotation = Math.atan(x / y) * -1 * 180 / 3.141592653589793 + arcSide;
