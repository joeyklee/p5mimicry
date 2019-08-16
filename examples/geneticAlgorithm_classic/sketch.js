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



// ***************

let ga = nocjs.GeneticAlgorithm;
let mutationRate = 0.01;
let target;
let population; // Population
let obstacles;



function setup() {
    createCanvas(480, 360);

    target = new Obstacle(width / 2 - 12, 24, 24, 24);
    // mutationRate, populationSize, lifetime, target
    population = new ga.Population(mutationRate, 50, 'vectors', 300, target);
    
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