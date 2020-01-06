
let mover;
function setup(){
    createCanvas(480, 360);
    mover = new p5mimicry.Mover(width/2, height/2, 40, {maxForce: 1.5});
}

function draw(){
    background(220);

    const target = createVector(mouseX, mouseY);
    mover.seek(target);
    mover.update();
    mover.display();
}