if(aLevel < levelNum and _root.depth < cap)
{
   n = 1;
   while(splitNum >= n)
   {
      if(aLevel == 2 or aLevel == 1)
      {
         splitNum = 2;
      }
      else
      {
         splitNum = 1;
      }
      stemBranch = "branch" + _root.depth;
      if(aLevel == 1)
      {
         this.attachMovie("branch",stemBranch,splitNum + i * 2 + n);
         this[stemBranch].xMult = 1;
      }
      else
      {
         this.attachMovie("branch",stemBranch,_root.depth++);
         this[stemBranch].xMult = 1;
      }
      this[stemBranch]._y = -100;
      oX = 100;
      this[stemBranch]._x = oX;
      this[stemBranch].oX = oX;
      this[stembranch]._rotation = Math.cos(n * 3.141592653589793 / 4) * 60;
      this[stembranch].oRot = this[stembranch]._rotation;
      this[stembranch].stem.thisLvl = _root.levels;
      this[stembranch].stem.splitNum = n;
      thisScale = 80;
      levelScale = thisScale;
      this[stembranch].stem.oScale = levelScale;
      this[stembranch]._xscale = levelScale;
      this[stembranch]._yscale = levelScale;
      n++;
   }
}
_root.levels--;
