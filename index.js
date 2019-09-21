// const plotly = require('plotly');

let avgtemp = 70;
let tempModifiers = {
    freezing: 20,
    chilly: 30,
    cool: 40,
    mild: 50,
    temperate: 60,
    warm: 70,
    hot: 80,
    scorching: 90,
}

let planetavgtemp = 60;
let planetsize = 225;
let planet = [];
let arcticlength = 30;

const contNames = [
    "The Land of ", "The Continent of ", "The Lands of ", "The Land of ", "The Continent of ", "The Lands of ", "The Land of "
]

const bareContNames = [
    "Istlus", "Afangëm", "Elluem", "Leïeluth", "Aragok", "Willowile", "Ghëlaräk"
]

const mountainNames = [
    "Duarfenheil", "Illaeïgich", "Deliyä", "Makengheil", "Malehiëen", "Swevük", "Erud Gorgoröth", "Ephël Lithui", "Taniquetil", "Erebor", "Orodruin", "Celebdhil", "Gilgakelsh", "Eril Minad", "Manis Moria", "Banderkräll", "Il-a ür","Meliämür", "Rivelthrien", "Ythërn", "Qfaäth"
]

const createPlanetArr = () => {
    for (let i = 0; i < planetsize; i++) {
        planet.push([]);
        for (let j = 0; j < planetsize; j++) {
            planet[i].push({"terrain": "ocean"});
            planet[i][j].name = "The mysterious waters of Imperia";
        }
    }
}

const createArctic = () => {
    for (let i = 0; i < arcticlength; i++) {
        for (let j = 0; j < planet[i].length; j++) {
            // console.log(Math.floor(Math.random() * (i + 1)));
            if (Math.floor(Math.random() * ((i + 1) / 3)) === 0) {
                planet[j][i].terrain = "tundra";
                planet[224 - j][224 - i].terrain = "tundra";
                // console.log(board[i][j].terrain);
            }
        }
    }
}

const checkBay = (i, j) => {
    let baycheck = 0;
    if (i === 0 || i === 224 || j === 0 || j === 224) {
        return false;
    }
    if (planet[i][j - 1].terrain === "land") {
        baycheck++;
    }
    if (planet[i][j + 1].terrain === "land") {
        baycheck++;
    }
    if (planet[i + 1][j].terrain === "land") {
        baycheck++;
    }
    if (planet[i - 1][j].terrain === "land") {
        baycheck++;
    }
    if (baycheck >= 2)
        console.log(baycheck + "|" + i + "|" + j);
    if (baycheck >= 3) {
        return true;
    } else {
        return false;
    }
}

const checkIsland = (i, j) => {
    let baycheck = 0;
    if (i === 0 || i === 224 || j === 0 || j === 224) {
        return false;
    }
    if (planet[i][j - 1].terrain === "land") {
        baycheck++;
    }
    if (planet[i][j + 1].terrain === "land") {
        baycheck++;
    }
    if (planet[i + 1][j].terrain === "land") {
        baycheck++;
    }
    if (planet[i - 1][j].terrain === "land") {
        baycheck++;
    }
    if (baycheck === 0) {
        return true;
    } else {
        return false;
    }
}

const checkLake = (i, j) => {
    let baycheck = 0;
    if (i === 0 || i === 224 || j === 0 || j === 224) {
        return false;
    }
    if (planet[i][j - 1].terrain === "land") {
        baycheck++;
    }
    if (planet[i][j + 1].terrain === "land") {
        baycheck++;
    }
    if (planet[i + 1][j].terrain === "land") {
        baycheck++;
    }
    if (planet[i - 1][j].terrain === "land") {
        baycheck++;
    }
    if (baycheck === 4) {
        return true;
    } else {
        return false;
    }
}

// const createContinents = () => {
//     let contSize = Math.floor(Math.random() * 40) + 10;
//     let contCenterX = Math.floor(Math.random() * 200) + 10;
//     let contCenterY = Math.floor(Math.random() * 145) + 40;
//     for (let i = 0; i < planetsize; i++) {
//         for (let j = 0; j < planetsize; j++) {
//             if (Math.sqrt(Math.pow(Math.abs(contCenterX - j), 2) + Math.pow(Math.abs(contCenterY - i), 2)) <= contSize) {
//                 planet[i][j].terrain = "land";
//             } else {
//                 let taxidist = Math.abs(j - contCenterX) + Math.abs(contCenterY - i);
//                 if (Math.random() > (taxidist - contSize) / 50) {
//                     planet[i][j].terrain = "land";
//                 }
//                 if (j === 0 || j === 224) {
//                     continue;
//                 }
//                 if (checkBay(i, j) === true && planet[i][j].terrain === "ocean") {
//                     planet[i][j].terrain = "land";
//                     console.log("bruh");
//                 }
//                 if (checkIsland(i, j) === true && planet[i][j].terrain === "land") {
//                     planet[i][j].terrain = "ocean";
//                 }
//                 // console.log("bruh");
//             }
//         }
//     }
// }

function floodfill (nodex, nodey, target, terrain) {
    nodex = Number(nodex);
    nodey = Number(nodey);
    // console.log("nodex: " + nodex + "|nodey: " + nodey); 
    if (!planet[nodey]) {
        return;
    } else if (!planet[nodey][nodex]) {
        return;
    }
    if (planet[nodey][nodex].terrain === terrain) {
        return 0;
    } else if (planet[nodey][nodex].terrain !== target) {
        return 0;
    } else {
        planet[nodey][nodex].terrain = terrain;
    }
    floodfill(Number(nodex - 1), Number(nodey), target, terrain);
    floodfill(Number(nodex + 1), Number(nodey), target, terrain);
    floodfill(Number(nodex), Number(nodey + 1), target, terrain);
    floodfill(Number(nodex), Number(nodey - 1), target, terrain);
}

const joinContinents = () => {
    for (let i = 25; i < 200; i += 25) {
        floodfill(i, 0, "ocean", "oceandos");
        floodfill(i, 224, "ocean", "oceandos");
    }
    for (let i = 25; i < 200; i++) {
        for (let j = 0; j < 224; j++) {
            if (planet[i][j].terrain === "ocean") {
                planet[i][j].terrain = "land";
            }
        }
    }
    for (let i = 25; i < 200; i += 25) {
        floodfill(i, 0, "oceandos", "ocean");
        floodfill(i, 224, "oceandos", "ocean");
    }
}

const removeLakes = () => {
    for (let i = 1; i < 223; i++) {
        for (let j = 1; j < 223; j++) {
            if (checkLake(i, j) === true) {
                planet[i][j].terrain === "land";
            }
        }
    }
}

const createContinents = () => {
    let contCenterX = Math.floor(Math.random() * 145) + 10;
    let contCenterY = Math.floor(Math.random() * 200) + 40;
    let currentSpotX = contCenterX;
    let currentSpotY = contCenterY;
    for (let i = 0; i < 10000; i++) {
        let diceRoll = Math.floor(Math.random() * 4);
        switch(diceRoll) {
            case 0:
                currentSpotX++;
                break;
            case 1:
                currentSpotY++;
                break;
            case 2:
                currentSpotX--;
                break;
            case 3:
                currentSpotY--;
                break;
        }
        // console.log(currentSpotX + "|" + currentSpotY + "|" + diceRoll);
        if (!planet[currentSpotX]) {
            continue;
        }
        if (currentSpotY === 225 || currentSpotY <= 0) {
            continue;
        }
        if (currentSpotY <= arcticlength || currentSpotY >= 225 - arcticlength) {
            planet[currentSpotX][currentSpotY].terrain = "tundra";
        } else {
            planet[currentSpotX][currentSpotY].terrain = "land";
            planet[currentSpotX][currentSpotY].altitude = 100;
            planet[currentSpotX][currentSpotY].name = contNames[contCount] + bareContNames[contCount];
            planet[currentSpotX][currentSpotY].namenum = contCount;
        }
    }
}

const genMountains = (name) => {
    let contCenterX = Math.floor(Math.random() * 200) + 10;
    let contCenterY = Math.floor(Math.random() * 145) + 40;
    let currentSpotX = contCenterX;
    let currentSpotY = contCenterY;
    while (!planet[currentSpotY][currentSpotX].terrain === "land") {
        contCenterX = Math.floor(Math.random() * 200) + 10;
        contCenterY = Math.floor(Math.random() * 145) + 40;
        currentSpotX = contCenterX;
        currentSpotY = contCenterY;
    }
    for (let i = 0; i < 200; i++) {
        let diceRoll = Math.floor(Math.random() * 4);
        switch(diceRoll) {
            case 0:
                currentSpotX++;
                break;
            case 1:
                currentSpotY++;
                break;
            case 2:
                currentSpotX--;
                break;
            case 3:
                currentSpotY--;
                break;
        }
        if (!planet[currentSpotX]) {
            continue;
        }
        if (currentSpotY === 225 || currentSpotY <= 0) {
            continue;
        }
        if (planet[currentSpotX][currentSpotY].terrain === "land") {
            planet[currentSpotX][currentSpotY].terrain = "mountain";
            planet[currentSpotX][currentSpotY].name = "The Mountains of " + mountainNames[name];
        }
    }
}

const genHighHills = () => {
    for (let i = 1; i < planetsize - 1; i++) {
        for (let j = 1; j < planetsize - 1; j++) {
            if (planet[i][j].terrain === "land") {
                if (planet[i - 1][j].terrain === "mountain" || planet[i + 1][j].terrain === "mountain" || planet[i][j + 1].terrain === "mountain" || planet[i][j - 1].terrain === "mountain") {
                    planet[i][j].terrain = "highhills";
                    planet[i][j].name = "The High Hills of " + bareContNames[planet[i][j].namenum];
                }
            }
        }
    }
}

const genAltitude = () => {
    let contCenterX = Math.floor(Math.random() * 200) + 10;
    let contCenterY = Math.floor(Math.random() * 145) + 40;
    let currentSpotX = contCenterX;
    let currentSpotY = contCenterY;
    while (!planet[currentSpotY][currentSpotX].terrain === "land") {
        contCenterX = Math.floor(Math.random() * 200) + 10;
        contCenterY = Math.floor(Math.random() * 145) + 40;
        currentSpotX = contCenterX;
        currentSpotY = contCenterY;
    }
    for (let i = 0; i < 1000; i++) {
        let diceRoll = Math.floor(Math.random() * 4);
        switch(diceRoll) {
            case 0:
                currentSpotX++;
                break;
            case 1:
                currentSpotY++;
                break;
            case 2:
                currentSpotX--;
                break;
            case 3:
                currentSpotY--;
                break;
        }
        if (!planet[currentSpotX]) {
            continue;
        }
        if (currentSpotY === 225 || currentSpotY <= 0) {
            continue;
        }
        if (planet[currentSpotX][currentSpotY].terrain === "land") {
            planet[currentSpotX][currentSpotY].altitude = 75 - Math.floor(Math.random() * 30);
            planet[currentSpotX][currentSpotY].name = "The Hills of " + bareContNames[planet[currentSpotX][currentSpotY].namenum];
        }
    }
}

const genTemp = () => {
    let equator = Math.floor(planetsize / 2);
    for (let i = 0; i < planetsize; i++) {
        for (let j = 0; j < planetsize; j++) {
            if (planet[i][j].terrain === "land") {
                let equdist = Math.abs(equator - j);
                let randvari = Math.floor(Math.random() * 20) - 10;
                let temp = 80 + (equdist + randvari) - avgtemp;
                planet[i][j].temperature = temp;
                planet[i][j].hue = temp + 60;
            }
        }
    }
}

let contCount = 0;

const trycatchconts = () => {
    if (contCount >= 5) {
        return;
    }
    try {
        createContinents();
        contCount++;
        if (contCount < 5) {
            trycatchconts();
        }
    }
    catch {
        trycatchconts();
    }
}

const start = () => {
    createPlanetArr();
    trycatchconts();
    // joinContinents();
    removeLakes();
    createArctic();
    genTemp();
    for (let i = 0; i < 20; i++) {
        genMountains(i);
    }
    genHighHills();
    for (let i = 0; i < 50; i++) {
        genAltitude();
    }
}

start();

console.log(planet[120]);