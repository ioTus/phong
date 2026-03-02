pLitGummy = circle.pLitGummy;
cDiff = Math.sqrt(Math.pow(_xmouse,2) + Math.pow(_ymouse,2));
if(kOsc == 1 and oscMult < 1.2)
{
   oscMult += 0.1;
}
if(kOsc == 0 and 0 < oscMult)
{
   oscMult -= 0.1;
}
