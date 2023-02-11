let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["String"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


const weapons = [
    {
        name: "Stick",
        power: 5
    },

    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }

];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },

    {
        name: "fanged beast",
        level: 8,
        health: 60
    },

    {
        name: "dragon",
        level: 20,
        health: 300
    }


];

const locations = [
    {
        name: "Town Square",
        "buttton text": ["Go to store", " Go to cave", "FightDragon"],
        "buttton functions": [goStore, goCave, fightingDragon],
        "text": "You are in a Town square . You see a sign that says \"Store \"."
    }
    ,
    {
        name: "Store",
        "buttton text": ["Buy 10 health (10 Gold)", " Buy weapon (30 Gold)", "Go To Town Square"],
        "buttton functions": [buyHealth, buyWeapon, goTown],
        "text": "Welcome to Store"
    },

    {
        name: "cave",
        "buttton text": ["Fight Slime", "Fight Fanged Beast", "Go To Town Square"],
        "buttton functions": [fightSlime, fightBeast, goTown],
        "text": "You enter the cave. You some monsters"
    },
    {
        name: "fight",
        "buttton text": ["Attack", "Dodge", "Run"],
        "buttton functions": [attack, dodge, goTown],
        "text": "You are fighting a monster"
    },
    {
        name: "kill monster",
        "buttton text": ["Go To Town Square", "Go To Town Square", "Go To Town Square"],
        "buttton functions": [goTown, goTown, goTown],
        "text": 'The Monster Screams "Arg!" as it dies . You gain experience points and find gold'
    },

    {
        name: "lose",
        "buttton text": ["Replay?", "Replay?", "Replay?"],
        "buttton functions": [restart, restart, restart],
        "text": 'You Die'
    } ,
    {
        name: "win",
        "buttton text": ["Replay?", "Replay?", "Replay?"],
        "buttton functions": [restart, restart, restart],
        "text": 'You defeat the Dragon . YOU WIN THE GAME '
    }


];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightingDragon;


function update(location) {

    monsterStats.style.display = "none";
    button1.innerText = location["buttton text"][0];
    button2.innerText = location["buttton text"][1];
    button3.innerText = location["buttton text"][2];
    button1.onclick = location["buttton functions"][0];
    button2.onclick = location["buttton functions"][1];
    button3.onclick = location["buttton functions"][2];
    text.innerText = location.text;
}


function goStore() {

    update(locations[1]);

}
function goTown() {

    update(locations[0]);
}


function goCave() {

    update(locations[2]);

}

function buyHealth() {

    if (gold >= 10) {
        gold = gold - 10;
        health = health + 10;
        healthText.innerHTML = health;
        goldText.innerHTML = gold;
    }
    else {
        text.innerHTML = "You don't have enough gold to buy health";
    }
}

function buyWeapon() {

    if (currentWeapon < weapons.length - 1) {

        if (gold >= 30) {
            gold = gold - 30;
            currentWeapon++;
            goldText.innerHTML = gold;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerHTML = "You Now Have A " + newWeapon + ". In your Inventory you have " + inventory;
        }

        else {
            text.innerHTML = "You Don't Have enough gold to buy weapons";
        }

    }
    else {
        text.innerHTML = "You Already Have The Most Powerfull Weapon";
        button2.innerHTML = "Sell Weapon For 15 Golds";
        button2.onclick = sellWeapon;

    }
}


function sellWeapon() {
    if (inventory.length > 1) {
        gold = gold + 15;
        goldText.innerHTML = gold;
        let currentWeapon = inventory.shift();
        text.innerHTML = "You sold a " + currentWeapon + ". And In your inventory you have " + inventory;
    }
    else {
        text.innerHTML = "Don't Sell Your Only Weapon ";
    }


}

function fightSlime() {
    fighting = 0;
    goFight();

}
function fightBeast() {
    fighting = 1;
    goFight();
}

function fightingDragon() {
    fighting = 2;
    goFight();

}
function goFight() {
    update(locations[3]);
    monsterStats.style.display = "Block";
    monsterHealth = monsters[fighting].health;
    monsterNameText.innerHTML = monsters[fighting].name;
    monsterHealthText.innerHTML = monsterHealth;
}


function attack() {
    text.innerHTML = "The " + monsters[fighting].name + " attacks."
    text.innerHTML = "You attacked it with your " + weapons[currentWeapon].name + ".";
    if(isMonsterHit){
        health = health - getMonsterAttackValue(monsters[fighting].level);
    
    }
    else{
        text.innerHTML = "You Miss ";
    }
    
    monsterHealth = monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerHTML = health;
    monsterHealthText.innerHTML = monsterHealth;
    if (health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if(Math.random() <= .1 && inventory.length!==1){
        text.innerHTML += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit(){
    return Math.random > .2 || health < 20;

}

function dodge() {
    text.innerHTML = "You Dodge the monster " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold = gold + Math.floor(monsters[fighting].level * 6.7);
    xp = xp + monsters[fighting].level;
    goldText.innerHTML = gold;
    xpText.innerHTML = xp;
    update(locations[4]);



}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["String"];
    goldText.innerHTML = gold;
    healthText.innerHTML = health;
    xpText.innerHTML = xp;
    goTown();

}
