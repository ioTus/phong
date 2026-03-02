Onum = 48;
Ospace = O._width + 1;
Oline = Onum * Ospace / -2;
i = 0;
while(i < Onum)
{
   Ox = Oline + Ospace * i;
   O._x = Ox;
   O.duplicateMovieClip("O" + i,i);
   thisO = this["O" + i];
   thisO.id = i;
   thisO.Ox = thisO._x;
   i++;
}
O._visible = 0;
mult = 120;
toggleHighQuality();
