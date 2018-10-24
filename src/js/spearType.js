Game.spearType = function () {
    Game.weapon.call(this);
    Game.spearType.prototype = Object.create(Game.weapon.prototype);
    Game.spearType.prototype.constructor = Game.spearType;
    this._totalLength = 36;// NOTE this are inches
    this._totalWeight = 48; //NOTE 16 ounces to a pound

    Game.spearType.prototype.getJabLength = function () {
        return this._totalLength;
    }
};