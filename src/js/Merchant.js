Game.Merchant = function () {
    this._purchaseWants = {};
    this._sellWants = {};
    this._maxCarryWeight = 800;
    this._inventory = this.spawnInitialInventory();
    this._mainTalkOptions = {a:"Buy",b:"Sell"}
};
//return {1:"reclaimCNDWaste", 2: "reclaimCNDWaste", 3: "reclaimCNDWaste", 4: "sleep", 5: "sleep", 6: "sleep", 7: "sleep", 8: "sleep", 9: "sleep", 10:"sleep", 11:"sleep", 12:"sleep", 13:"sleep", 14:"sleep", 15:"sleep", 16:"sleep", 17:"sleep", 18:"sleep", 19:"sleep", 20:"sleep", 21:"sleep", 22:"sleep", 23:"sleep", 24:"sleep"};

Game.Merchant.prototype.spawnInitialInventory = function () {
    let ring1 = new Game.goldRing();
    let ring2 = new Game.goldRing();
    let ring3 = new Game.goldRing();
    let ring4 = new Game.goldRing();
    let newInventory = {1:ring1, 2:ring2, 3:ring3, 4:ring4};
    return newInventory;
};

Game.Merchant.prototype.getGoods = function () {
    console.log("This is my inventory");
    console.log(this._inventory);
    let theReturn = this._inventory;
    console.log(theReturn);
    return theReturn;
};

Game.Merchant.prototype.getPriceFor = function (theItem) {
    return 5;
};

Game.Merchant.prototype.sellItem = function (theItemList) {

};

Game.Merchant.prototype.buyItem = function (theItemList) {

};

Game.Merchant.prototype.looseItem = function (itemIndex) {
    delete this._inventory[itemIndex];// Add consolidation of inventoyr here
    let value;
    let newMap = {};
    let i = 0;
    let sillyBillyInventory = this._inventory;
    Object.keys(sillyBillyInventory).forEach(function(key) {
        i ++;
        value = sillyBillyInventory[key];
        newMap[i] = value;
    });
    this._inventory = newMap;
};

Game.Merchant.prototype._tempDesc = function () {
    return "A merchant named Luke"
};

Game.Merchant.prototype.getMainTalkOptions = function () {
    return "a:Buy~b:Sell~";
};

Game.Merchant.prototype.actionForKey = function (letter) {
    console.log("This is in actions for key");
    console.log(this._mainTalkOptions);
    console.log(letter);
  let theRet = this._mainTalkOptions[letter];
  return theRet;
};