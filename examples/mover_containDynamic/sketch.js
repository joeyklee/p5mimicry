
let mover;
let container;
let nudge;
let xoff = 0;
let yoff = 100000;

function setup(){
    createCanvas(480, 360);
    mover = new nocjs.Mover(width/2, height/2, 40, {maxForce: 10, maxSpeed: 4});
    nudge = createVector(0.1, 0.1);
    container = createVector(width/2, height/2);
}

function draw(){
    background(220, 220, 200, 10);
    rectMode(CENTER);
    noFill();
    rect(container.x, container.y, 100, 100)
    // the second/third parameters to .contain() are 
    // the width and height of the container
    let noiseX = map(noise(xoff), 0, 1, -1, 1);
    let noiseY = map(noise(yoff), 0, 1, -1, 1);
    container.add( noiseX, noiseY )
    mover.contain(container, 100, 100);
    mover.applyForce(nudge);
    mover.update();
    
    fill(255)
    mover.display();
    
    xoff += 0.1;
    yoff += 0.1;

    
}