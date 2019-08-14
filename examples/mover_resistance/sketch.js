
let resistanceArea;

let movers = [];
function setup(){
    createCanvas(480, 360);
    randomSeed(3);

    // movers[0] = new nocjs.Mover(width/2, 10, 40);
    // movers[1] = new nocjs.Mover(20, 10, 40);

    movers = [...new Array(50).fill(null)].map(item => new nocjs.Mover( random(width), 10,30))

    resistanceArea = new ResistanceArea(width/2, height/2, 100);

}

function draw(){
    background(220);

    resistanceArea.display();

    const gravity = createVector(0, 2);

    movers.forEach(mover => {
        mover.applyForce(gravity);

        let distanceToResistance = dist(mover.location.x, mover.location.y, resistanceArea.location.x, resistanceArea.location.y);

        if(distanceToResistance < resistanceArea.radius/2){
            // console.log('applying friction!')
            mover.applyResistance(4);
        }

        stroke(255);
        fill(142, 68, 173);
        mover.update();
        mover.display();

        if(mover.location.y > height){
            mover.location.y = 0;
        }

    })

}

class ResistanceArea {
    constructor(x, y, radius){
        this.location = createVector(x, y);
        this.radius = radius;
    }
    display(){
        noStroke();
        fill(243, 156, 18)
        ellipse(this.location.x, this.location.y, this.radius, this.radius);
    }
}