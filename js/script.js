// Test marching squares algorithm
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;

//region CONSTANTS
const GRID_SIZE = 50;

const LINE_END_COORDS = [
    {
        x: 0.5,
        y: 0
    },
    {
        x: 1,
        y: 0.5
    },
    {
        x: 0.5,
        y: 1
    },
    {
        x: 0,
        y: 0.5
    }
];
const LINE_TABLE = [
  [],
  [[2, 3]],
  [[1, 2]],
  [[1, 3]],
  [[0, 1]],
  [[0, 1], [2, 3]],
  [[0, 2]],
  [[0, 3]],
  [[0, 3]],
  [[0, 2]],
  [[0, 3], [1, 2]],
  [[0, 1]],
  [[1, 3]],
  [[1, 2]],
  [[2, 3]],
  []
];
//endregion

//region VARIABLES
let intersections = [[]];
//endregion

//region FUNCTIONS
function calculateIntersection(x, y) {
    return Math.floor(Math.random() * 2);
}

function generateIntersections() {
    let grid = [];
    for (let y = 0; y <= GRID_SIZE; y++) {
        let row = [];
        for (let x = 0; x <= GRID_SIZE; x++) {
            row.push(calculateIntersection(x, y));
        }
        grid.push(row);
    }
    return grid;
}

function calculateLines(x, y) {
    const a = intersections[y][x];
    const b = intersections[y][x + 1];
    const c = intersections[y + 1][x + 1];
    const d = intersections[y + 1][x];
    const caseIndex = a * 8 + b * 4 + c * 2 + d;
    return LINE_TABLE[caseIndex];
}

function point(x, y, radius, color = "black"){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function draw() {
    // background
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSizeX = canvas.width / GRID_SIZE;
    const cellSizeY = canvas.height / GRID_SIZE;

    // intersections
    for (let y = 0; y <= GRID_SIZE; y++) {
        for (let x = 0; x <= GRID_SIZE; x++) {
            const greyscale = intersections[y][x] * 255;
            point(x * cellSizeX, y * cellSizeY, cellSizeX * 0.2, `rgb(${greyscale}, ${greyscale}, ${greyscale})`);
        }
    }

    // lines
    ctx.strokeStyle = "black";
    ctx.lineWidth = cellSizeX * 0.2;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const lines = calculateLines(x, y);
            for (let line of lines) {
                ctx.beginPath();
                ctx.moveTo((x + LINE_END_COORDS[line[0]].x) * cellSizeX, (y + LINE_END_COORDS[line[0]].y) * cellSizeY);
                ctx.lineTo((x + LINE_END_COORDS[line[1]].x) * cellSizeX, (y + LINE_END_COORDS[line[1]].y) * cellSizeY);
                ctx.stroke();
            }
        }
    }
}
//endregion

intersections = generateIntersections();
draw();