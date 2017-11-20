Game.weapon = function () {
    Game.item.call(this);
    Game.weapon.prototype = Object.create(Game.item.prototype);
    Game.weapon.prototype.constructor = Game.weapon;
};

