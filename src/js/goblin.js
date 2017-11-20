Game.Goblin = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
    return "3232";
};

Game.Goblin.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "G", "red");
};

//exports = ROT.goblin;

//ROT.goblin.prototype.create = function(callback) {};
//
//ROT.goblin.prototype._fillMap = function(value) {
//   var map = [];
//    for (var i=0;i<this._width;i++) {
//        map.push([]);
//        for (var j=0;j<this._height;j++) { map[i].push(value); }
//    }
//    return map;
//};
//
export default Game.Goblin();