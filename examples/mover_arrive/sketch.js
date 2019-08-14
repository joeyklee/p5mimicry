
let mover;
function setup(){
    createCanvas(480, 360);
    mover = new noc.Mover(width/2, height/2, 40, {maxForce: 10, maxSpeed: 4});
}

function draw(){
    background(220);

    const target = createVector(mouseX, mouseY);
    mover.arrive(target);
    mover.update();
    mover.display();
}