
let movers = [];
function setup(){
    createCanvas(480, 360);
    movers = [... new Array(20).fill(null)].map( item => new noc.Mover(random(width), random(height), 20, {maxForce: 4, maxSpeed: 2}))
}

function draw(){
    background(220);
    const target = createVector(mouseX, mouseY);
    movers.forEach(mover => {
        const separation = mover.separate(movers);
        separation.mult(10);
        mover.applyForce(separation);
        mover.seek(target);
        mover.update();
        mover.display();
    })
    
}