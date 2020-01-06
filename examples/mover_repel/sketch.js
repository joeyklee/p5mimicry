
let mover;
let repeller;
function setup(){
    createCanvas(480, 360);

    mover = new p5mimicry.Mover(width/2, height/2, 30);
    repeller =  new p5mimicry.Mover(width/2, height/2, 80);
}

function draw(){
    background(220);
    
    const mouse = createVector(mouseX, mouseY);
    repeller.location.set(mouse);

    let repulsion = repeller.repel(mover, 'location', 'mass', 2);
    mover.applyForce(repulsion);
    
    mover.update();
    mover.checkEdges();

    noStroke();
    fill(  26, 188, 156 );
    rectMode(CENTER);
    rect(repeller.location.x, repeller.location.y, 40, 40);

    fill( 142, 68, 173 )
    mover.display();
}