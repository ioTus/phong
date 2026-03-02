numy = 24;
Mouse.hide();
i = 0;
while(numy >= i)
{
   kew.duplicateMovieClip("kew" + i,i);
   i++;
}
cursor.duplicateMovieClip("cursor1",numy + 5);
cursor1._alpha = 100;
toggleHighQuality();
