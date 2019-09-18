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

const createPlanetArr = () => {
    for (let i = 0; i < planetsize; i++) {
        planet.push([]);
        for (let j = 0; j < planetsize; j++) {
            planet[i].push({"terrain": "ocean"});
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

const createContinents = () => {
    let contSize = Math.floor(Math.random() * 40) + 10;
    let contCenterX = Math.floor(Math.random() * 200) + 10;
    let contCenterY = Math.floor(Math.random() * 145) + 40;
    for (let i = 0; i < planetsize; i++) {
        for (let j = 0; j < planetsize; j++) {
            if (Math.sqrt(Math.pow(Math.abs(contCenterX - j), 2) + Math.pow(Math.abs(contCenterY - i), 2)) <= contSize) {
                planet[i][j].terrain = "land";
            } else {
                let taxidist = Math.abs(j - contCenterX) + Math.abs(contCenterY - i);
                if (Math.random() > (taxidist - contSize) / 50) {
                    planet[i][j].terrain = "land";
                }
                if (j === 0 || j === 224) {
                    continue;
                }
                if (checkBay(i, j) === true && planet[i][j].terrain === "ocean") {
                    planet[i][j].terrain = "land";
                    console.log("bruh");
                }
                if (checkIsland(i, j) === true && planet[i][j].terrain === "land") {
                    planet[i][j].terrain = "ocean";
                }
                // console.log("bruh");
            }
        }
    }
}

const start = () => {
    createPlanetArr();
    createArctic();
    createContinents();
}

start();

console.log(planet[3]);