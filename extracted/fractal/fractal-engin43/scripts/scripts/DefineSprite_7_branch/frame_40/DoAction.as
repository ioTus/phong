splitNum = 2;
if(_root.levels >= 0 and _root.depth < 128)
{
   n = 0;
   while(n < splitNum)
   {
      stemBranch = "branch" + _root.depth;
      this.attachMovie("branch",stemBranch,_root.depth++);
      this[stemBranch]._y = -100;
      this[stembranch]._rotation = -100 + Math.random(1) * 200;
      levelScale = 100 - _root.levels / 1;
      this[stembranch]._xscale = levelScale;
      this[stembranch]._yscale = levelScale;
      n++;
   }
}
_root.levels--;
this._rotation = oRot;
_quality = "low";
