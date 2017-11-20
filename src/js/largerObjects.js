Game.largerObjects = function () {

};


Game.largerObjects.prototype._draw = function(theX, theY) {
    Game.display.draw(theX, theY, "I", "blue");
};

Game.largerObjects.prototype._description = function () {
    return "This is a larger description";
};