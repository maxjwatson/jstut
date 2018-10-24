Game.WaterFlow = function () {
    this._totalWaterFlow = 0;
};



Game.WaterFlow.prototype._tempDesc = function () {
    return ("There are "+this._totalWaterFlow+" gallons of fresh water flowing through each day.");
};

Game.WaterFlow.prototype.setWaterFlow = function (totalFlow) {
    this._totalWaterFlow = totalFlow;
};