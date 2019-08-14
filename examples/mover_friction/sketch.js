let frictionArea;

let movers = [];

function setup() {
    createCanvas(480, 360);
    randomSeed(3);

    // movers[0] = new noc.Mover(width/2, 10, 40);
    // movers[1] = new noc.Mover(20, 10, 40);

    movers = [...new Array(50).fill(null)].map(item => new noc.Mover(random(width), 10, 30, {maxSpeed:4}))

    frictionArea = new FrictionArea(width / 2, height / 2, 100);

}

function draw() {
    background(220);

    frictionArea.display();

    const gravity = createVector(0, 2);

    movers.forEach(mover => {
        mover.applyForce(gravity);

        let distanceToFriction = dist(mover.location.x, mover.location.y, frictionArea.location.x, frictionArea.location.y);

        if (distanceToFriction < frictionArea.radius / 2) {
            // console.log('applying friction!')
            mover.applyFriction(4);
        }


        stroke(255);
        fill(142, 68, 173);
        mover.update();
        mover.display();

        if (mover.location.y > height) {
            mover.location.y = 0;
        }

    })

}

class FrictionArea {
    constructor(x, y, radius) {
        this.location = createVector(x, y);
        this.radius = radius;
    }
    display() {
        noStroke();
        fill(243, 156, 18)
        ellipse(this.location.x, this.location.y, this.radius, this.radius);
    }
}