Game.weapon = function () {
    Game.item.call(this);
    Game.weapon.prototype = Object.create(Game.item.prototype);
    Game.weapon.prototype.constructor = Game.weapon;
    Game.weapon.prototype._draw = function(theX, theY) {
        Game.display.draw(theX, theY, "U", "blue");
    };

    Game.weapon.prototype._description = function () {
        return "Generic weapon";
    };
};