ttotal = _root.getBytesTotal();
lloaded = _root.getBytesLoaded();
circleScale = lloaded / ttotal * 100;
circle._xscale = circleScale;
circle._yscale = circleScale;
circle._alpha = 100 - circleScale / 1.25;
if(circleScale == 100)
{
   _root.gotoAndStop(2);
}
