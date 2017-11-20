Game.item = function () {

};


Game.item.prototype._draw = function(theX, theY) {
    Game.display.draw(theX, theY, "X", "red");
};

Game.item.prototype._description = function () {
  return "This is a description";
};