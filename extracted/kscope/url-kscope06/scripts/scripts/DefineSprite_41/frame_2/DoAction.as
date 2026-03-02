if((over == 1 or clicked == 1) and iconOver._alpha < maxOver)
{
   iconOver._alpha += maxOver / 3;
}
if(over == 0 and iconOver._alpha >= 0 and this.clicked == 0 or iconOver._alpha >= 0 and this.clicked == 0)
{
   iconOver._alpha -= iconOver._alpha / 15;
}
if(justclicked == 1 or clicked == 1)
{
   txtColor.setRGB(16745728);
}
if(6 >= iClick and justClicked == 1)
{
   iClick++;
}
if(iClick >= 5)
{
   this.clicked = 1;
   justClicked = 0;
   iClick = 0;
   _parent.clearClick = 0;
}
if(_parent.clearClick == 1 and this.justClicked == 0)
{
   this.clicked = 0;
   txtColor.setRGB(7831674);
}
