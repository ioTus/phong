pLitGummy = _parent.pLitGummy;
baseScale = _parent.pLitGummy;
if(pLitGummy > 1.5)
{
   this._rotation += _xmouse / ((80 + oRot / 2) * 0.5);
}
else
{
   this._rotation += _xmouse / ((80 + oRot / 2) * 1);
}
i++;
