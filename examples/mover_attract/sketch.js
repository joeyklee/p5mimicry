
let mover;
let attractor;
function setup(){
    createCanvas(480, 360);

    mover = new p5mimicry.Mover(10, 10, 30);
    attractor =  new p5mimicry.Mover(width/2, height/2, 80);
}

function draw(){
    background(220);

    let attraction = attractor.attract(mover, 'location', 'mass', 2);
    mover.applyForce(attraction);
    mover.update();

    noStroke();
    fill(  26, 188, 156 );
    rectMode(CENTER);
    rect(attractor.location.x, attractor.location.y, 40, 40);

    fill( 142, 68, 173 )
    mover.display();
}