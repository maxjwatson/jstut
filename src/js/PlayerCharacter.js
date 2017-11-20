Game.PlayerCharacter = function(x, y){
    this._x = x;
    this._y = y;
    this._hp = 3;
    this._draw();
    this._dead = false;
    this._inventory = [];
    this._listeningForInput = true;
    this._target = null;
};

Game.PlayerCharacter.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "@", "#FF0")
};

Game.PlayerCharacter.prototype.act = function () {
Game.engine.lock();
/* wait for user input; do stuff whe nuser hits a key*/
window.addEventListener("keydown",this);
};

Game.PlayerCharacter.prototype.getX = function() {return this._x};

Game.PlayerCharacter.prototype.getY = function () {return this._y};

Game.PlayerCharacter.prototype.takeDamage = function (damage) {
    this._hp -= damage;
    if (this._hp <= 0)
    {
        this._dead = true;
        alert("you are dead");
        Game.engine.lock();
    }

};

Game.PlayerCharacter.prototype.getFPointLocation = function () {
    return 0;
};

Game.PlayerCharacter.prototype.getFPointMaxDistance = function ()
{
    return 42; // NOTE this is inches
};

Game.PlayerCharacter.prototype.getFPointSpeed = function () {
    return 0.5;
};

Game.PlayerCharacter.prototype.getFPointAcceleration = function () {
    return 0;
};

Game.PlayerCharacter.prototype.getFPointMaxSpeed = function () {
    return 0.5;
};

Game.PlayerCharacter.prototype.getTarget = function () {
  return this._target;
};

Game.PlayerCharacter.prototype.setTarget = function (theTarget) {
    this._target = theTarget
};

Game.PlayerCharacter.prototype._checkBox = function () {
var key = this._x + "," + this._y;
let littleFloorSpace = Game.realMap.playerCheckingFloorSpace(this._x+","+this._y);
//if (Game.map[key] != "*"){
    if (littleFloorSpace == null){
        alert("There is no box here.");
    }
    else
    {
        alert("there is a"+littleFloorSpace+"on the floor");
    }
};

Game.PlayerCharacter.prototype.pickupItem = function () {
    console.log("calling pickup");
    Game.realMap._playerPickup(this._x, this._y);
};

Game.PlayerCharacter.prototype.inventoryAdd = function (theItem) {
  this._inventory.push(theItem);
};

Game.PlayerCharacter.prototype.startListening = function () {
    this._listeningForInput = true
};

Game.PlayerCharacter.prototype.stopListening = function () {
  this._listeningForInput = false;
};

Game.PlayerCharacter.prototype.getAttackOptions = function () {
  return ["Jab~Thrust"];
};

Game.PlayerCharacter.prototype.getAttackOptionsTemp2 = function () { // NOTE this comes with spacings
    return ["Jab","Thrust","Swipe legs","Smack head"];
};

Game.PlayerCharacter.prototype.handleEvent = function (e) {
    if (this._listeningForInput == true)
    {
/* process user input */
var code = e.keyCode;
if (code == 13 || code == 32){
//this._checkBox();
    this.pickupItem();
return;
}

var keyMap = {};
keyMap[104] = 0;
keyMap[105] = 1;
keyMap[102] = 2;
keyMap[99] = 3;
keyMap[98] = 4;
keyMap[97] = 5;
keyMap[100] = 6;
keyMap[103] = 7;

if (!(code in keyMap)) {return; }
var diff = ROT.DIRS[8][keyMap[code]];
var newX = this._x + diff [0];
var newY = this._y + diff [1];

var newKey = newX + "," + newY;
 //   console.log(Game.gameMap.getFloorMap());
//if (!(newKey in Game.gameMap.prototype.getFloorMap())) {return;} /* cannot move in this direction */
if (Game.realMap.getFloorSpace(newKey) == null)
{
    return;
}
    if (Game.realMap.getPersonSpace(newKey) != null)
    {
        Game._attackEnemy(Game.realMap.getPersonSpace(newKey));
        return;
    }
Game._playerWantsToMove(newX, newY);
    }
};