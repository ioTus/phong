if(_root.fractal.stemScale > 10)
{
   var splitNum = 2;
   _root.fractal.stemScale -= 1;
   stemBranch = "branch" + _root.depth;
   n = 0;
   while(n < splitNum)
   {
      this.attachMovie("branch",stemBranch,_root.depth++);
      this[stemBranch]._rotation = Math.random() * 50;
      this[stemBranch]._y = -100;
      this[stemBranch]._xscale = _root.fractal.stemScale;
      this[stemBranch]._yscale = _root.fractal.stemScale;
      n++;
   }
}
