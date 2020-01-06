let desired;
let targets = [];
let mover;

function setup() {
    randomSeed(4);
    createCanvas(480, 360);

    for (let i = 0; i < 3; i++) {
        targets.push(createVector(random(width), random(height * 0.25, height * 0.75)))
    }

    // targets.push(createVector(width * 0.75, height * 0.85))
    // targets.push(createVector(width * 0.25, height * 0.75))
    // targets.push(createVector(width * 0.75, height * 0.25))
    // targets.push(createVector(width * 0.25, height * 0.25))

    mover = new p5mimicry.Mover(width / 2, height / 2, 40, {
        maxForce: 1,
        maxSpeed: 2,
        perceptronTargets: targets.length
    });

    rectMode(CENTER);
}


function draw() {
    background(220);

    desired = createVector(width / 2, height / 2)
    // desired = createVector(mouseX, mouseY)
    mover.perceptAndSteer(targets, desired);

    mover.update();
    mover.display();

    showTargets()
}

function showTargets() {

    targets.forEach(target => {
        rect(target.x, target.y, 10, 10);
    })
}