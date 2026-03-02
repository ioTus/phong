splitNum = 2;
if(_root.levels >= 0 and _root.depth < 1024)
{
   n = 0;
   while(n < splitNum)
   {
      stemBranch = "branch" + _root.depth;
      this.attachMovie("branch",stemBranch,_root.depth++);
      this[stemBranch]._x = Math.cos(n * 3.141592653589793) * 50;
      this[stembranch].oRot = this[stembranch]._rotation;
      this[stembranch].stem.thisLvl = _root.levels;
      thisScale = 50;
      levelScale = thisScale;
      this[stembranch]._xscale = levelScale;
      this[stembranch]._yscale = levelScale;
      n++;
   }
}
_root.levels--;
