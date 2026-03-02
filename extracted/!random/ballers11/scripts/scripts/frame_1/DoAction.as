if(Key.isDown(Key.RIGHT) and left < 0.01)
{
   right = 1;
}
else if(0 < right)
{
   right -= friction / topSpeed;
}
if(Key.isDown(Key.LEFT) and right < 0.01)
{
   left = 1;
}
else if(0 < left)
{
   left -= friction / topSpeed;
}
if(Key.isDown(Key.UP))
{
   up = 1;
}
else
{
   up = 0;
}
if(Key.isDown(Key.DOWN))
{
   down = 1;
}
else
{
   down = 0;
}
squash = 80;
Yscale = Yscale;
Xscale = Xscale;
Xscale = Ball._xscale;
Yscale = Ball._yscale;
Xpos = Ball._x;
Ypos = Ball._y;
Xplane = EXplane._y - Ball._height / 2 - 6;
accel = 0.1;
friction = 0.1;
topSpeed = 5;
if(right == 1 || left == 1)
{
   if(velocity < topSpeed)
   {
      if(ease < 1)
      {
         ease += 0.1;
      }
      velocity = velocity + velocity * velocity / 100 + accel;
   }
}
else if(0 < velocity)
{
   ease = 0;
   if(friction - friction / 10 < easeOut)
   {
      easeOut += friction * accel;
   }
   friction -= easeOut;
   velocity -= friction;
}
if(0 < right)
{
   Ball._x = Xpos + velocity;
}
if(0 < left)
{
   Ball._x = Xpos - velocity;
}
if(left == 1 || right == 1)
{
   if(squash < Yscale and 3 < velocity)
   {
      Ball._xscale = Xscale + 0.3;
      Ball._yscale = Yscale - 0.3;
   }
}
else if(Yscale < 100)
{
   Ball._yscale = Yscale + 0.8;
   Ball._Xscale = Xscale - 0.8;
}
Ball._y = (Ball._y + (Xplane - Ball._y) / (5 * (3 + velocity / 2))) / (1 + velocity * 0.0005);
if(Barrier._x - Ball._width / 2 < Ball._X)
{
   bounceBack = velocity;
   velocity = 0;
   Ball._x = Barrier._x - Ball._width / 2;
   if(100 < Ball._yscale)
   {
      Ball._yscale -= 3;
   }
}
if(0 < bounceBack)
{
   Ball._x -= bounceBack;
   bounceBack -= 0.1;
}
if(up == 1)
{
   if(squash < Xscale)
   {
      Ball._xscale = Xscale - 1;
      Ball._yscale = Yscale + 1;
   }
   if(up == 1)
   {
      Ball._y = Ypos - velocity / 5;
      rotInSp = 1.2;
      if(0.1 < right and Ball._rotation < 80)
      {
         Ball._rotation += rotInSp * right;
      }
      if(0.1 < left and -80 < Ball._rotation)
      {
         Ball._rotation -= rotInSp * left;
      }
      if(velocity < 1 and Ypos < Yplane - 5)
      {
         Ball._y = Ypos + 0.3;
      }
   }
}
else if(Xscale < 100)
{
   Ball._yscale = Yscale - 1;
   Ball._Xscale = Xscale + 1;
}
if(up == 1)
{
   if(532 < Ball._y)
   {
      Ball._y -= 0.2;
   }
   else if(right < 0.01 and left < 0.01)
   {
      Ball._y -= Math.sin(sinThis) / 2;
      sinThis += 0.1;
   }
}
maxPressure = 10;
if(down == 1 and right < 0.1 and left < 0.1)
{
   if(squash - 10 < Ball._yscale)
   {
      dPressure += 0.1;
      cosThis += 1;
      cosThisSin = Math.sin(cosThis);
      Ball._xscale = Ball._xscale + 1.3 + cosThisSin;
      Ball._yscale = Ball._yscale - 1.3 - cosThisSin;
      Germs._xscale -= 1.5;
      Germs._yscale -= 1.5;
   }
}
else if(0.2 < dPressure)
{
   if(maxPressure < dPressure)
   {
      dPressure = maxPressure;
   }
   Ball._y -= dPressure * 3;
   dPressure -= dPressure / 10;
   if(Ball._yscale < 200 - squash)
   {
      Ball._xscale -= dPressure * 4;
      Ball._yscale += dPressure * 4;
   }
}
if(0 < Ball._rotation and right < 0.9)
{
   Ball._rotation -= Ball._rotation / 20;
}
if(Ball._rotation < 0 and left < 0.9)
{
   Ball._rotation -= Ball._rotation / 20;
}
GermScale = 100 - 8 * velocity;
Germs._x = Ball._x;
Germs._y = Ball._y;
Germs._xscale = GermScale;
Germs._yscale = GermScale;
if(0.01 < right)
{
   Germs._rotation += velocity * 8;
}
if(0.01 < left)
{
   Germs._rotation -= velocity * 8;
}
if(down == 0 and up == 0 and right < 0.1 and left < 0.1)
{
   if(Ball._yscale < 99)
   {
      Ball._yscale += 100 / Ball._yscale * 0.5;
   }
}
