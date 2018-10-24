Game.WoodBoard = function () {
    this._hasNails = true; // NOTE this will be replaced with a function soon
    this._nails = this._spawnInitialNails();
};

Game.WoodBoard.prototype._spawnInitialNails = function () {
    let initNails = [];
    for (let i=0;i<8;i++) {
        let aNail = new Game.CommonNail();
        initNails.push(aNail);
    }
    return initNails;
};

Game.WoodBoard.prototype._tempDesc = function () {
    return ("A wooden board with nails in it");
};

Game.WoodBoard.prototype.removeNails = function (denailPower) {
    let removedNails = [];
    let theNails = this._nails;
    let i = 0;
    //console.log("Nails before remove nails");
    //console.log(this._nails);
    this._nails.forEach(function (nail, index, object) {
        if (denailPower > 0){
            //i ++;
            denailPower -= 5;
            removedNails.push(nail);
           // console.log("these are the nails"+theNails);
           // console.log(object);
            object.splice(index, 1);
            ///theNails.remove(i); // NOTE this might not be the best way to do this, but it SHOULD work.
        }
    });
    //console.log("these are removedNails");
    //console.log(removedNails);
    //console.log(this._nails);
    if (this._nails.length <= 0)
    {
        console.log("NO MORE NAILS IN BOARD");
        this._hasNails = false;
    }
    return removedNails;
};