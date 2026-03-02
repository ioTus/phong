if(0 < _parent.loadNew)
{
   img.picURL = _parent.picURL;
   _root.picURL = _parent.picURL;
   img.deep.gotoAndPlay(1);
   img.gotoAndPlay(2);
   _parent.loadNew -= 1;
}
docWidth = _parent._parent.docWidth;
docHeight = _parent._parent.docHeight;
Xpercent = _parent._parent.Xpercent;
Ypercent = _parent._parent.Ypercent;
imgWidth = img._width;
imgHieght = img._height;
maskSize = 225;
imgX = maskSize / 2 + (img._width / 2 - maskSize / 2) * Xpercent / 100;
imgY = maskSize / 2 - (img._height / 2 - maskSize / 2) * Ypercent / 100;
img._x = imgX;
img._y = imgY;
