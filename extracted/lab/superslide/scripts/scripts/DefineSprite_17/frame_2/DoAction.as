function setBlock(xp, yp)
{
}
i++;
Block._alpha = 100;
i5 = Math.abs(Math.round(Pusher._x / 48));
Block.duplicateMovieClip("Block" + i5,i5);
sxmouse += (_xmouse - sxmouse) / 4;
symouse += (_ymouse - symouse) / 8;
sxdiff += (sxmouse - sxdiff) / 32;
sydiff += (symouse - sydiff) / 32;
xcospan = sxmouse - sxdiff;
ycospan = symouse - sydiff;
xabs = Math.abs(sxdiff) / sxdiff;
yabs = Math.abs(sydiff) / sydiff;
fxdiff = Math.cos(i / 8) * xcospan;
fydiff = Math.cos(i / 8) * ycospan;
BlockSide = Math.abs(Block._x) / Block._x;
Pusherx = Pusher._x;
pi = 3.141592653589793();
Block._x = Pusherx;
slowTime = 40;
xdecay -= xdecay / slowTime;
Block._alpha = 0;
if(inpressed == 1)
{
   xmouse = sxmouse;
   ymouse = symouse;
   Pusher._x = _xmouse;
}
else
{
   pushMDiff = _xmouse - Pusher._x;
   Pusher._x += xdecay + pushMDiff / 20;
   Pusher._y = 5;
   absdecay = Math.abs(xdecay);
   Pusher._xscale = 50 * (absDecay / 16 + 1.01);
   Pusher._alpha = 100 / (absDecay / 32 + 1.001);
   if(RightLimit._X < Pusher._x)
   {
      Pusher._x = LeftLimit._x;
   }
   if(Pusher._x < LeftLimit._X)
   {
      Pusher._x = RightLimit._x;
   }
}
