var canvas = document.getElementById("myCanvas");
canvas.width = 225;
canvas.height = 225;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");

for (let i = 0; i < planetsize; i++) {
    for (let j = 0; j < planetsize; j++) {
        switch (planet[i][j].terrain) {
            case "tundra": 
                ctx.fillStyle = "#FFF"
                ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                break;
            case "ocean":
                ctx.fillStyle = "#00F"
                ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                break;
            case "land":
                ctx.fillStyle = "#0F0"
                ctx.fillRect(i,j,2,2); // fill in the pixel at (10,10)
                break;
        }
    }
}