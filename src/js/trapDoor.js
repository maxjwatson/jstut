Game.trapDoor = function () {
    Game.largerObjects.call(this);
    Game.trapDoor.prototype = Object.create(Game.largerObjects.prototype)
    console.log("A trap door created");
    console.log(this instanceof Game.largerObjects)
    Game.trapDoor.prototype.constructor = Game.trapDoor;
};