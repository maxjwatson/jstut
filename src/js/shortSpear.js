Game.shortSpear = function () {
    Game.spearType.call(this);
    Game.shortSpear.prototype = Object.create(Game.spearType.prototype);
    Game.shortSpear.prototype.constructor = Game.shortSpear;
    this._totalLength = 24;
    console.log("short spear created");
    console.log(this.prototype instanceof Game.weapon);

    Game.shortSpear.prototype._draw = function(theX, theY) {
        Game.display.draw(theX, theY, "V", "red");
    };

    Game.shortSpear.prototype._description = function () {
        return "This is a short spear";
    };

};