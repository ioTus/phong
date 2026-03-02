i++;
aCenterPos = Math.sqrt(Math.pow(_xmouse,2) + Math.pow(_ymouse,2));
centerPos += (aCenterPos - centerPos) / 2;
thisScale = 100 - Math.abs(Math.pow(Math.sqrt(centerPos),2)) / 50;
if(thisScale < 5)
{
   thisScale = 5;
}
