mouseOver = 1;
if(mouseOver and maxA >= this._alpha)
{
   this._alpha += 10;
}
else if(this._alpha >= minA)
{
   this._alpha -= 5;
}
var pLitA;
pLitA = (this._alpha - minA) / (maxA - minA);
pLitGummy = gummy(mouseOver + 1,25,15);
