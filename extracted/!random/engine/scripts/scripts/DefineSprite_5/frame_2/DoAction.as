i++;
if(i < 64)
{
   sphere.duplicateMovieClip("sphere" + i,i);
   this["sphere" + i].iNum = i;
}
xC = Math.sin(i / 8) * 500;
yC = Math.cos(i / 8) * 500;
zC = Math.abs(Math.sin(i / 2) * 50 + 30);
x = xC / zC;
y = yC / zC;
scale = 0;
