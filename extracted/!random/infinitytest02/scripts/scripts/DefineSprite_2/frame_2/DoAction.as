ii++;
this._alpha -= 100 / _parent.num;
if(this._alpha <= 0)
{
   this.removeMovieClip();
}
thisScale = 75 + Math.cos(ii / 10) * 50;
this._y = Math.cos(ii / 5) * 110;
