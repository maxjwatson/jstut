Game.WorldStateTracker = function () {
  this._day = 0;
  this._tempEventStorm = false; // NOTE this is just a place holder.
    this._existingMerchants = this.generateInitialMerchants();
};

Game.WorldStateTracker.prototype.endDay = function () {
    this._day ++;
    this.playerThingsProgress();
    this.worldThingsProgress();
    let printInfo = {foodMessages: Game._homeBase.GetFoodInfo()};
    Game._printNewDayInfo(printInfo);
};

Game.WorldStateTracker.prototype.playerThingsProgress = function () {
    Game._homeBase.progressOneDay();

};

Game.WorldStateTracker.prototype.generateInitialMerchants = function () {
    let merch1 = new Game.Merchant();
    return [merch1];
};

Game.WorldStateTracker.prototype.sendMerchant = function () {
    let theMerch = this._existingMerchants[0];
    Game._homeBase.receiveMerchant(theMerch);
};

Game.WorldStateTracker.prototype.worldThingsProgress = function () {

    if (this._day == 3)
    {
        this.sendMerchant();
    }

    if (this._day == 10)
    {
        this._tempEventStorm = true;
    }
};