Game.secondExit = function () {
    Game.furniture.call(this);
    Game.secondExit.prototype = Object.create(Game.furniture.prototype);
    Game.secondExit.prototype.constructor = new Game.furniture();

    this._description = function () {
        return "The way out of this joint";
    };

    Game.secondExit.prototype._draw = function (theX, theY) {
        Game.display.draw(theX, theY, "H", "Orange");
    };

  //  Game.secondExit.prototype._activate = function() {
  //      Game.player._hp = 100;
  //      Game._moveDownALevel();
  //  };
};