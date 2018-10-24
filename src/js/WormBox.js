Game.WormBox = function () {
    this._maxDaysToHarvest = 10; // NOTE this is temp.
    this._stage = 1; // NOTE this will have to do with the flooding of various levels and stuff
    this._currentDay = 1;
    this._wormPile = this._spawnInitialWorms();
    this._cocoonPile = [];
    this._properlyWatered = true;
};


Game.WormBox.prototype._spawnInitialWorms = function () {
    let allTheWorms = [];
    let myself = this;
    for (let i=0; i<100; i++) {
        let anotherWorm = new Game.EarthWorm();
        anotherWorm.setWormBox(myself);
        allTheWorms.push(anotherWorm);
    }
    return allTheWorms;
};

Game.WormBox.prototype._tempDesc = function () {
    return ("Box w/ "+this._wormPile.length+" worms. It is in stage"+this._stage);
};

Game.WormBox.prototype._progressOneDay = function () {
  this._currentDay ++;
    this._wormPile.forEach(function(worm) {
        worm.passOneDay();
    });
    this._cocoonPile.forEach(function(cocoon) {
        cocoon.passOneDay();
    });
};

Game.WormBox.prototype._hatchCocoon = function (theCocoon) {
    let index = this._cocoonPile.indexOf(theCocoon);
    let wormNumber = theCocoon._getHatchlingNumber();
    let thePile = this._cocoonPile;
    let theWormPile = this._wormPile;
    let myself = this;
    console.log("THE COCOONS ARE HATCHING 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
    if (index > -1)
    {
        thePile.splice(index, 1);
    }
    for (let i = 0; i < wormNumber; i++) {
        console.log("MORE WORMS");
        let anotherWorm = new Game.EarthWorm();
        anotherWorm.setWormBox(myself);
        theWormPile.push(anotherWorm);
    };
};

Game.WormBox.prototype._addCocoon = function (theCocoon) {
    this._cocoonPile.push(theCocoon);
};

Game.WormBox.prototype.readyToHarvest = function () {
    if (this._stage == 4){
        return true;
    }
};

Game.WormBox.prototype.beTendedTo = function (theTender) { // NOTE I might add moving hte box at some point. But currently it's just filling up the box with water every few days.
    let tendPoints = theTender.getWormTendPower();
    if((this._stage == 1) && (this._currentDay > 3)){
        this._stage = 2;
        this._properlyWatered = false;
    }
    if((this._stage == 2) && (this._currentDay > 6)){
        this._stage = 3;
        this._properlyWatered = false;
    }
    if((this._stage == 3) && (this._currentDay > 9)){
        this._stage = 4;
        this._properlyWatered = false;
    }

    if (this._stage == 4) // NOTE maybe this should be to replace the dirt aswell.
    {
        let sillyWormPile = this._wormPile;
        sillyWormPile.forEach(function (aWorm) {
            if (aWorm._age > 90)
            {
                let index = sillyWormPile.indexOf(aWorm);
                if (index > -1)
                {
                    sillyWormPile.splice(index, 1);
                }
                Game._homeBase.addWorm(aWorm);
            }
        })
    }

    let waterFillWork = Game._homeBase.workToFetchWater;
    if (this._properlyWatered == false)
    {
        if (waterFillWork < tendPoints)
        {
            this._properlyWatered = true;
        }
    }
};