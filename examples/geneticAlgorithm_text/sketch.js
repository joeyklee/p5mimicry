class Obstacle {
    constructor(x, y, w, h) {
        this.position = createVector(x, y);
        this.w = w;
        this.h = h;
    }

    display() {
        stroke(0);
        fill(175);
        strokeWeight(2);
        rectMode(CORNER);
        rect(this.position.x, this.position.y, this.w, this.h);
    }

    contains(spot) {
        if (spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h) {
            return true;
        } else {
            return false;
        }
    }

}

// function createInhabitant(){
//     let c = floor(random(63, 122));
//     if (c === 63) c = 32;
//     if (c === 64) c = 46;

//     return String.fromCharCode(c);
// }


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness


class Rocket {
    constructor(pos, dna) {
        // All of our physics stuff
        this.acceleration = createVector();
        this.velocity = createVector();
        this.position = pos.copy();
        this.r = 4;
        this.dna = dna;
        this.finishTime = 0; // We're going to count how long it takes to reach target
        this.recordDist = 10000; // Some high number that will be beat instantly

        this.fitness = 0;
        this.geneCounter = 0;
        this.hitObstacle = false; // Am I stuck on an obstacle?
        this.hitTarget = false; // Did I reach the target

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
        let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
        if (d < this.recordDist) this.recordDist = d;

        if (target.contains(this.position) && !this.hitTarget) {
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

    getFitness() {
        return this.fitness;
    }

    getDNA() {
        return this.dna;
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

// ***************

class Inhabitant {
    constructor(dna, target){
        this.fitness ;
        this.dna = dna;
    }

    // Did I make it to the target?
    checkTarget() {
        let d = dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
        if (d < this.recordDist) this.recordDist = d;

        if (target.contains(this.position) && !this.hitTarget) {
            this.hitTarget = true;
        } else if (!this.hitTarget) {
            this.finishTime++;
        }
    }

    getFitness() {
        return this.fitness;
    }

    getDNA() {
        return this.dna;
    }

    update(){
        
    }
    
    display(){
    
    }
}


// ***************

let ga = nocjs.GeneticAlgorithm;
let mutationRate = 0.01;
let target;
let population; // Population
let obstacles;

function createGenes() {
    let angle = random(TWO_PI);
    let gene = createVector(cos(angle), sin(angle));
    gene.mult(random(0, 0.2));
    return gene;
}


function createInhabitant(dna) {
    dna = (typeof dna !== 'undefined') ? dna : new ga.DNA(null, 300, createGenes);
    let position = createVector(width / 2, height + 20);
    return new Rocket(position, dna)
}

function setup() {
    createCanvas(480, 360);

    target = new Obstacle(width / 2 - 12, 24, 24, 24);
    // mutationRate, populationSize, lifetime, target
    population = new ga.Population(mutationRate, 50, createInhabitant, 300);
    
    // Create the obstacle course
    obstacles = [];
    obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
    
}

function draw() {
    background(220);

    population.run(obstacles);


    // display stuff
    // Draw the start and target positions
    target.display();

    // Draw the obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].display();
    }

    // Display some info
    fill(0);
    noStroke();
    text("Generation #: " + population.getGenerations(), 10, 18);
    text("Cycles left: " + (population.lifetime - population.lifecycle), 10, 36);
    text("Record cycles: " + population.recordtime, 10, 54);
}