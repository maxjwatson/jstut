/**
 * Created by mwatson on 6/16/2017.
 */
/**
 * Created by mwatson on 6/16/2017.
 */
var Game = {
    display:null,
    init:function () {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer())
        this._generateMap()
    }
};
Game.map = {};
Game._generateMap = function () {
    var digger = new ROT.MAP.Digger();
    var digCallback = function (x, y, value) {
        if (value) { return; }
        var key = x+","+y;
        this.map[key] = ".";
    };
    digger.create(digCallback(digCallback.bind(this)));
    this._drawWholeMap();
};

Game.prototype.getSpace = function (x, y, l) {
return Game.map[x+","+y];
};

Game._drawWholeMap = function(){
    for(var key in this.map)
    {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.display.draw(x, y, this.map[key]);
    }
};

