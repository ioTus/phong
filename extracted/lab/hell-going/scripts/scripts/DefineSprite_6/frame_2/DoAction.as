ii++;
i++;
planet._x = Math.cos(ii / 20) * (200 + Math.cos(ii / 5) * 200);
planet._y = Math.sin(ii / 20) * (200 + Math.cos(ii / 5) * 200);
if(127 >= i)
{
   duplicateMovieClip(planet,"planet" + i,16384 + i);
}
