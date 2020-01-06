// ***************

let ga = p5mimicry.GeneticAlgorithm;
let mutationRate = 0.012;
let target = "happy birthday";
let population; // Population


function setup() {
    createCanvas(480, 360);
    // mutationRate, populationSize, target, lifetime
    population = new ga.TextPopulation(mutationRate, 100, target, target.length);
}

function draw() {
    background(220);

    // for(let i = 0; i < 100; i++){
        population.run();
    // }
    
    if(population.best.fitness === 1){
        console.log("done!", population.best.dna.genes)
        noLoop();
    }

    textAlign(CENTER);
    text(population.best.dna.genes.join(""), width/2, height/2)

    textAlign(LEFT);
    displayInfo()
    

}

function displayInfo(){
    // Display some info
    fill(0);
    noStroke();
    text("Generation #: " + population.getGenerations(), 10, 18);
    text("Best Fitness #: " + population.best.fitness, 10, 32);
    // text("Cycles left: " + (population.lifetime - population.lifecycle), 10, 36);
    // text("Record cycles: " + population.recordtime, 10, 54);
}