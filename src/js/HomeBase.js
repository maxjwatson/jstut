Game.HomeBase = function () {
    this._freshWaterFlow = 5; // NOTE eventually we should get some actually some metric like gallons per hour or something.
    this._driedWorms = 160; // NOTE This is in ounces
    this._nails = 0;
    this._CNDWaste = new Game.CNDWaste();
    this._optionsWithKeys = {};
    this._visitorsWithKeys = {};
    this._employeesWithKeys = {};
    this._tempClanRats = 2; // NOTE this will be entirely replaced eventually
    this._foodInfoStringThing = [];
    this._CNDInfoStringThing = [];
    this._badNailPile = new Game.NailPile();
    this._wormGrowBoxes = this.generateInitialWormBoxes();
    this._visitors = [];
    this._selectedVisitor = null;
    this._valuablesStash = {};
    let manOne = new Game.Employee();
    manOne.setName("Lars");
    let manTwo = new Game.Employee();
    manTwo.setName("Frits");
    let manThree = new Game.Employee();
    manThree.setName("Fangs");
    this._employees = [manOne, manTwo, manThree];
    this._money = 100.50;
    //this._employees = [{name: "Fangs", jobSkill: 3, dailyJobs: {1:"reclaimCNDWaste", 2: "reclaimCNDWaste", 3: "reclaimCNDWaste", 4: "sleep", 5: "sleep", 6: "sleep", 7: "sleep", 8: "sleep", 9: "sleep", 10:"sleep", 11:"sleep", 12:"sleep", 13:"sleep", 14:"sleep", 15:"sleep", 16:"sleep", 17:"sleep", 18:"sleep", 19:"sleep", 20:"sleep", 21:"sleep", 22:"sleep", 23:"sleep", 24:"sleep"}}, {name: "Rigby", jobSkill: 1 , dailyJobs: {1:"reclaimCNDWaste", 2: "reclaimCNDWaste", 3: "reclaimCNDWaste", 4: "sleep", 5: "sleep"}}, {name: "Stanley", jobSkill: 4, dailyJobs: {1: "sleep", 2: "sleep", 3: "sleep", 4: "train", 5: "harvest"}}];
};
 // Temp goals. add worm farming, fatburgh farming, CND recovery, eating, and sleeping. Add employees
Game.HomeBase.prototype.getOptsNoKeys = function () {
    let noKeyOpts = [];
    noKeyOpts.push("end day");
    if (this._freshWaterFlow >= 1)
    {
        noKeyOpts.push("Drink fresh water");
    }
    if (this._driedWorms >= 1)
    {
        noKeyOpts.push("Eat food.");
    }
    noKeyOpts.push("Check stock piles");
    noKeyOpts.push("Set work schedule");
    if (this._visitors.length > 0)
    {
        let anyMerchants = true;
        this._visitors.forEach(function(visitor) {

            // NOTE we'll have code to check if it's a merchant here later
        });

        if (anyMerchants == true)
        {
            noKeyOpts.push("Talk to merchants");
        }
    }
    return noKeyOpts;
};

Game.HomeBase.prototype.generateInitialEmployees = function () {

};

Game.HomeBase.prototype.receiveMerchant = function (merch) {
    console.log("THIS IS IN RECIEVE MERCHANT");
    console.log(merch);
    this._visitors.push(merch);
};

Game.HomeBase.prototype.generateInitialWormBoxes = function () {
    let allBoxes = [];
    for (let i=0; i<10; i++) {
        let anotherBox = new Game.WormBox();
        allBoxes.push(anotherBox);
    }
    return allBoxes;
};

Game.HomeBase.prototype.setHourForEmployee = function (hour, employee, job) {
    this._employees.forEach(function (employedMan) {
        if (employedMan.getName() == employee)
        {
            //employedMan.dailyJobs[hour] = job;
            console.log("This is a man"+employedMan);
            console.log(employedMan.getName());
            employedMan.setJobHour(hour, job);
        }
    });
};

Game.HomeBase.prototype.getEmployeeHours = function (theEmployee) {
    let theGuy = null;
    this._employees.forEach(function (employedMan) {
      if (employedMan.getName() == theEmployee)
      {
          theGuy = employedMan;
      }
    });
    if (theGuy != null)
    {
        return theGuy.getDailyJobs();
    }
    else
    {

    }
};

Game.HomeBase.prototype.getStockPiles = function () {
    let aMap = {a: "Weapons", b:"Salvage", c:"food", d:"water", e:"farms"};
    return aMap;
};

Game.HomeBase.prototype.getVisitorsWithKeys = function () {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let visitorsWithoutKeys = this._visitors; // NOTE maybe replace with GET function
    let visitorsWithKeys = {};
    let i = 0;
    let visitorNumber = visitorsWithoutKeys.length;
    alphabet.forEach(function (letter) {
        if (i < visitorNumber){
            visitorsWithKeys[letter] = visitorsWithoutKeys[i];
            i ++;
        }
    });
    this._visitorsWithKeys = visitorsWithKeys;
    return visitorsWithKeys;
};

Game.HomeBase.prototype.getEmployeeWorkOptions = function (theEmployee) {
    // NOTE this is all temporary;
    return ["sleep","eat","harvest","denail",  "sort nails", "straighten nails", "tend to worms"]; //"shave 2X4","shave support", "shave stud"
};

//Game.HomeBase.prototype.getEmployeesNoKeys = function () {
//    let noKeyOpts = [];
//    noKeyOpts.push("end day");
//    if (this._freshWaterFlow >= 1)
//    {
//        noKeyOpts.push("Drink fresh water");
//    }
//    if (this._driedWorms >= 1)
//    {
//        noKeyOpts.push("Eat food.");
//    }
//    noKeyOpts.push("Set work schedule");
//    return noKeyOpts;
//};


Game.HomeBase.prototype._getWorkersForHour = function (theHour, theJob) {
    let workersList = [];
    this._employees.forEach(function (employedMan) {
        let hoursForMan = employedMan.getDailyJobs();
        if (hoursForMan[theHour] == theJob) // NOTE I don't know if dailyJobs[5] gets the item under the key 5 or the fifth thing in the list. For now it doesn't matter because they are the same, but this may have to be looked at later.
        {
            workersList.push(employedMan);
        }
    });
    return workersList;
};

Game.HomeBase.prototype.getBaseDescription = function () {

};

Game.HomeBase.prototype.GetFoodInfo = function () {
    return this._foodInfoStringThing;
};

Game.HomeBase.prototype.addToCNDWaste = function (newCNDWaste) {
    this._CNDWaste.addToCNDWaste(newCNDWaste);
};

Game.HomeBase.prototype._feedEmployees = function () {
    let foodNeed = this._getFoodUpkeepTotal(); // NOTE this will be changed eventually to feed everyone individually;
    let totalFood = this._getTotalFood();
    if (foodNeed <= totalFood)
    {
        this._driedWorms -= foodNeed;
        this._foodInfoStringThing.push("Every eats their fill.");
    }
    else
    {
        this._foodInfoStringThing.push("You don't have enough food to feed everyone.");
    }
};

Game.HomeBase.prototype.payUpkeep = function () {
    this._foodInfoStringThing = [];
    this._feedEmployees();
    if (this._driedWorms > 100)
    {
        this._foodInfoStringThing.push("~You have plenty of dried worms left.");
    }
    else
    {
        this._foodInfoStringThing.push("~You are running low on food.");
    }
};

Game.HomeBase.prototype._getTotalFood = function () {
    return this._driedWorms;
};

Game.HomeBase.prototype.addWorm = function (theWorm) {
    this._driedWorms += 10;
};

Game.HomeBase.prototype._getFoodUpkeepTotal = function () {
    return (this._tempClanRats * 16);
};

Game.HomeBase.prototype._reclaimCNDWaste = function (whichHour) { // NOTE this should be for one hour. Also NOTE CND waste means construction and demolition waste.
    let everyWorker = this._getWorkersForHour(whichHour, "reclaimCNDWaste");
    let mySelf = this;
    everyWorker.forEach(function (worker) {
        mySelf._nails += worker.jobSkill;
    });
   // console.log("This is every worker.", everyWorker);

};

Game.HomeBase.prototype._denail = function (whichHour) { // NOTE this should be for one hour. Also NOTE CND waste means construction and demolition waste.
    let everyWorker = this._getWorkersForHour(whichHour, "denail");
    let mySelf = this;
 //   console.log(this._CNDWaste);
    let woodWithNails = this._CNDWaste.getWoodWithNails();
    let totalNailsHarvested = 0;
   // console.log("This is denail");
   // console.log(everyWorker);
    let javaSillyNailPile = this._badNailPile;
    everyWorker.forEach(function (worker) {
        let denailPower = worker.getDenailWorkPoints();
       // console.log("this is denail power");
       // console.log(worker);
       // console.log(denailPower);
        woodWithNails.forEach(function (woodenThing) {
           // console.log("This is a new board");
           // console.log(woodenThing);
            if (denailPower > 0)
            {
              //  console.log("this is some guy removing nails");
              //  console.log(denailPower);
                let newBadNails = woodenThing.removeNails(denailPower);
               // console.log(newBadNails);
                javaSillyNailPile.addUnsortedNail(newBadNails);
                totalNailsHarvested += newBadNails.length;
            }
        })
    });
    console.log("This is our nail pile");
    console.log(this._badNailPile);
    this._CNDInfoStringThing["nails"] = ("Your Workers have harvested"+totalNailsHarvested+"From scraps of wood");
};

Game.HomeBase.prototype._sortNails = function (whichHour) { // NOTE For now this will automatically identify all traits of a nail, in the future I might want to break it up so you could sort it more simply and faster.
    let everyWorker = this._getWorkersForHour(whichHour, "sort nails");
    let mySelf = this;
    let totalNailsSorted = 0;
    let javaSillyNailPile = this._badNailPile;
    everyWorker.forEach(function (worker) {
        let thePower = worker.getSortNailPower();
        totalNailsSorted += javaSillyNailPile.sortNails(thePower);
    });
    this._CNDInfoStringThing["nails sort"] = ("your workers have sorted"+totalNailsSorted+" nails which are now neatly sorted");
};

Game.HomeBase.prototype._unbendNails = function (whichHour) {
    let everyWorker = this._getWorkersForHour(whichHour, "straighten nails");
    let mySelf = this;
    let totalNailsSorted = 0;
    let javaSillyNailPile = this._badNailPile;
    everyWorker.forEach(function (worker) {
        let thePower = worker.getNailStraighteningPower();
        let theQuality = worker.getNailStraighteningQuality();
        totalNailsSorted += javaSillyNailPile.straightenNails(thePower, theQuality);
    });
};

Game.HomeBase.prototype._tendToWorms = function (whichHour) { // OK basically a tender goes to each box, checks its progress, fills it with water (sometimes), and eventually harvets the worms.
    let everyWorker = this._getWorkersForHour(whichHour, "tend to worms");
    let mySelf = this;
    let javaSillyWormBoxes = this._wormGrowBoxes;
    everyWorker.forEach(function (worker) {
        let thePower = worker.getWormTendPower();
        javaSillyWormBoxes.forEach(function (theBox) {
            if (theBox.readyToHarvest() == true){

            }
            else{
                theBox.beTendedTo(worker);
            }
        });
    });
};

Game.HomeBase.prototype._stepThroughOneHour = function (whichHour) {
    this._reclaimCNDWaste(whichHour);
    this._denail(whichHour);
    this._sortNails(whichHour);
    this._unbendNails(whichHour); // unbend nails is untested
    this._tendToWorms(whichHour);
   // this._shave2x4();
   // this._shaveSupport();
   // this._shaveStud();
};

Game.HomeBase.prototype.wormBoxesAge = function (whichHour) {
    let javaSillyWormBoxes = this._wormGrowBoxes;
    javaSillyWormBoxes.forEach(function (theBox) {
      theBox._progressOneDay();
    })


};

Game.HomeBase.prototype.progressOneDay = function () { // NOTE eventually I might send events along aswell, but I don't know if that's how I wanna do it.
    for (let i = 1; i < 25; i ++)
    {
        this._stepThroughOneHour(i);
    }
    this.wormBoxesAge();
    this.payUpkeep();
    Game._logBasicMessage(this._CNDInfoStringThing["nails"]);
    //this._foodInfoStringThing;
};


Game.HomeBase.prototype.getBaseOptions = function () {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let optionsWithoutKeys = this.getOptsNoKeys();
    let optionsWithKeys = {};
    let i = 0;
    let optionsNumber = optionsWithoutKeys.length;
    alphabet.forEach(function (letter) {
        if (i < optionsNumber){
            optionsWithKeys[letter] = optionsWithoutKeys[i];
            i ++;
        }
    });
    console.log(optionsWithKeys);
    this._optionsWithKeys = optionsWithKeys;
    return optionsWithKeys;
//    return {a: "Eat yummy worms", b: "drink fresh water"};
};

Game.HomeBase.prototype.getEmployees = function () { // NOTE there is boilder plate here so I should change this.
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let optionsWithoutKeys = this._employees;
    let optionsWithKeys = {};
    let i = 0;
    let optionsNumber = optionsWithoutKeys.length;
    alphabet.forEach(function (letter) {
        if (i < optionsNumber){
            optionsWithKeys[letter] = optionsWithoutKeys[i].getName();
            i ++;
        }
    });
    console.log(optionsWithKeys);
    this._employeesWithKeys = optionsWithKeys;
    return optionsWithKeys;
//    return {a: "Eat yummy worms", b: "drink fresh water"};
};

Game.HomeBase.prototype.setOptionsWithKeys = function (keyOpts) {
    this._optionsWithKeys = keyOpts;
};

Game.HomeBase.prototype.baseOptionSelected = function (theCode) {
    console.log("BASE OPTION SELECTED", theCode);
    let theLetter = null;
    switch (theCode)
    {
        case 65:
            theLetter = "a";
            break;
        case 66:
            theLetter = "b";
            break;
        case 67:
            theLetter = "c";
            break;
        case 68:
            theLetter = "d";
            break;
        case 69:
            theLetter = "e";
            break;
        case 70:
            theLetter = "f";
            break;
        case 71:
            theLetter = "g";
            break;
            // NOTE add more later
    }

    console.log(this._optionsWithKeys);
    console.log(theLetter);
    this.executeOption(this._optionsWithKeys[theLetter]);

    //let theSelectedOption =
};

Game.HomeBase.prototype.employeeToScheduleSelected = function (theCode) { // NOTE there is boiler plate here I should fix that.
    console.log("employeeToScheduleSelected", theCode);
    let theLetter = null;
    switch (theCode)
    {
        case 65:
            theLetter = "a";
            break;
        case 66:
            theLetter = "b";
            break;
        case 67:
            theLetter = "c";
            break;
        case 68:
            theLetter = "d";
            break;
        case 69:
            theLetter = "e";
            break; // NOTE add more later
    }

    console.log(this._employeesWithKeys);
    console.log(theLetter);
    this.scheduleEmployeeSelected(this._employeesWithKeys[theLetter]);

    //let theSelectedOption =
};

Game.HomeBase.prototype._handleMainStockPileKey = function (theCode) {
    console.log("_handleMainStockPileSelected", theCode);
    let theLetter = null;
    switch (theCode)
    {
        case 65:
            theLetter = "a";
            break;
        case 66:
            theLetter = "b";
            break;
        case 67:
            theLetter = "c";
            break;
        case 68:
            theLetter = "d";
            break;
        case 69:
            theLetter = "e";
            break; // NOTE add more later
    }

    console.log(theLetter);
    let thePiles = this.getStockPiles();
    Game._homeBase.selectedStockPile(thePiles[theLetter]);

};
Game.HomeBase.prototype._handleMainVisitorKey = function (code) {
    console.log("_handleMainStockPileKey", code);
    let theLetter = null;
    switch (code)
    {
        case 65:
            theLetter = "a";
            break;
        case 66:
            theLetter = "b";
            break;
        case 67:
            theLetter = "c";
            break;
        case 68:
            theLetter = "d";
            break;
        case 69:
            theLetter = "e";
            break; // NOTE add more later
    }

    let thePiles = this.getStockPiles();
    console.log("This is visitors with keys");
    console.log(this._visitorsWithKeys);
    Game._homeBase.selectedVisitor(this._visitorsWithKeys[theLetter]);
};

Game.HomeBase.prototype._handleSpecificVisitorKey = function (code) { // NOTE this is not complete yet.
    console.log("_handleSpecificVisitorKey", code);
    let theLetter = null;
    switch (code)
    {
        case 65:
            theLetter = "a";
            break;
        case 66:
            theLetter = "b";
            break;
        case 67:
            theLetter = "c";
            break;
        case 68:
            theLetter = "d";
            break;
        case 69:
            theLetter = "e";
            break; // NOTE add more later
    }
    let actionToDo = this._selectedVisitor.actionForKey(theLetter);
    console.log("Right before action to do");
    console.log(actionToDo);
    switch (actionToDo)
    {
        case "Buy":
            Game.characterDisplay.startBuyMenu(this._selectedVisitor);
            break;
        case "Sell":
            Game.characterDisplay.startSellMenu(this._selectedVisitor);
            break;
    }
};

Game.HomeBase.prototype.selectedStockPile = function (thePile) {
    Game.characterDisplay.startSpecificPile(thePile);
};

Game.HomeBase.prototype.selectedVisitor = function (theMan) {
    this._selectedVisitor = theMan;
    Game.characterDisplay.startSpecificVisitor(theMan);
};

Game.HomeBase.prototype.scheduleEmployeeSelected = function (theMan) {
    Game.characterDisplay.startSpecificScheduling(theMan);
};

Game.HomeBase.prototype.purchaseGood = function (itemIndex) {
    let theGoods = this._selectedVisitor.getGoods();
    let specificItem = theGoods[itemIndex];
    let theCost = this._selectedVisitor.getPriceFor(specificItem);
    this._money -= theCost;
    this._selectedVisitor.looseItem(itemIndex);
    this.addItemToProperStockPile(specificItem);
};

Game.HomeBase.prototype.addItemToProperStockPile = function (theItem) { // NOTE eventually this will find which stock pile the thing belongs to.
    let myMap = this._valuablesStash;
    let newKey = 1;//aThing.size;
    Object.keys(myMap).forEach(function (key) {
        newKey ++;
    });
    this._valuablesStash[newKey] = theItem; // NOTE this will override items so this should be changed imediately.
};

Game.HomeBase.prototype.getPileItems = function (whichPile) {// NOTE this is temp
    let itemsList = {};
    let item1 = new Game.WoodBoard();
    let item2 = new Game.WoodBoard();
    let item3 = new Game.WoodBoard();
    let item4 = new Game.WoodBoard();
    let item5 = new Game.WoodBoard();
    //let itemsList = {1: item1, 2: item2, 3:item3, 4:item4, 5:item5};
    switch (whichPile) {
        case "water":
            let theWater = new Game.WaterFlow();
            theWater.setWaterFlow(this._freshWaterFlow);
            itemsList[1] = theWater;
            break;


        case "Salvage":
            itemsList[1] = this._badNailPile;
            break;

        case "farms":
            for (var i=0; i<this._wormGrowBoxes.length; i++) {
                itemsList[i] = this._wormGrowBoxes[i];
            }
            //itemsList[1] = ; This should be all the worm boxees.
            break;

        default:{
            itemsList[1] = item1;
            itemsList[2] = item2;
            itemsList[3] = item3;
            itemsList[4] = item4;
            itemsList[5] = item5;
            break;}
    }
   // if (whichPile == "water")
   // {
   //     //itemsList.push({key:1, value:("There are "+this._freshWaterFlow+" gallons of fresh water flowing through each day.")})
   //     let theWater = new Game.WaterFlow();
   //     theWater.setWaterFlow(this._freshWaterFlow);
   //     itemsList[1] = theWater;
   // }
   // else
   // {
   //     itemsList[1] = item1;
   //     itemsList[2] = item2;
   //     itemsList[3] = item3;
   //     itemsList[4] = item4;
   //     itemsList[5] = item5;
   // }

    return itemsList;
};

Game.HomeBase.prototype.displayStockPile = function (thePile) {

};

Game.HomeBase.prototype.executeOption = function(theChoice)
{
    console.log("Execute options "+theChoice);
    if (theChoice == "end day")
    {
        Game._worldTracker.endDay(); // NOTE maybe this should be a function in game later so everything goes through one point.
    }
    if (theChoice == "Set work schedule")
    {
        Game.characterDisplay.startScheduling();
    }
    if (theChoice == "Check stock piles")
    {
        Game.characterDisplay.startObservingMasterStockPiles();
    }

    if (theChoice == "Talk to merchants")
    {
        Game.characterDisplay.startVisitorScreen();
    }
};