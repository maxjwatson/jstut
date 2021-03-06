/**
 * @class Visual map display
 * @param {object} [options]
 * @param {int} [options.width=ROT.DEFAULT_WIDTH]
 * @param {int} [options.height=ROT.DEFAULT_HEIGHT]
 * @param {int} [options.fontSize=15]
 * @param {string} [options.fontFamily="monospace"]
 * @param {string} [options.fontStyle=""] bold/italic/none/both
 * @param {string} [options.fg="#ccc"]
 * @param {string} [options.bg="#000"]
 * @param {float} [options.spacing=1]
 * @param {float} [options.border=0]
 * @param {string} [options.layout="rect"]
 * @param {bool} [options.forceSquareRatio=false]
 * @param {int} [options.tileWidth=32]
 * @param {int} [options.tileHeight=32]
 * @param {object} [options.tileMap={}]
 * @param {image} [options.tileSet=null]
 * @param {image} [options.tileColorize=false]
 */
ROT.customMegaCanvas = function(options) {
    var canvas = document.createElement("canvas");
    this._context = canvas.getContext("2d");
    this._data = {};
    this._dirty = false; /* false = nothing, true = all, object = dirty cells */
    this._options = {};
    this._backend = null;
    this._playerCharacter = null;
    this._listeningForInput = false;
    this._attackOptions = [];
    this._inCombatMenu = false;
    this._textSelectedAttackOption = null;
    this._highlightedCombatOption = null;
    this._inBase = false;
    this._schedulingWork = false;
    this._schedulingSpecific = false;
    this._workOptions = [];
    this._purchaseOptions = [];
    this._selectedWorkOption = 0;
    this._selectedEmployee = null;
    this._selectedHour = 1;
    this._selectedItem = 1;
    this._selectedPurchaseOptions = 1;
    this._inMainStockPileScreen = false;
    this._inMainVisitorScreen = false;
    this._selectedPile = null;
    this._whichScreen = "default";
    this.__lookingAtSpecificvisitor = false;
    this._selectedVisitor = null;
    console.log("this is the custom mega canvas");
    console.log(this);
    // this._amIMenu = false;
    // this._listeningForInput = false;

    var defaultOptions = {
        width: ROT.DEFAULT_WIDTH,
        height: ROT.DEFAULT_HEIGHT,
        transpose: false,
        layout: "rect",
        fontSize: 15,
        spacing: 1,
        border: 0,
        forceSquareRatio: false,
        fontFamily: "monospace",
        fontStyle: "",
        fg: "#ccc",
        bg: "#000",
        tileWidth: 32,
        tileHeight: 32,
        tileMap: {},
        tileSet: null,
        tileColorize: false,
        termColor: "xterm"
    };
    for (var p in options) { defaultOptions[p] = options[p]; }
    this.setOptions(defaultOptions);
    this.DEBUG = this.DEBUG.bind(this);

    this._tick = this._tick.bind(this);
    requestAnimationFrame(this._tick);
};

/**
 * Debug helper, ideal as a map generator callback. Always bound to this.
 * @param {int} x
 * @param {int} y
 * @param {int} what
 */
ROT.customMegaCanvas.prototype.DEBUG = function(x, y, what) {
    var colors = [this._options.bg, this._options.fg];
    this.draw(x, y, null, null, colors[what % colors.length]);
};

ROT.customMegaCanvas.prototype.setPlayer = function (thePlayer) {
    this._playerCharacter = thePlayer;
};

ROT.customMegaCanvas.prototype.updateHPDisplay = function () {
    var theHP = ("HP:" + Game.player._hp.toString()); // NOTE maybe I should add some more functions here. \_('-')_/
    this.newDraw(1, 1, [theHP], Game.characterDisplay);
};

ROT.customMegaCanvas.prototype.startCombatScreen = function () {
    this.startListening();
    let atkOptions = Game.player.getAttackOptionsTemp2();
    this._attackOptions = atkOptions;
    this._inCombatMenu = true;
    this.printOutCombatOptions(atkOptions, null);

};

ROT.customMegaCanvas.prototype.printOutCombatOptions = function (cmbtopts, selected) {
    let customList = [];
    cmbtopts.forEach(function(aString) {
        if (selected == aString)
        {
            customList.push("`"+aString+"~");
        }
        else
        {
            customList.push(aString+"~");
        }
    });

    this.newDraw(1, 1, customList, Game.characterDisplay);

};

ROT.customMegaCanvas.prototype.startListening = function () {
    this._listeningForInput = true
};

ROT.customMegaCanvas.prototype.stopListening = function () {
    this._listeningForInput = false;
};
/**
 * Clear the whole display (cover it with background color)
 */
ROT.customMegaCanvas.prototype.clear = function() {
    this._data = {};
    this._dirty = true;
};

ROT.customMegaCanvas.prototype.cleanScreen = function() {
    this.newDraw(1, 1, [""], this);
    this.updateHPDisplay();
    console.log("clean screen has been called");
};

ROT.customMegaCanvas.prototype._stopAllScreens = function () { // NOTE this is not finished yet.
    this._schedulingSpecific = false;
    this._schedulingWork = false;
    this._inMainStockPileScreen = false;
};

ROT.customMegaCanvas.prototype._printBaseOptions = function () {
    let baseOptions = Game._homeBase.getBaseOptions();
    let stringBox = [];
    Object.keys(baseOptions).forEach(function (key) {
        stringBox.push(key+":"+baseOptions[key]+"~");
    });
    Game.characterDisplay.newDraw(1, 1,stringBox ,this);
};

ROT.customMegaCanvas.prototype.getSellableItems = function () {
    let ring1 = new Game.goldRing();
    let ring2 = new Game.goldRing();
    let ring3 = new Game.goldRing();
    let ring4 = new Game.goldRing();
    let tempSellMap = {1:ring1, 2:ring2, 3:ring3, 4:ring4};
    return tempSellMap;
};

ROT.customMegaCanvas.prototype._printScheduleOptions = function () {
    let employeeOptions = Game._homeBase.getEmployees();
    let stringBox = [];
    Object.keys(employeeOptions).forEach(function (key) {
        stringBox.push(key+":"+employeeOptions[key]+"~");
    });
    Game.characterDisplay.newDraw(1, 1,stringBox ,this);
    console.log("We are now scheduling work!");
};

ROT.customMegaCanvas.prototype._printSpecificScheduleOptions = function () {
    let employeeHours = Game._homeBase.getEmployeeHours(this._selectedEmployee);
        this._workOptions = Game._homeBase.getEmployeeWorkOptions(this._selectedEmployee);
        let stringBox = [];
        stringBox.push(this._workOptions[this._selectedWorkOption] + "~~~");
        let theSelected = this._selectedHour;

        Object.keys(employeeHours).forEach(function (key) {
            if (key == theSelected) {
                stringBox.push("`" + key + ":" + employeeHours[key] + "~");
            }
            else {
                stringBox.push(key + ":" + employeeHours[key] + "~");
            }
        });
        Game.characterDisplay.newDraw(1, 1, stringBox, this);
    };

ROT.customMegaCanvas.prototype._printBuyMenu = function () {
    let purchaseOptions = this._selectedVisitor.getGoods();
    this._purchaseOptions = purchaseOptions;
    let stringBox = [];
    stringBox.push("Buy my stuff.~~~");
    let theSelected = this._selectedItem;
    let theMerch = this._selectedVisitor;
    Object.keys(purchaseOptions).forEach(function (key) {
        let pricey = theMerch.getPriceFor(purchaseOptions[key]).toString();
        let itemDesc = "A gold ring";//purchaseOptions[key]._description;
        if (key == theSelected) {
            stringBox.push("`" + key + ":" + itemDesc + pricey + "$" + "~");
        }
        else {
            stringBox.push(key + ":" + itemDesc + pricey + "$" + "~");
        }
    });
    Game.characterDisplay.newDraw(1, 1, stringBox, this);
};

ROT.customMegaCanvas.prototype._printSellMenu = function () {
    let purchaseOptions = this.getSellableItems();
    console.log("This is in sell menu");
    this._purchaseOptions = purchaseOptions;
    let stringBox = [];
    stringBox.push("Show me what you have.~~~");
    let theSelected = this._selectedItem;
    let theMerch = this._selectedVisitor;
    Object.keys(purchaseOptions).forEach(function (key) {
        let pricey = theMerch.getPriceFor(purchaseOptions[key]).toString();
        let itemDesc = "A gold ring";//purchaseOptions[key]._description;
        if (key == theSelected) {
            stringBox.push("`" + key + ":" + itemDesc + pricey + "$" + "~");
        }
        else {
            stringBox.push(key + ":" + itemDesc + pricey + "$" + "~");
        }
    });
    console.log("this is string box");
    console.log(stringBox);
    Game.characterDisplay.newDraw(1, 1, stringBox, this);
};

ROT.customMegaCanvas.prototype._printSpecificStockPile = function () {
    let pileItems = Game._homeBase.getPileItems(this._selectedPile);
    let stringBox = [];
    let theSelected = this._selectedItem;

    console.log(this._selectedItem);

    Object.keys(pileItems).forEach(function (key) {
        if (key == theSelected) {
            stringBox.push("`" + key + ":" + (pileItems[key]._tempDesc()) + "~");
        }
        else {
            console.log(pileItems[key]);
            stringBox.push(key + ":" + (pileItems[key]._tempDesc()) + "~");
        }
    });
    Game.characterDisplay.newDraw(1, 1, stringBox, this);
};

ROT.customMegaCanvas.prototype._printSpecificVisitorOptions = function () {
    let stringBox = this._selectedVisitor.getMainTalkOptions();
    console.log("This is string box");
    console.log(this._selectedVisitor);
    console.log(stringBox);
    Game.characterDisplay.newDraw(1, 1,[stringBox] ,this);
};

ROT.customMegaCanvas.prototype._printStockPiles = function () {
    let stockOptions = Game._homeBase.getStockPiles();
    let stringBox = [];
    Object.keys(stockOptions).forEach(function (key) {
        stringBox.push(key+":"+stockOptions[key]+"~");
    });
    Game.characterDisplay.newDraw(1, 1,stringBox ,this);
};

ROT.customMegaCanvas.prototype._printVisitors = function () {
    let peopleVisiting = Game._homeBase.getVisitorsWithKeys();
    let stringBox = [];
    Object.keys(peopleVisiting).forEach(function (key) {
        stringBox.push(key+":"+peopleVisiting[key]._tempDesc()+"~");
    });
    Game.characterDisplay.newDraw(1, 1,stringBox ,this);
};


ROT.customMegaCanvas.prototype.startSpecificPile = function (thePile) {
    if (thePile != null)
    {
        this._stopAllScreens();
        this._whichScreen = "specific stockpile";
        this._lookingAtSpecificPile = true;
        this._selectedPile = thePile;
        this._printSpecificStockPile();
        this._schedulingWork = false;
    }
};

ROT.customMegaCanvas.prototype.startSpecificVisitor = function (theMan) {
    console.log("THIS IS IN START SPECIFIC VISIOTR");
    if (theMan != null)
    {
        this._stopAllScreens();
        this._whichScreen = "specific visitor";
        this._lookingAtSpecificvisitor = true;
        this._selectedVisitor = theMan;
        this._printSpecificVisitorOptions();
        this._schedulingWork = false;
        this._lookingAtSpecificPile = false;
    }
};

ROT.customMegaCanvas.prototype.listenForAndPrintBaseInputs = function () { // NOTE I gotta make sure that only one guy is listening at a time. or else bad stuff might happen, like code being called twice.
    // NOTE here should probably be cose to reset all listening code.
    this._listeningForInput = true;
    this._inBase = true;
    this._printBaseOptions();
};

ROT.customMegaCanvas.prototype.startScheduling = function () { // NOTE we don't set other stuff to false and we may want to do that.
    this._stopAllScreens();
    this._whichScreen = "scheduling work";
    this._schedulingWork = true;
    this._printScheduleOptions();
};

ROT.customMegaCanvas.prototype.startSpecificScheduling = function (theEmployee) {
    if (theEmployee != null)
    {
        this._schedulingSpecific = true;
        this._whichScreen = "specific scheduling";
        this._selectedEmployee = theEmployee;
        this._printSpecificScheduleOptions();
    }
};

ROT.customMegaCanvas.prototype.startBuyMenu = function (theEmployee) {
    console.log("WE ARE STARTING THE BUY MENU");
    console.log(theEmployee);
    if (theEmployee != null)
    {
        this._schedulingSpecific = true;
        this._whichScreen = "Buy screen";
        this._selectedVisitor = theEmployee;
        this._printBuyMenu();
    }
};

ROT.customMegaCanvas.prototype.startSellMenu = function (theEmployee) {
    console.log("WE ARE STARTING THE SELL MENU");
    console.log(theEmployee);
    if (theEmployee != null)
    {
        this._schedulingSpecific = true;
        this._whichScreen = "Sell screen";
        this._selectedVisitor = theEmployee;
        this._printSellMenu();
    }
};

ROT.customMegaCanvas.prototype.startObservingMasterStockPiles = function () {
    this._whichScreen = "main stockpile";
    this._inMainStockPileScreen = true;
    this._printStockPiles();
};

ROT.customMegaCanvas.prototype.startVisitorScreen = function () {
    this._whichScreen = "main visitor";
    this._inMainVisitorScreen = true;
    this._printVisitors();
};

ROT.customMegaCanvas.prototype.startBaseScreen = function () {
    Game.characterDisplay._stopAllScreens();
    Game._logBasicMessage("You have arived safely back at base.");
    this.newDraw(1, 1, ["Your current home is in a large tunnel where many storm drains meet.~", " The female rat Areata tends to your worm farm.~", "A young clan rat named sticky stands watchful guard.~"], Game.display)
    Game.characterDisplay.listenForAndPrintBaseInputs();
    this._whichScreen = "default";
};

ROT.customMegaCanvas.prototype.handleEvent = function(e){
    console.log("We are in handle event"); //_whichScreen _inMainStockPileScreen _schedulingWork _lookingAtSpecificPile _schedulingSpecific
    if (this._listeningForInput == true)
    {
        let code = e.keyCode; // we are looking for 2 and 8 num pad 2 is 98 num pad 8 is 104 enter is 13

        if (this._inBase == true)
        {
            console.log("We are in a base");
            console.log(this._whichScreen);
            switch (this._whichScreen) {

                case "default": {Game._homeBase.baseOptionSelected(code); break;}

                case "main stockpile": {
                    if (code == 27) {
                        Game.characterDisplay.startBaseScreen();
                        this._printBaseOptions();
                    }
                    else
                    {
                        Game._homeBase._handleMainStockPileKey(code);
                    }
                    break;}

             //   case "scheduling work": {Game._homeBase.employeeToScheduleSelected(code);  break;}

                case "scheduling work": {
                    if (code == 27) {
                        Game.characterDisplay.startBaseScreen();
                        this._printBaseOptions();
                    }
                    else {
                        Game._homeBase.employeeToScheduleSelected(code);}
                    break;}

                case "specific scheduling": {this._handleSpecificEmployeeKey(code); break;}

                case "main visitor": {Game._homeBase._handleMainVisitorKey(code); break;}

                case "specific visitor": {Game._homeBase._handleSpecificVisitorKey(code);break;}

                case "Buy screen": {this._handleBuyKey(code); break;}

                case "Sell screen": {this._handleSellKey(code); break;}
            }
            //if (this._inMainStockPileScreen == true)
            //{
            //    Game._homeBase._handleMainStockPileKey(code);
            //}
            //else {
//
            //    if (this._schedulingWork == false) {
            //        Game._homeBase.baseOptionSelected(code);
            //    }
            //    else{
            //        if (this._lookingAtSpecificPile == true)
            //        {
            //            this._specificPileKeyPressed(code);
            //        }
            //        else {
            //            if (this._schedulingSpecific == false) {
            //                if (code == 27) {
            //                    Game.characterDisplay.startBaseScreen();
            //                    this._printBaseOptions();
            //                }
            //                else {
            //                    Game._homeBase.employeeToScheduleSelected(code);
            //                }
            //            }
            //            else {
            //                this._handleSpecificEmployeeKey(code);
            //            }
            //        }
            //    }
            //}
        }

    }
};

ROT.customMegaCanvas.prototype._specificPileKeyPressed = function (code) {// let pileItems = Game._homeBase.getPileItems(this._selectedPile);_selectedItem
    console.log("this is the code", code);
    let pileItems = Game._homeBase.getPileItems(this._selectedPile);
    let pileItemsCount = 0;
    console.log(pileItems);
    Object.keys(pileItems).forEach(function (key) {
        pileItemsCount ++;
    });
    //pileItems.forEach(function (item) {
    //    pileItemsCount ++;
    //});
    switch (code) {
        case 38: {
            if (this._selectedItem > 1) // up
            {
                this._selectedItem--;
            }
            else {
                this._selectedItem = pileItemsCount;
            }
            this._printSpecificStockPile();
            break;
        }
        case 40: {
            if (this._selectedItem < pileItemsCount) // down
            {
                this._selectedItem++;
            }
            else {
                this._selectedItem = 1;
            }
            this._printSpecificStockPile();
            break;
        }
        case 27: {
                console.log("escape pressed");
                //Game.characterDisplay.startScheduling();
                this.startObservingMasterStockPiles();
                break;
                // escape
        }
    }
};

ROT.customMegaCanvas.prototype._handleSellKey = function (code) {
    let aThing = this._selectedVisitor.getGoods();
    let topLength = 0;//aThing.size;
    Object.keys(aThing).forEach(function (key) {
        topLength ++;
    });
    switch (code)
    {
        case 38:
        {
            if (this._selectedItem > 1) // up
            {
                this._selectedItem --;
            }
            else
            {
                this._selectedItem = topLength;
            }
            this._printSellMenu();
            break;
        }

        case 40:
        {
            console.log("this is selected item and top length");
            console.log(this._selectedItem);
            console.log(topLength);
            if (this._selectedItem < topLength) // down
            {
                this._selectedItem ++;
            }
            else
            {
                this._selectedItem = 1;
            }
            this._printSellMenu();
            break;
        }

        case 13:
        {
            //this.purchaseGood();
            Game._homeBase.purchaseGood(this._selectedItem);
            // this._printSpecificScheduleOptions();
            break;
        }

        case 27:
        {
            console.log("This is case 27 in ");
            this._schedulingSpecific = true;
            this._whichScreen = "specific visitor";
            this._printSpecificVisitorOptions();
            break;
        }
    }
};

ROT.customMegaCanvas.prototype._handleBuyKey = function (code) {
    let aThing = this._selectedVisitor.getGoods();
    let topLength = 0;//aThing.size;
    Object.keys(aThing).forEach(function (key) {
        topLength ++;
    });
    switch (code)
    {
        case 38:
        {
            if (this._selectedItem > 1) // up
            {
                this._selectedItem --;
            }
            else
            {
                this._selectedItem = topLength;
            }
            this._printBuyMenu();
            break;
        }

        case 40:
        {
            console.log("this is selected item and top length");
            console.log(this._selectedItem);
            console.log(topLength);
            if (this._selectedItem < topLength) // down
            {
                this._selectedItem ++;
            }
            else
            {
                this._selectedItem = 1;
            }
            this._printBuyMenu();
          //  this._printSpecificScheduleOptions();
            break;
        }

        case 13:
        {
            //this.purchaseGood();
            Game._homeBase.purchaseGood(this._selectedItem);
           // this._printSpecificScheduleOptions();
            break;
        }

       case 27:
       {
           console.log("This is case 27 in ");
           this._schedulingSpecific = true;
           this._whichScreen = "specific visitor";
           this._printSpecificVisitorOptions();
           break;
          //Game.characterDisplay.startScheduling();
          //this._printScheduleOptions();
          //break;
       }
    }
};

ROT.customMegaCanvas.prototype._handleSpecificEmployeeKey = function (code) {
    switch (code)
    {
        case 32:
        {
            if (this._selectedWorkOption < (this._workOptions.length - 1))
            {
                this._selectedWorkOption ++;
            }
            else
            {
                this._selectedWorkOption = 0;
            }
            this._printSpecificScheduleOptions();
            break;
        }

        case 38:
        {
            if (this._selectedHour > 1) // up
            {
                this._selectedHour --;
            }
            else
            {
                this._selectedHour = 24;
            }
            this._printSpecificScheduleOptions();
            break;
        }

        case 40:
        {
            if (this._selectedHour < 24) // down
            {
                this._selectedHour ++;
            }
            else
            {
                this._selectedHour = 1;
            }
            this._printSpecificScheduleOptions();
            break;
        }

        case 13:
        {
            Game._homeBase.setHourForEmployee(this._selectedHour, this._selectedEmployee, this._workOptions[this._selectedWorkOption]);
            this._printSpecificScheduleOptions();
            break;
        }

        case 27:
        {
            console.log("escape pressed");
            Game.characterDisplay.startScheduling();
            this._printScheduleOptions();
            break;
            // escape
        }
    }
};

ROT.customMegaCanvas.prototype.combatOptionPressStuff = function (code) {
    if (this._inCombatMenu == true){
        if (this._highlightedCombatOption == null)
        {
            this._highlightedCombatOption = 0;
        }
        else
        {
            if (code == 98)
            {
                if (this._highlightedCombatOption >= (this._attackOptions.length - 1))
                {
                    this._highlightedCombatOption = 0;
                }
                else
                {
                    this._highlightedCombatOption ++;
                }
            }
            if (code == 104)
            {
                //console.log("This is highlighted combat options");
                //console.log(this._highlightedCombatOption);
                if (this._highlightedCombatOption <= 0)
                {
                    this._highlightedCombatOption = (this._attackOptions.length - 1);
                }
                else
                {
                    this._highlightedCombatOption --;
                }
            }
            if (code == 13)
            {
                //   console.log(this._attackOptions[this._highlightedCombatOption]);
                Game._finishAttackEnemy(Game.player.getTarget());
                this.stopListening();
            }
        }
        if (code == 13)
        {
            this.cleanScreen();
            this._highlightedCombatOption = 0;
        }
        else
        { // NOTE maybe I should do a little more abscration with this later.
            this.printOutCombatOptions(this._attackOptions, (this._attackOptions[this._highlightedCombatOption]));
        }
    };
}

/*
ROT.customMegaCanvas.prototype.becomeInventory = function () {
    this.startListening();
    this._amIMenu = true;
};

ROT.customMegaCanvas.prototype.startListen = function () {
    _listeningForInputs = true;
};

* /
/**
 * @see ROT.Display
 */

ROT.customMegaCanvas.prototype.setOptions = function(options) {
    for (var p in options) { this._options[p] = options[p]; }
    if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
        if (options.layout) {
            this._backend = new ROT.Display[options.layout.capitalize()](this._context);
        }

        var font = (this._options.fontStyle ? this._options.fontStyle + " " : "") + this._options.fontSize + "px " + this._options.fontFamily;
        this._context.font = font;
        this._backend.compute(this._options);
        this._context.font = font;
        this._context.textAlign = "right";
        this._context.textBaseline = "middle";
        this._dirty = true;
    }
    return this;
};

/**
 * Returns currently set options
 * @returns {object} Current options object
 */
ROT.customMegaCanvas.prototype.getOptions = function() {
    return this._options;
};

/**
 * Returns the DOM node of this display
 * @returns {node} DOM node
 */
ROT.customMegaCanvas.prototype.getContainer = function() {
    return this._context.canvas;
};

/**
 * Compute the maximum width/height to fit into a set of given constraints
 * @param {int} availWidth Maximum allowed pixel width
 * @param {int} availHeight Maximum allowed pixel height
 * @returns {int[2]} cellWidth,cellHeight
 */
ROT.customMegaCanvas.prototype.computeSize = function(availWidth, availHeight) {
    return this._backend.computeSize(availWidth, availHeight, this._options);
};

/**
 * Compute the maximum font size to fit into a set of given constraints
 * @param {int} availWidth Maximum allowed pixel width
 * @param {int} availHeight Maximum allowed pixel height
 * @returns {int} fontSize
 */
ROT.customMegaCanvas.prototype.computeFontSize = function(availWidth, availHeight) {
    return this._backend.computeFontSize(availWidth, availHeight, this._options);
};

/**
 * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
 * @param {Event} e event
 * @returns {int[2]} -1 for values outside of the canvas
 */
ROT.customMegaCanvas.prototype.eventToPosition = function(e) {
    if (e.touches) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
    } else {
        var x = e.clientX;
        var y = e.clientY;
    }

    var rect = this._context.canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;

    x *= this._context.canvas.width / this._context.canvas.clientWidth;
    y *= this._context.canvas.height / this._context.canvas.clientHeight;

    if (x < 0 || y < 0 || x >= this._context.canvas.width || y >= this._context.canvas.height) { return [-1, -1]; }

    return this._backend.eventToPosition(x, y);
};

/**
 * @param {int} x
 * @param {int} y
 * @param {string || string[]} ch One or more chars (will be overlapping themselves)
 * @param {string} [fg] foreground color
 * @param {string} [bg] background color
 */
ROT.customMegaCanvas.prototype.draw = function(x, y, ch, fg, bg) {
    if (!fg) { fg = this._options.fg; }
    if (!bg) { bg = this._options.bg; }
    this._data[x+","+y] = [x, y, ch, fg, bg];

    if (this._dirty === true) { return; } /* will already redraw everything */
    if (!this._dirty) { this._dirty = {}; } /* first! */
    this._dirty[x+","+y] = true;
};

/**
 * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
 * @param {int} x
 * @param {int} y
 * @returns {int} lines drawn
 */

ROT.customMegaCanvas.prototype.temporaryFunction = function () {
};

ROT.customMegaCanvas.prototype.newTempDraw = function (x, y, stringList) {
    console.log("New temp draw");
    console.log(this);
    console.log(this.prototype);
    //this.newDraw(x, y, stringList);
};

ROT.customMegaCanvas.prototype.newDraw = function (x, y, stringList, whosCalled) { // NOTE for some reason "this" in this function is undefined so I gotta pass it as a var. This is not good but is a temp fix.
    this.clear();
    var cx = x;
    var cy = y;
    let highLighting = false;
    stringList.forEach(function(aString) {
        highLighting = false;
        for (var i=0;i<aString.length;i++) {
            var c = aString.charAt(i);
            cx ++;
            if (c == "~")
            {
                cy ++;
                cx = x;
            }
            else
            {
                if (c == "`")
                {
                    highLighting = true
                }
                else
                {
                    if (highLighting == true)
                    {
                        whosCalled.draw(cx++, cy, c, "#FF0", "red")//Game.characterDisplay.draw(cx++, cy, c, "#FF0", "red");
                    }
                    else
                    {
   //                     console.log(whosCalled);
                        whosCalled.draw(cx++, cy, c, "#FF0")//Game.characterDisplay.draw(cx++, cy, c, "#FF0");
                    }
                }
            }
        }
    });

};

ROT.customMegaCanvas.prototype.customMegadrawText = function(x, y, text, maxWidth) {
    var fg = null;
    var bg = null;
    var cx = x;
    var cy = y;
    var lines = 1;
    var tempThing = [];
    tempThing.push("THIS IS A THING ~");
    tempThing.push("JUNK IS NOT FOR GOOD");

    //ROT.customMegaCanvas.prototype.newDraw(x, y, tempThing);

    if (!maxWidth) { maxWidth = this._options.width-x; }

    var tokens = ROT.Text.tokenize(text, maxWidth);
    var newTokens = [];
    console.log("These are tokens");
    console.log(tokens.type);
    console.log(newTokens);

    while (tokens.length) { /* interpret tokenized opcode stream */
        //var token = {type: 0, value: "Boom"};
        var token = tokens.shift();
        console.log("This is one token ");
        console.log(token); // NOTE {type: 0, value: "One"} is one token exampe. I can prob mess with this junk for what I need.
        console.log(token.value);
        switch (token.type) {
            case ROT.Text.TYPE_TEXT:
                var isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
                for (var i=0;i<token.value.length;i++) {
                    var cc = token.value.charCodeAt(i);
                    var c = token.value.charAt(i);
                    isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
                    isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
                    if (isPrevFullWidth && !isFullWidth && !isSpace) { cx++; } // add an extra position
                    if(isFullWidth && !isPrevSpace) { cx++; } // add an extra position
                    this.draw(cx++, cy, c, fg, bg);
                    isPrevSpace = isSpace;
                    isPrevFullWidth = isFullWidth;
                }
                break;

            case ROT.Text.TYPE_FG:
                fg = token.value || null;
                break;

            case ROT.Text.TYPE_BG:
                bg = token.value || null;
                break;

            case ROT.Text.TYPE_NEWLINE:
                cx = x;
                cy++;
                lines++;
                break;
        }
    }

    return lines;
};

ROT.customMegaCanvas.prototype.customMegaDrawText = function(x, y, text, maxWidth) {
    var fg = null;
    var bg = null;
    var cx = x;
    var cy = y;
    var lines = 1;
    if (!maxWidth) { maxWidth = this._options.width-x; }

    var tokens = ROT.Text.tokenize(text, maxWidth);

    while (tokens.length) { /* interpret tokenized opcode stream */
        var token = tokens.shift();
        switch (token.type) {
            case ROT.Text.TYPE_TEXT:
                var isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
                for (var i=0;i<token.value.length;i++) {
                    var cc = token.value.charCodeAt(i);
                    var c = token.value.charAt(i);
                    // Assign to `true` when the current char is full-width.
                    isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
                    // Current char is space, whatever full-width or half-width both are OK.
                    isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
                    // The previous char is full-width and
                    // current char is nether half-width nor a space.
                    if (isPrevFullWidth && !isFullWidth && !isSpace) { cx++; } // add an extra position
                    // The current char is full-width and
                    // the previous char is not a space.
                    if(isFullWidth && !isPrevSpace) { cx++; } // add an extra position
                    this.draw(cx++, cy, c, fg, bg);
                    isPrevSpace = isSpace;
                    isPrevFullWidth = isFullWidth;
                }
                break;

            case ROT.Text.TYPE_FG:
                fg = token.value || null;
                break;

            case ROT.Text.TYPE_BG:
                bg = token.value || null;
                break;

            case ROT.Text.TYPE_NEWLINE:
                cx = x;
                cy++;
                lines++;
                break;
        }
    }

    return lines;
};


/**
 * Timer tick: update dirty parts
 */
ROT.customMegaCanvas.prototype._tick = function() {
    requestAnimationFrame(this._tick);

    if (!this._dirty) { return; }

    if (this._dirty === true) { /* draw all */
        this._context.fillStyle = this._options.bg;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

        for (var id in this._data) { /* redraw cached data */
            this._draw(id, false);
        }

    } else { /* draw only dirty */
        for (var key in this._dirty) {
            this._draw(key, true);
        }
    }

    this._dirty = false;
};

/**
 * @param {string} key What to draw
 * @param {bool} clearBefore Is it necessary to clean before?
 */
ROT.customMegaCanvas.prototype._draw = function(key, clearBefore) {
    var data = this._data[key];
    if (data[4] != this._options.bg) { clearBefore = true; }

    this._backend.draw(data, clearBefore);
};
