Game.furniture = function () {

};

Game.furniture.prototype._activate = function() {
    Game.player._hp = 100;
    Game._moveDownALevel();
};


Game.furniture.prototype._draw = function(theX, theY) {
    Game.display.draw(theX, theY, "O", "");
};

Game.furniture.prototype._description = function () {
    return "This is a description";
};