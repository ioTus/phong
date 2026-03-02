if(mouseOver and this._alpha <= maxA)
{
   this._alpha += 1;
}
else if(this._alpha >= minA)
{
   this._alpha -= 1;
}
var pLitA;
pLitA = (this._alpha - minA) / (maxA - minA);
pLitGummy = gummy(mouseOver + 1,15,5);
