i++;
lightwave = Math.cos(i / 0.5) * 2 + Math.cos(i / 1) * 1;
if(over and phong._alpha < 100)
{
   phong._alpha = phong._alpha + 3 + lightwave * 10;
}
else if(phong._alpha > 0)
{
   phong._alpha = phong._alpha - 4 + lightwave;
}
