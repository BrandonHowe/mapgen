var canvas = document.getElementById("myCanvas");
var dcanvas = document.getElementById("dotcanvas");
canvas.width = 225;
canvas.height = 225;
dotcanvas.width = 225;
dotcanvas.height = 225;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var dtx = dcanvas.getContext("2d");

const drawPlanet = () => {
    for (let i = 0; i < planetsize; i++) {
        for (let j = 0; j < planetsize; j++) {
            switch (planet[i][j].terrain) {
                case "tundra": 
                    ctx.fillStyle = "#FFF"
                    ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                    break;
                case "ocean":
                    ctx.fillStyle = `hsl(240, 100%, 50%)`;
                    ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                    break;
                case "land":
                    ctx.fillStyle = `hsl(${(planet[i][j].hue)}, ${planet[i][j].altitude / 1.6}%, ${(planet[i][j].altitude / 50) + 50}%)`;
                    ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                    break;
                case "mountain":
                    ctx.fillStyle = `hsl(${(planet[i][j].hue)}, 25%, 70%)`;
                    ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                    break;
                case "highhills":
                    ctx.fillStyle = `hsl(${(planet[i][j].hue)}, 15%, 80%)`;
                    ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                    break;
            }
        }
    }
}

let currentPosY = 0;
let currentPosX = 0;

const updateName = () => {
    dtx.fillStyle = "#F00";
    dtx.fillRect(currentPosX, currentPosY, 1, 1);
    // dtx.clearRect();
    let currentName = planet[currentPosX][currentPosY].name;
    document.getElementById("name").innerHTML = currentName;
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 38:
            if (planet[currentPosY - 1]) {
                dtx.clearRect(currentPosX, currentPosY, 1, 1);
                currentPosY--;
            }
            break;
        case 39:
            if (planet[currentPosX + 1]) {
                dtx.clearRect(currentPosX, currentPosY, 1, 1);
                currentPosX++;
            }
            break;
        case 40:
            if (planet[currentPosY + 1]) {
                dtx.clearRect(currentPosX, currentPosY, 1, 1);
                currentPosY++;
            }
            break;
        case 37:
            if (planet[currentPosX - 1]) {
                dtx.clearRect(currentPosX, currentPosY, 1, 1);
                currentPosX--;
            }
            break;
    }
    // console.log(currentPosX + "|" + currentPosY)
    updateName();
};

drawPlanet();