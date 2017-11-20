Game.Pedro = function (x, y) {
    this._x = x;
    this._y = y;
    this._hp = 1;
    this._dead = false;
    this._draw();
    return "crud";
};

Game.Pedro.prototype._draw = function() {
    if (this._dead == true)
    {
        Game.display.draw(this._x, this._y, "X", "Blue");
    }
    else
    {
        Game.display.draw(this._x, this._y, "P", "red");
    }
};

Game.Pedro.prototype.takeDamage = function(howMuch, whom){// NOTE whom should always be this pedro, but I don't know why calling "this" returns a map instead of a pedro.
    this._hp -= howMuch;
    if (this._hp <= 0)
    {
        Game.Pedro.prototype.die(whom);
    }
};

Game.Pedro.prototype.die = function (whom) {
    console.log("I have died");
    this._dead = true;
    Game.removeFromScheduler(whom);
    Game.removeFromMap(whom);
};

Game.Pedro.prototype.getMeatPointDist = function () { // NOTE this should maybe not be here in the future.
    return 12;
};

Game.Pedro.prototype.getMeatPointSpeed = function () {
    return 1.0;
};

Game.Pedro.prototype.getMeatPointAcceleration = function () {
    return 0.04;
};

Game.Pedro.prototype.getMeatPointMaxSpeed = function () {
    return 0.3;
};

Game.Pedro.prototype.getMeatPointMaxDistance = function () {
    return 24 // NOTE this is measured in inches
};

Game.Pedro.prototype.getMeatPointDistance = function () {
  return 24;
};

Game.Pedro.prototype.getTempReactionTime = function () {
  let tempTime =    Math.floor(ROT.RNG.getUniform() * 50);
  console.log("this is temp time");
  console.log(tempTime);
  return tempTime;
};


Game.Pedro.prototype.act = function () {
    if (this._dead == false)
    {
    var x = Game.player.getX();
    var y = Game.player.getY();
    var passableCallBack = function (x, y) {
      //  return(x+","+y in Game.gameMap.prototype.getFloorMap);
        return Game.realMap.constructor.prototype.getFloorSpace(x+","+y);
    };
    var astar = new ROT.Path.AStar(x, y, passableCallBack, {topology:4});
    var path = [];
    var pathCallback = function (x, y) {
        path.push([x, y]);
    };
    astar.compute(this._x, this._y, pathCallback);
    path.shift();
  //  console.log(path);
    if (path.length == 1) {
        Game._attackPlayer(this);
        Game.realMap.setPersonSpace([this._x+","+this._y], this);
    } else {
//        console.log("Moving");
        x = path[0][0];
        y = path[0][1];
        this._x = x;
        this._y = y;
        Game.realMap.setPersonSpace([this._x+","+this._y], this);
    }}
    else
    {
        console.log("Pedro is dead")
    }
};

export default Game.Pedro();