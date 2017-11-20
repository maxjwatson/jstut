Game.pureScheduler = function () {
//    this.floorMap = {};
};
var everyGuyMap = [];

Game.pureScheduler.prototype.removeEveryoneFromScheduler = function () {
    for(let aKey in everyGuyMap)
    {
        everyGuyMap[aKey] = null;
    }
};

Game.pureScheduler.prototype.addGuy = function (theGuy) {
    everyGuyMap.push(theGuy);
};

Game.pureScheduler.prototype.removeGuy = function (theGuy) {
    everyGuyMap = everyGuyMap.filter(e => e !== theGuy);
};


Game.pureScheduler.prototype.everyOneActs = function()
{
    for(var key in everyGuyMap)
    {
        var theMan = everyGuyMap[key];
        if (theMan instanceof Game.Pedro)
        {
            theMan.act();
        }
    }
    Game.engine.unlock();
};