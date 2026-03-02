var stemBranch = "branch" + _root.depth;
n = 0;
while(n < 1)
{
   this.attachMovie("branch",stemBranch,_root.depth++);
   n++;
}
stemScale = 100;
stop();
