
let pendulum;
function setup(){
    createCanvas(480, 360);
    pendulum = new nocjs.Pendulum(width/2, 20, 100, 40);
}

function draw(){
    background(220);
    pendulum.go();
}