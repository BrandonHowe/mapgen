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
let arcticlength = 5;

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
            if (Math.floor(Math.random() * (i + 1)) === 0) {
                planet[i][j].terrain = "tundra";
                // console.log(board[i][j].terrain);
            }
        }
    }
}

const start = () => {
    createPlanetArr();
    createArctic();
}

start();

console.log(planet[3]);