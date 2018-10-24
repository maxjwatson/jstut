Game.NailPile = function () { // NOTE this is a CND waste Pile.
    this._pile = [];
    this._sorted = [];
};

Game.NailPile.prototype.addUnsortedNail = function (aNail) {
    console.log("A nail will be added");
    console.log(aNail);
    this._pile.push(aNail);
    this._pile = [].concat.apply([], this._pile);
    console.log(this._pile);
};

Game.NailPile.prototype._tempDesc = function () {
    return ("A pile of "+this._pile.length+" nails and "+this._sorted.length+"sorted nails");
};

Game.NailPile.prototype.sortNails = function (sortingPower) {
    console.log("This is in sort nails");
    let sillyPile = this._pile;
    let sortedPile = this._sorted;
    let i = 0;
    console.log(i);
    console.log(sortedPile);
    console.log(sortingPower)
    sillyPile.forEach(function (unsortedNail, index, object) {
    if (sortingPower > 4) {
        sortingPower -= 5;
        i = (i + 1);
        sortedPile.push(unsortedNail);
        object.splice(index, 1);
    }});
    return i;
};



Game.NailPile.prototype.straightenNails = function (thePower, theQuality) {
    console.log("This is in sort nails");
    let sortedPile = this._sorted;
    let i = 0;
    sortedPile.forEach(function (nail) {
        let cando = nail.canBeStraightened();
        if (thePower > 4) {
            if (cando == true)
            {
//                thePower -= 5;
                i = (i + 1);
                nail.getStraightened(theQuality);
            }
        }});
    return i;
};