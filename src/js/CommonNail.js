Game.CommonNail = function () {
    this._hasNails = false;
    this._bent = 4; // NOTE this 0 is unbent. Not sure how bent a nail can get
};

Game.NailPile.prototype.canBeStraightened = function () {
    if (this._bent > 1){
        return true
    }
    else
    {
        return false;
    }
};

Game.NailPile.prototype.howMuchWorkToStraighten = function (quality) { // NOTE quality here is speed. might redo eventually
    return ((this._bent * 2) - quality);
};

Game.NailPile.prototype.getStraightened = function (quality) {
    if (quality > 5){
        this._bent = 1;
    }
    else
    {
     this._bent = 2;
    }
};