Game.exit = function () {
    Game.furniture.call(this);
    Game.exit.prototype = Object.create(Game.furniture.prototype);
    console.log("this is the exit"); // NOTE the first time I make an exit it isn't counted as an instance of furnature.
    console.log(this instanceof Game.furniture);
    Game.exit.prototype.constructor = Game.exit;
    this._description = function () {
        return "The Exit";
    };
};