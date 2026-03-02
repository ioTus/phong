YGrid._x = _parent.Xspace * _parent.Xnum / -2;
i = 1;
while(i < _parent.Xnum)
{
   YGrid.duplicateMovieClip("YGrid" + i,i);
   YGrid._x += _parent.Xspace;
   gridScale = 200 - Math.cos(Math.abs(YGrid._x) / 180) * 80;
   YGrid._xscale = gridScale;
   YGrid._yscale = gridScale;
   i++;
}
stop();
