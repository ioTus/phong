on(release){
   _parent._parent.picURL = whereAt;
   _parent.picURL = whereAt;
   this.justClicked = 1;
   _parent.clearClick = 1;
   if(_parent._parent.loading._currentframe < 20)
   {
      _parent._parent.loading.gotoAndPlay(2);
   }
   if(20 < _parent._parent.loading._currentframe)
   {
      _parent._parent.loading.gotoAndPlay(20);
   }
}
