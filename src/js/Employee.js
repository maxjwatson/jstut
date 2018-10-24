Game.Employee = function () {
    this._statsMap = {strength: 50, stamina: 100, agility: 100};
    this._skillMap = {CNDHarvesting:{temp: 10}, fatbergHarvesting:{temp: 10}, wormFarming:{temp: 10}};
    this._name = "Default man";
    this._workHoursSchedule = this._defaultHours();
};

Game.Employee.prototype._defaultHours = function () {
    return {1:"reclaimCNDWaste", 2: "reclaimCNDWaste", 3: "reclaimCNDWaste", 4: "sleep", 5: "sleep", 6: "sleep", 7: "sleep", 8: "sleep", 9: "sleep", 10:"sleep", 11:"sleep", 12:"sleep", 13:"sleep", 14:"sleep", 15:"sleep", 16:"sleep", 17:"sleep", 18:"sleep", 19:"sleep", 20:"sleep", 21:"sleep", 22:"sleep", 23:"sleep", 24:"sleep"};
};

Game.Employee.prototype.getDenailWorkPoints = function () {
    let preModdedSkill = this.getCNDHarvestSkill();
    return (this.getCNDHarvestSkill() * 0.5);
};

Game.Employee.prototype.getSortNailPower = function () {
    let preModdedSkill = this.getCNDHarvestSkill(); // NOTE this skill is temp and will be replaced by a different sorting skill
    return preModdedSkill;
};

Game.Employee.prototype.getNailStraighteningPower = function () { // NOTE this will include tools later same with the quality
    let preModdedSkill = this.getCNDHarvestSkill();
    return preModdedSkill;
};

Game.Employee.prototype.getWormTendPower = function () {
    let preModdedSkill = this.getCNDHarvestSkill(); // NOTE this skill is temp and will be replaced by a different sorting skill
    return preModdedSkill;
};

Game.Employee.prototype.getNailStraighteningQuality = function () {
    return 6;
};

Game.Employee.prototype.setName = function (theName) {
    this._name = theName;
};

Game.Employee.prototype.setJobHour = function (hour, job) {
    this._workHoursSchedule[hour] = job;
};

Game.Employee.prototype.getDailyJobs = function () {
    return this._workHoursSchedule;
};

Game.Employee.prototype.getName = function () {
    return this._name;
};

Game.Employee.prototype.getStrength = function () {
  return this._statsMap.strength;
};

Game.Employee.prototype.getAgility = function () {
  return this._statsMap.agility;
};

Game.Employee.prototype.getStamina = function () {
    return this._statsMap.stamina;
};

// NOTE these skill numbers vary widely so I should even them out eventually.

Game.Employee.prototype.getCNDHarvestSkill = function () {
    let strength = this.getStrength();
    let agility = this.getAgility();
    let stamina = this.getStamina();
    //let CNDRelStats = ((this.getStrength() * 1.5) + (this.getAgility * 0.5) + (this.getStamina * 1.5));
    let CNDRelStats = ((strength * 1.5) + (agility * 0.5) + (stamina * 1.5));
    let CNDSkill = this._skillMap.CNDHarvesting.temp;
    return(CNDRelStats + CNDSkill * 3.5);
   // return (CNDRelStats + (this._skillMap.CNDHarvesting.temp * 3.5));
};

Game.Employee.prototype.getFatbergHarvestSkill = function () {
    let effectiveStrength = 0;
    if (this.getStrength() > 30)
    {
        effectiveStrength = (((this.getStrength() - 30) * 0.2) + 30)
    }
    else
    {
        effectiveStrength = this.getStrength();
    }
    let fatRelStats = (effectiveStrength + this.getStamina() + (this.getAgility() * 0.2));
    return (fatRelStats + (this._skillMap.fatbergHarvesting.temp * 2));

};

Game.Employee.prototype.getWormTendSkill = function () { // Skill to ability is 2 to 1
    let wormRelStats = ((this.getStamina() * 2) + this.getAgility());
    return (wormRelStats + (this._skillMap.wormFarming.temp * 6));
};

Game.secondExit.prototype._draw = function (theX, theY) {
    Game.display.draw(theX, theY, "H", "Orange");
};