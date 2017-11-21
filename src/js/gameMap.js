Game.gameMap = function () {
    console.log("Game map constructor called");
};

var floorMap = {};
var onFloorMap = {}; // NOTE by this I mean stuff that is on the floor but not actually blocking movement.
var personMap = {}; // NOTE this should be things occupying the floor.

Game.gameMap.prototype.getFloorMap = function()
{
    return this.floorMap;
};

Game.gameMap.prototype.getOnFloorSpace = function (spacey) {
    return onFloorMap[spacey];
};

Game.gameMap.prototype.getFloorSpace = function (spacey) {
    return floorMap[spacey];
};

Game.gameMap.prototype.playerCheckingFloorSpace = function (spacey) {
    return "Something";
};

Game.gameMap.prototype.getPersonSpace = function (spacey) {
    return personMap[spacey];
};

Game.gameMap.prototype.testfunc = function (athing) {
    console.log("this test has been successful");
};

Game.gameMap.prototype.clearFloorMap = function (thekey, thething)  {
    floorMap = {};
};

Game.gameMap.prototype.clearOnFloorMap = function (thekey, thething)  {
    onFloorMap = {};
};

Game.gameMap.prototype.setFloorSpace = function (thekey, thething)  {
    floorMap[thekey] = thething;
};

Game.gameMap.prototype.setOnFloorSpace = function (theKey, theThing) {
    onFloorMap[theKey] = theThing;
};

Game.gameMap.prototype.setPersonSpace = function (theKey, theThing) {
  personMap[theKey] = theThing;
};

Game.gameMap.prototype.showCurrentSpaceMessage = function () {
    let playerSpot = (Game.player._x+","+Game.player._y);
    let thingOnFloor =  this.getOnFloorSpace(playerSpot);//onFloorMap[playerSpot];
    if (thingOnFloor != null)
    {
        Game._logBasicMessage(thingOnFloor._description());
    }
};

Game.gameMap.prototype.clearPersonMap = function () {
  personMap = {};
};

Game.gameMap.prototype._drawWholeMap = function () {
    for(var key in floorMap)
    {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        if (floorMap[key] != null)
        {
            Game.display.draw(x, y, floorMap[key]);
        }
    }
    for(var key3 in onFloorMap)
    {
        var parts3 = key3.split(",");
        var x3 = parseInt(parts3[0]);
        var y3 = parseInt(parts3[1]);
        let floorThing = this.getOnFloorSpace(key3);//onFloorMap[key3];
        if (floorThing != null)
        {
            floorThing.constructor.prototype._draw(x3, y3);
        }
    }
    for(var key2 in personMap)
    {
        var parts2 = key2.split(",");
        var x2 = parseInt(parts2[0]);
        var y2 = parseInt(parts2[1]);
        if (personMap[key2] != null)
        {
            personMap[key2]._draw();
        }
    }
};

Game.gameMap.prototype._playerPickup = function(theX, theY)
{
    let theKey = (theX+","+theY);
    let theItem = this.getOnFloorSpace(theKey);//onFloorMap[theKey];
    if (theItem != null)
    {
        console.log("it's type");
        console.log(theItem);
        console.log(theItem.prototype.isPrototypeOf(Game.weapon()));
        console.log(theItem instanceof Game.weapon);
        console.log(theItem instanceof Game.shortSpear);
        console.log(theItem instanceof Game.spearType);
        console.log(theItem instanceof Game.furniture);
        if (theItem instanceof Game.furniture)
        {
            Game._logBasicMessage("This is a piece of furniture and can not be picked up");
            theItem._activate();
        }
        else
        {
            if (theItem instanceof Game.weapon)
            {
                console.log("This is a weapon.");
                Game.player._wieldWeapon(theItem);
            }

            else
            {
                Game.player.inventoryAdd(theItem);
                this.setOnFloorSpace(theKey, null);//onFloorMap[theKey] = null;
                Game._logBasicMessage("You have picked up" + theItem._description());
            }
        }
    }
};

Game.gameMap.prototype._removeGuyFromGame = function (theGuy) { // NOTE I think I'm ditching the ROT scheduler.
    var key = (theGuy._x+","+theGuy._y);
    personMap[key]  = null;
    Game.scheduler.clear();
    for (var key in floorMap)
    {
        Game.scheduler.add();
    }

};