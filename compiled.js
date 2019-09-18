let avgtemp = 70;
let tempModifiers = {
  freezing: 20,
  chilly: 30,
  cool: 40,
  mild: 50,
  temperate: 60,
  warm: 70,
  hot: 80,
  scorching: 90
};
let planetavgtemp = 60;
let planetsize = 75;
let planet = [];

const createPlanetArr = () => {
  for (let i = 0; i < planetsize; i++) {
    planet.push([]);

    for (let j = 0; j < planetsize; j++) {
      planet[i].push({});
    }
  }
};

const start = () => {
  createPlanetArr();
};

start();
console.log(planet);
