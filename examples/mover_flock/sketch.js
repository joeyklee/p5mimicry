let movers = [];
function setup() {
    createCanvas(480, 360);
    randomSeed(3);
    movers = [...new Array(50).fill(null)].map(item => new p5mimicry.Mover(random(width), random(height), 30, {maxSpeed:2}))
}

function draw() {
    background(220);

    movers.forEach(mover => {
        mover.flock(movers, {sepMultiplier:4, aliMultiplier:2, cohMultiplier:1});
        
        mover.update();
        mover.display();
        mover.borders();
    })

}
