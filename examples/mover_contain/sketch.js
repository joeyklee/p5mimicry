
let mover;
let container;
let nudge;
function setup(){
    createCanvas(480, 360);
    mover = new p5mimicry.Mover(width/2, height/2, 40, {maxForce: 10, maxSpeed: 4});
    nudge = createVector(0.1, 0.1);
    container = createVector(width/2, height/2);
}

function draw(){
    background(220);
    rectMode(CENTER);
    rect(container.x, container.y, 200, 100)
    // the second/thirds parameters to .contain() are 
    // the width and height of the container
    mover.contain(container, 200, 100);
    mover.applyForce(nudge);
    mover.update();
    mover.display();

    
}