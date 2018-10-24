Game.EarthWormCocoon = function () {
    this._age = 0;
    this._larveNumber = 4;
    this._theBox = null;
};

Game.EarthWormCocoon.prototype.passOneDay = function () {
    this._age ++;
    if (this._age > 3){ // NOTE this number is temporary and will depend on the weather.
        this.hatch();
    };
};

Game.EarthWormCocoon.prototype._getHatchlingNumber = function () {
  return this._larveNumber;
};

Game.EarthWormCocoon.prototype.setWormBox = function (wormBox) {
    this._theBox = wormBox;
};

Game.EarthWormCocoon.prototype.hatch = function () {
    this._theBox._hatchCocoon(this);
};