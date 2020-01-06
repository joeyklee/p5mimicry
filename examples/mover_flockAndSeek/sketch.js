let movers = [];
let target;
function setup() {
    createCanvas(480, 360);
    randomSeed(3);

    movers = [...new Array(50).fill(null)].map(item => new p5mimicry.Mover(random(width), random(height), 30, {maxSpeed:2}))
    target = createVector(width/2, height/2)
}

function draw() {
    background(220);

    target.set(mouseX, mouseY)
    

    movers.forEach(mover => {
        mover.flock(movers, {sepMultiplier:2, aliMultiplier:2, cohMultiplier:0.5});

        let dir = p5.Vector.sub(target, mover.location);
        dir.normalize();
        dir.mult(0.85);
        mover.applyForce(dir);

        mover.update();
        mover.display();
        mover.borders();
    })

}
