Game.EarthWorm = function () {
    this._age = 90; // NOTE maturity is around 90 days. ALso age is counted in days.
    this._pregnant = 0;// NOTE this is both IF the worm is pregnant and for how long. 0 means not at all 5 would mean five days pregnant.
    this._weight = 0.5; // 12 ft worms can weight like a pound and a half this is also measured in ounces
    this._theBox = null;
};

Game.EarthWorm.prototype.setWormBox = function (whichBox) {
    this._theBox = whichBox;
};

Game.EarthWorm.prototype.giveBirth = function () {
    this._pregnant = 0;
    let newCocoon = new Game.EarthWormCocoon();
    newCocoon.setWormBox(this._theBox);
    this._theBox._addCocoon(newCocoon);
};

Game.EarthWorm.prototype.passOneDay = function () {

    this._age ++;
    if (this._pregnant > 0)
    {
        this._pregnant ++;
    }

    if (this._pregnant == 0){
        if ((this._age > 9) && (this._age < 1460)){ // NOTE this should be 90 but I put it to 9 for testing purposes
            this._pregnant = 1;
        }
    }

    if (this._pregnant >= 3) // NOTE this is actually about right
    {
        this.giveBirth();
    }

    if (this._age < 9) // NOTE shouold be 90
    {
        this._weight += 0.055; // NOTE this should be 0.0055
    }
};
