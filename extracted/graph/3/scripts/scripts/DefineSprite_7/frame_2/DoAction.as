ii++;
i = 0;
while(i < Onum)
{
   iii = i + ii;
   thisO = this["O" + i];
   edgeLation = Math.sin(i / 15);
   cosLation = Math.cos(i / 15);
   cosiii = Math.sin(ii / 256);
   Wave = Math.sin(iii / 16 + iii / 16) * Math.sin(iii / 32 * cosiii + iii / 4) * Math.sin(iii / 64 + iii / 6) * Math.sin(ii / (256 + Math.sin(iii / 8) + ii / 8)) * edgeLation * 8 + Math.cos(iii / 8 + i / 16) * Math.sin(ii / 16) * 4 + Math.cos(i / (Math.sin(iii / 40) * 8)) * 20;
   thisO.O._y = Wave;
   O._x = Ox;
   i++;
}
