
let mover;
function setup(){
    createCanvas(480, 360);

    mover = new nocjs.Mover(width/2, height/2, 40);
    mover.maxForce = 1.5;
}

function draw(){
    background(220);

    const target = createVector(mouseX, mouseY);
    mover.arrive(target);
    mover.update();
    mover.display();
}