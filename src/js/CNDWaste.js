Game.CNDWaste = function () { // NOTE this is a CND waste Pile.
    this._pile = [];
    this._sorted = this._spawnInitialSorted();
};


Game.CNDWaste.prototype._spawnInitialSorted = function () {
    let woodenBoardPile = [];
    for (let i=0;i<8;i++) {
        let aBoard = new Game.WoodBoard();
        woodenBoardPile.push(aBoard);
    }
    return woodenBoardPile;
};

Game.CNDWaste.prototype.addMoreCND = function (theNewCND) {
    this._pile.push()
};

Game.CNDWaste.prototype.getBoardsAndStudsWithNails = function () {
    let thingsWithNails = [];
    this._sorted.forEach(function (scrap) {
        if (scrap._hasNails == true) // NOTE this will be replaced to see if it decends from whatever but this is tenp
        {
            thingsWithNails.push(scrap);
        }
    });
    return thingsWithNails;
};

Game.CNDWaste.prototype.getWoodWithNails = function () {
    let thingsWithNails = [];
    this._sorted.forEach(function (scrap) {
        if (scrap._hasNails == true) // NOTE this will be replaced to see if it decends from whatever but this is tenp
        {
            thingsWithNails.push(scrap);
        }
    });
    return thingsWithNails;
};

Game.CNDWaste.prototype.getTwoByFours = function () {

};

Game.CNDWaste.prototype.getSortedTwoByFours = function () {

};