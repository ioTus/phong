i++;
thisScale = 100 + Math.cos(thisNum / 127 * 3.141592653589793 * 2 + i / 4) * 50;
this._xscale = thisScale;
this._yscale = thisScale;
this._rotation = Math.cos(i / 10) * 60;
