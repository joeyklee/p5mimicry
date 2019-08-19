class Inhabitant {
    constructor(dna, target) {
        this.dna = dna;
        this.target = target;
        this.fitness = 0;
    }

    calcFitness() {
        // TODO: Fix fitness values - they shouldn't be so outrageously large!
        let sum = this.dna.genes.reduce( (x, y) => x + y, 0);
        sum =  parseFloat(sum.toFixed(2));
        let score =  1 / ( sum - this.target);
        score = (score !== Infinity) ? score : 0;
        this.fitness = score;

    }

    run() {
        this.display();
    }

    display() {
        text(this.getPhrase(), width / 2, height / 2);
    }

    getPhrase() {
        return this.dna.genes.join(",");
    }

    checkTarget() {}


    getFitness() {
        return this.fitness;
    }

    getDNA() {
        return this.dna;
    }


}

class TextInhabitant extends Inhabitant {
    constructor(dna, target) {
        super(dna, target);

    }

    calcFitness() {
        let score = 0;
        for (let i = 0; i < this.dna.genes.length; i++) {
            if (this.dna.genes[i] == this.target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score;
    }

    run() {
        this.display();
    }

    display() {
        text(this.getPhrase(), width / 2, height / 2);
    }


    checkTarget() {}

    // Converts character array to a String
    getPhrase() {
        return this.dna.genes.join("");
    }

}

class VectorInhabitant extends Inhabitant {
    constructor(dna, target, pos) {
        super(dna, target);

        // All of our physics stuff
        this.acceleration = createVector();
        this.velocity = createVector();
        this.position = pos.copy();
        this.r = 4;

        this.geneCounter = 0;
        this.hitObstacle = false; // Am I stuck on an obstacle?
        this.hitTarget = false; // Did I reach the target
        this.finishTime = 0; // We're going to count how long it takes to reach target
        this.recordDist = 10000; // Some high number that will be beat instantly

    }

    // FITNESS FUNCTION
    // distance = distance from target
    // finish = what order did i finish (first, second, etc. . .)
    // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
    // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponetially)
    calcFitness() {
        if (this.recordDist < 1) this.recordDist = 1;

        // Reward finishing faster and getting close
        this.fitness = (1 / (this.finishTime * this.recordDist));

        // Make the function exponential
        this.fitness = pow(this.fitness, 4);

        if (this.hitObstacle) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
        if (this.hitTarget) this.fitness *= 2; // twice the fitness for finishing!
    }

    // Run in relation to all the obstacles
    // If I'm stuck, don't bother updating or checking for intersection
    run(os) {
        if (!this.hitObstacle && !this.hitTarget) {
            this.applyForce(this.dna.genes[this.geneCounter]);
            this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
            this.update();
            // If I hit an edge or an obstacle
            this.obstacles(os);
        }
        // Draw me!
        if (!this.hitObstacle) {
            this.display();
        }
    }

    // Did I make it to the target?
    checkTarget() {
        let d = dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
        if (d < this.recordDist) this.recordDist = d;

        if (this.target.contains(this.position) && !this.hitTarget) {
            this.hitTarget = true;
        } else if (!this.hitTarget) {
            this.finishTime++;
        }
    }

    // Did I hit an obstacle?
    obstacles(os) {
        for (let i = 0; i < os.length; i++) {
            let obs = os[i];
            if (obs.contains(this.position)) {
                this.hitObstacle = true;
            }
        }
    }

    stopped() {
        return this.hitObstacle;
    }

    applyForce(f) {
        this.acceleration.add(f);
    }


    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        //background(255,0,0);
        let theta = this.velocity.heading() + PI / 2;
        fill(200, 100);
        stroke(0);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);

        // Thrusters
        rectMode(CENTER);
        fill(0);
        rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
        rect(this.r / 2, this.r * 2, this.r / 2, this.r);

        // Rocket body
        fill(175);
        beginShape(TRIANGLES);
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape();

        pop();
    }


}


module.exports = {
    Inhabitant,
    VectorInhabitant,
    TextInhabitant
};