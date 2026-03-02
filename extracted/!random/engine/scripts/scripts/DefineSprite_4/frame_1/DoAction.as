ii++;
thisDiv = 50;
xmouse += _parent._xmouse / 10;
iii = xmouse / 10 + iNum;
this._x = Math.cos(iii / thisDiv) * -200;
thisScale = 50 + Math.sin(iii / thisDiv) * 25;
sphere.sphere._y = Math.sin(iii / 5 + ii / 10) * 80 - Math.cos(ii / thisDiv);
this._xscale = thisScale;
this._yscale = thisScale;
