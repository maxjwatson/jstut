Game.CockroachBox = function () {
    this._maxDaysToHarvest = 10; // NOTE this is temp.
    this._stage = 1; // NOTE this will have to do with the flooding of various levels and stuff
    this._currentDay = 1;
    this._cockroachPile = this._spawnInitialCockroaches();
    this._cocoonPile = [];
    this._calories = 0; // NOTE this is by weight in ounces.
    this._maxCaloriesAmount = 160;
    this._water = 0;
    this._maxWaterAmount = 128;
};


Game.CockroachBox.prototype._spawnInitialCockroaches = function () {
    let allTheCockroaches = [];
    let myself = this;
    for (let i=0; i<100; i++) {
        let anotherCockroach = new Game.Cockroach();
        anotherCockroach.setCockroachBox(myself);
        allTheCockroaches.push(anotherCockroach);
    }
    return allTheCockroaches;
};

Game.CockroachBox.prototype._tempDesc = function () {
    return ("Box crawling with "+this._cockroachPile.length+" skittering cockroaches.");
};

Game.CockroachBox.prototype._progressOneDay = function () {
    this._currentDay ++;
    this._cockroachPile.forEach(function(cockroach) {
        cockroach.passOneDay();
    });
    this._cocoonPile.forEach(function(cocoon) {
        cocoon.passOneDay();
    });
};

Game.CockroachBox.prototype._hatchCocoon = function (theCocoon) {
    let index = this._cocoonPile.indexOf(theCocoon);
    let wormNumber = theCocoon._getHatchlingNumber();
    let thePile = this._cocoonPile;
    let theCockroachPile = this._cockroachPile;
    let myself = this;
    console.log("THE COCOONS ARE HATCHING 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
    if (index > -1)
    {
        thePile.splice(index, 1);
    }
    for (let i = 0; i < wormNumber; i++) {
        console.log("Crikie more roaches");
        let anotherRoach = new Game.Cockroach();
        anotherRoach.setCockroachBox(myself);
        theCockroachPile.push(anotherRoach);
    }
};

Game.CockroachBox.prototype._addCocoon = function (theCocoon) {
    this._cocoonPile.push(theCocoon);
};

Game.CockroachBox.prototype._getOneDaysWaterAmount = function () {
    return (90/this._cockroachPile.length);
};

Game.CockroachBox.prototype.beTendedTo = function (theTender) {
    let tendPoints = theTender.getWormTendPower();


    let waterFillWork = Game._homeBase.workToFetchWater(); // NOTE I might want to merge these two functions at some point
    let waterFillAmount = Game._howMuchWaterGottenBy(theTender);
    let oneDaysWater = this._getOneDaysWaterAmount();
    let caloriesFillWork = Game._homeBase.workToFetchTangshang(); // NOTE Tang of Shang was a chinese king who was the first to eat ice cream.
    let caloriesFillAmount = Game._howMuchTangshangGottenBy(theTender);
    let oneDaysCalories = this._getOneDaysCaloriesAmount();
    if (this._water <= (this._maxWaterAmount - oneDaysWater));
    {
        if (waterFillWork < tendPoints)
        {
            this._water += waterFillAmount;
        }
    }

    if (this._calories <= (this._maxCaloriesAmount - oneDaysCalories));
    {
        if (caloriesFillWork < tendPoints)
        {
            this._calories += caloriesFillAmount;
        }
    }
};