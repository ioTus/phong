splitNum = 2;
if(_root.levels >= 0 and _root.depth < 1024)
{
   n = 0;
   while(n < splitNum)
   {
      stemBranch = "branch" + _root.depth;
      this.attachMovie("branch",stemBranch,_root.depth++);
      this[stemBranch]._x = this[stemBranch]._y = -100;
      this[stembranch]._rotation = Math.cos(n * 3.141592653589793) * 120 * n * Math.random();
      this[stembranch].oRot = this[stembranch]._rotation;
      this[stembranch].stem.thisLvl = _root.levels;
      levelScale = this._xscale / 1.1;
      this[stembranch]._xscale = levelScale;
      this[stembranch]._yscale = levelScale;
      n++;
   }
}
_root.levels--;
_quality = "low";
