on(release){
   _parent.picURL = picURL;
   if(_parent.loading._currentframe < 20)
   {
      _parent.loading.gotoAndPlay(2);
   }
   if(20 < _parent.loading._currentframe)
   {
      _parent.loading.gotoAndPlay(20);
   }
   _parent.imglKb = 0;
   _parent.imgKb = 0;
}
