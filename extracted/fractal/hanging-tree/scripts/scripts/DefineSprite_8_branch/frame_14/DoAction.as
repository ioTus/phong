if(aLevel < levelNum and _root.depth < cap)
{
   n = 1;
   while(n <= splitNum)
   {
      stemBranch = "branch" + _root.depth;
      this.attachMovie("branch",stemBranch,_root.depth++);
      this[stemBranch]._y = -100;
      this[stembranch]._rotation = Math.cos(n * 3.141592653589793) * 60 + Math.random(1) * 30;
      this[stembranch].oRot = this[stembranch]._rotation;
      this[stembranch].stem.thisNum = _root.depth;
      this[stembranch].stem.thisLvl = _root.levels;
      this[stembranch].stem.splitNum = n;
      n++;
   }
}
_root.levels--;
