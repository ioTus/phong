YGrid._xscale = 0;
YGrid._yscale = 0;
YGrid._y = _parent._parent.Yspace * _parent._parent.Ynum / -2;
i = 0;
while(i < _parent._parent.Ynum)
{
   YGrid.duplicateMovieClip("YGrid" + i,i);
   this["YGrid" + i].gotoAndStop(Math.round(Math.random() * 10));
   YGrid._y += _parent._parent.Yspace;
   gridScale = 16 - Math.cos(YGrid._y / 200) * 12 - Math.cos(this._x / 80) * 6 - 6;
   YGrid._xscale = gridScale;
   YGrid._yscale = gridScale;
   if(gridScale < 0)
   {
      this["YGrid" + i].removeMovieClip();
   }
   YGrid._rotation = i * 360 * Math.random();
   i++;
}
YGrid._visible = 0;
stop();
