Game.combatCalculator = function(){

};


Game.combatCalculator.prototype.attackTarget = function (megaList) { // NOTE this is basically a jab. Something quick and non committal.
    let tempTimeClicker = 0; // NOTE  This should eventually be controlled by the game but I don't want to set the time system up yet.
    let attackingPlayer = megaList.attackingPlayer;
    let subject = megaList.subject;
    let fPoint = attackingPlayer.getFPointLocation(); // NOTE fpoint means focus point as in where are the potential harm is focused. Also note This will probably always be zero, because all that's important is the meat point distance.
    let mPointDist = subject.getMeatPointDistance();  //NOTE mpoint stands for meat point dist means distance. Also the Fpoint location is probably going to be just outside the enemy's guard.
    let mPointSpeed = subject.getMeatPointSpeed();
    let mPointAcceleration = subject.getMeatPointAcceleration();
    let mPointMaxSpeed = subject.getMeatPointMaxSpeed();
    let mPointMaxDist = (subject.getMeatPointMaxDistance + mPointDist);
    let fPointMaxDist = attackingPlayer.getFPointMaxDistance();
    let fPointSpeed = attackingPlayer.getFPointSpeed();
    let fPointAcceleration = attackingPlayer.getFPointAcceleration(); // NOTE for a spear this is going to be effectively null. We're just starting off with a simple jab and that goes basically full speed very quickly.
    let fPointMaxSpeed = attackingPlayer.getFPointMaxSpeed();
    let targetReactionTime = subject.getTempReactionTime();
    let targetHit = false;
    let i = 0;
    let hit = false;
    // NOTE we'll get into deceleration later. Also note we should maybe have all this stuff we're getting from the player just be sent as part of megaList. That way if something changes it won't be catastrophic.
    console.log("THis is right here in combat calc");
    console.log(targetReactionTime);
    while (i == 0)
    {
        tempTimeClicker += 0.01;
        targetReactionTime -= 1;
        fPoint += fPointSpeed;
        fPoint += fPointAcceleration;
        if (fPointSpeed > fPointMaxSpeed)
        {
            fPointSpeed = fPointMaxSpeed;
        }
        if (targetReactionTime <= 0)
        {
            mPointDist += mPointSpeed;
            mPointSpeed += mPointAcceleration;
        }
        if (mPointSpeed > mPointMaxSpeed)
        {
            mPointSpeed = mPointMaxSpeed;
        }
        if (mPointDist > mPointMaxDist)
        {
            mPointDist = mPointMaxDist
        }
        if (fPoint > fPointMaxDist)
        {
            fPoint = fPointMaxDist;
            i = 1;
            console.log("Dodged");
            hit = false;
        }

        if (fPoint > mPointDist){
            i = 1;
            targetHit = true;
            console.log("Hit");
            hit =  true;
        }
   //     console.log("Spear distance");
   //     console.log(fPoint);
        // console.log(mPointDist);
    }
    return hit;
};