ii++;
i = 0;
while(i < Onum)
{
   iii = i + ii;
   thisO = this["O" + i];
   edgeLation = Math.sin(i / 15);
   cosLation = Math.cos(i / 15);
   cosiii = Math.sin(ii / 256);
   Wave = Math.sin(iii / 16 + ii / 16) * 80 * Math.sin(iii / 32 * cosiii + iii / 4) * Math.sin(iii / 64 + iii / 6) * Math.sin(ii / (256 + Math.sin(iii / 8) + ii / 8)) * edgeLation + Math.cos(iii / 2 + i / 2) * 10 * Math.sin(ii / 16);
   thisO.O._y = Wave;
   O._x = Ox;
   i++;
}
