splitNum = 1;
if(_root.levels >= 0 and _root.depth < 1024)
{
   n = 0;
   while(n < splitNum)
   {
      stemBranch = "branch" + _root.depth;
      this.attachMovie("branch",stemBranch,_root.depth++);
      this[stemBranch]._y = -10;
      this[stembranch]._rotation = 3;
      this[stembranch].oRot = this[stembranch]._rotation;
      this[stembranch].stem.thisLvl = _root.levels;
      levelScale = 100 + Math.cos(_root.depth / 32) * 20;
      this[stembranch]._xscale = levelScale;
      this[stembranch]._yscale = levelScale;
      n++;
   }
}
_root.levels--;
_quality = "low";
