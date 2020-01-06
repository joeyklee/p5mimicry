// ***************

let ga = p5mimicry.GeneticAlgorithm;
let mutationRate = 0.012;
let target = 0.62;
let population; // Population


function setup() {
    createCanvas(480, 360);
    // mutationRate, populationSize, target
    population = new ga.Population(mutationRate, 100, target, 5);
}

function draw() {
    background(220);

    population.run();
    
    if(population.best.fitness === 1){
        console.log("done!", population.best.dna.genes)
        noLoop();
    }

    textAlign(CENTER);
    population.best.dna.genes.forEach( (n, i) => {
         let txt = n.toFixed(2);
         text(txt, width/2, height/2 + (i*10) )
    })

    textAlign(LEFT);
    displayInfo()
    

}

function displayInfo(){
    // Display some info
    fill(0);
    noStroke();
    text("Generation #: " + population.getGenerations(), 10, 18);
    text("Best Fitness #: " + population.best.fitness, 10, 32);
}