Game.goldRing = function () {
    Game.item.call(this);
    Game.goldRing.prototype = Object.create(Game.item.prototype);
    console.log("A gold ring made");
    console.log(this instanceof Game.item);
    Game.goldRing.prototype.constructor = Game.goldRing;
    this._description = function () {
        return " a gold ring";
    };
};

