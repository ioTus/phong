i++;
Block._alpha = 100;
i5 = Math.abs(Math.round(Pusher._x / 15));
Block.duplicateMovieClip("Block" + i5,i5);
sxmouse += (_xmouse - sxmouse) / 2;
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
set(function setBlock(xp, yp)
{
},0());
Block._x = Pusherx;
fRadius = 200;
BlockScale = 100 - Math.cos(Block._x / fRadius) * 80;
Block._xscale = BlockScale;
Block._yscale = BlockScale;
if(inpressed == 1)
{
   xmouse = sxmouse + fxdiff;
   ymouse = symouse + fydiff;
   Pusher._x = _xmouse;
}
else
{
   Pusher._x += xdecay * (BlockScale / 100);
   xdecay -= xdecay / 20;
   if(RightLimit._X < Pusher._x)
   {
      Pusher._x = LeftLimit._x;
   }
   if(Pusher._x < LeftLimit._X)
   {
      Pusher._x = RightLimit._x;
   }
}
Block._alpha = 0;
