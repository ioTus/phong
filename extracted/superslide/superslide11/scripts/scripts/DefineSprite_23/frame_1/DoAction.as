function easeBack(main, ease)
{
   return (main - ease) / (Math.abs(_root.OneSide.cosGrow * response) + response);
}
function trackScale(coor)
{
   return 300 - Math.cos(Math.abs(coor) / 220) * 200;
}
Xnum = 16;
ynum = 12;
Xspace = 30;
Yspace = 60;
visc = _root.control.c2.value;
response = 30 + visc;
XtoEase = easeBack(_root.grid.hori.hori.hori._x * -1,XMouseEase);
YtoEase = easeBack(_root.grid.hori.hori.hori._y,YMouseEase);
XMouseEase += XtoEase;
YMouseEase += YtoEase;
XMouse = XMouseEase;
YMouse = YMouseEase;
if(Math.abs(cursor._x) < Xnum * Xspace / 2 and Math.abs(cursor._y) < Ynum * Yspace / 2)
{
   inGrid = true;
}
else
{
   inGrid = false;
}
cursor._x = _xmouse;
cursor._y = _ymouse;
XTracker._x = Xmouse * -1;
YTracker._y = Ymouse;
XTrackScale = trackScale(XTracker._x);
YTrackScale = trackScale(YTracker._y);
Xtracker._xscale = XtrackScale;
Xtracker._yscale = XtrackScale;
Ytracker._xscale = YtrackScale;
Ytracker._yscale = YtrackScale;
xLimit = 374;
if(xLimit < Xtracker._x)
{
   Xtracker._x = xLimit;
}
Hori._visible = 0;
