const {DNA, VectorDNA, TextDNA} = require('./DNA');
const {Inhabitant, VectorInhabitant, TextInhabitant} = require('./Inhabitant');
const Obstacle = require('./Obstacle');

class Population {
    constructor(mutationRate, populationSize, target) {

        this.mutationRate = mutationRate;
        this.populationSize = populationSize;
        this.population = [];
        this.matingPool = [];
        this.generations = 0;
        this.finished = false;
        this.best = null;
        this.perfectScore = 1;
        this.target = target;

        this.init();
    }

    /**
     * initialize
     * @param {*} Inhabitant 
     */
    init() {
        // this.population.push(Inhabitant);
        // fill your population with "creatures"
        for (let i = 0; i < this.populationSize; i++) {
            // let position = createVector(width / 2, height + 20);
            // this.population[i] = new Rocket(position, new DNA(), this.population.length);
            this.population[i] = this.createInhabitant();
        }
    }

    /**
     * SELECTION
     */
    selection() {
        // Clear the ArrayList
        this.matingPool = [];
        // Calculate total fitness of whole population
        let maxFitness = this.getMaxFitness();
        // Calculate fitness for each member of the population (scaled to value between 0 and 1)
        // Based on fitness, each member will get added to the mating pool a certain number of times
        // A higher fitness = more entries to mating pool = more likely to be picked as a parent
        // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        for (let i = 0; i < this.population.length; i++) {
            let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
            let n = int(fitnessNormal * 100); // Arbitrary multiplier
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }

    /**
     * REPRODUCTION
     */
    reproduction() {
        // Refill the population with children from the mating pool
        for (let i = 0; i < this.population.length; i++) {
            // Sping the wheel of fortune to pick two parents
            let m = int(random(this.matingPool.length));
            let d = int(random(this.matingPool.length));

            // Pick two parents
            let parent1 = this.matingPool[m];
            let parent2 = this.matingPool[d];

            // Get their genes
            let parent1genes = parent1.getDNA();
            let parent2genes = parent2.getDNA();
            // Mate their genes
            let child = parent1genes.crossover(parent2genes);
            // Mutate their genes
            child.mutate(this.mutationRate);

            this.population[i] = this.createInhabitant(child);
        }
        this.generations++;
    }

    /**
     * Get the this.best
     */
    evaluate(){
        let record = 0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].getFitness() > record) {
                index = i;
                record = this.population[i].getFitness();
            }
        }
        this.best = this.population[index]
        
        // if we achieve the goal, then change this.finished to TRUE
        if (record === this.perfectScore) {
            this.finished = true;
        }
        
    }

    /**
     * check if this is finished
     */
    isFinished() {
        return this.finished;
      }

    /**
     * get the max fitness - same as evaluate() except returns the record
     */
    getMaxFitness() {
        let record = 0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].getFitness() > record) {
                record = this.population[i].getFitness();
            }
        }
        this.best = this.population[index]

        return record;
    }

    /**
     * Get the fitness for each Inhabitant
     */
    calcFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness();
        }
    }

    /**
     * Get the number of generations
     */
    getGenerations() {
        return this.generations;
    }

    /* ------ the below functions will change depending on the use case ------- */
    /**
     * VARIES BASED ON THE PROBLEM BEING SOLVED
     * SEE: VectorPopulation, TextPopulation, etc
     * @param {*} dna 
     */
    // add a new inhabitant to the population
    createInhabitant(dna) {
        // dna = (typeof dna !== 'undefined') ? dna : new DNA(null, 300, 'vectors');
        // let position = createVector(width / 2, height + 20);
        // return new Inhabitant(position, dna, this.target)
    }

    run() {
        // If the generation hasn't ended yet
        // if (this.lifecycle < this.lifetime) {
        //     // let the population live
        //     this.live(this.obstacles);

        //     if ((this.targetReached()) && (this.lifecycle < this.recordtime)) {
        //         this.recordtime = this.lifecycle;
        //     }
        //     this.incrementLifecycle();

        // } else {
        //     // Otherwise a new generation
        //     this.resetLifecycle();
        //     this.calcFitness();
        //     this.selection();
        //     this.reproduction();
        //     this.evaluate();
        // }
    }
    
    live() {
        // For every creature
        // for (let i = 0; i < this.population.length; i++) {
        //     // If it finishes, mark it down as done!
        //     this.population[i].checkTarget();
        //     this.population[i].run(this.obstacles);
        // }
    }

}


class TextPopulation extends Population {
    constructor(mutationRate, populationSize, target){
        super(mutationRate, populationSize, target);

        this.init();
        this.calcFitness();
        // this.selection();
    }

    createInhabitant(dna){
        dna = (typeof dna !== 'undefined') ? dna : new TextDNA(null, this.target.length);
        return new TextInhabitant(dna, this.target)
    }

    run(){
        this.calcFitness();
        this.selection();
        this.reproduction();
        this.evaluate();
    }

}

class VectorPopulation extends Population {
    constructor(mutationRate, populationSize, target, lifetime){
        super(mutationRate, populationSize, target);

        this.lifetime = lifetime || 300;
        this.recordtime = lifetime || 300;
        this.lifecycle = 0;
        this.obstacles = [];

        this.init();

    }
    
    createInhabitant(dna){
        dna = (typeof dna !== 'undefined') ? dna : new VectorDNA(null, this.lifetime);
        let position = createVector(width / 2, height + 20);
        return new VectorInhabitant(dna, this.target, position)
    }

    createObstacle(x, y, w, h){
        this.obstacles.push( new Obstacle(x, y, w, h))
    }

    /**
     * reset this.lifecycle to 0
     */
    resetLifecycle() {
        this.lifecycle = 0;
    }

    /**
     * increment this.lifecycle by 1
     */
    incrementLifecycle() {
        this.lifecycle += 1;
    }

    // Did anything finish?
    targetReached() {
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].hitTarget){
                this.finished = true;
                return true;
            }
        }
        return false;
    }

    live() {
        // For every creature
        for (let i = 0; i < this.population.length; i++) {
            // If it finishes, mark it down as done!
            this.population[i].checkTarget();
            this.population[i].run(this.obstacles);
        }
    }

    run() {
        // If the generation hasn't ended yet
        if (this.lifecycle < this.lifetime) {
            // let the population live
            this.live(this.obstacles);

            if ((this.targetReached()) && (this.lifecycle < this.recordtime)) {
                this.recordtime = this.lifecycle;
            }
            this.incrementLifecycle();

        } else {
            // Otherwise a new generation
            this.resetLifecycle();
            this.calcFitness();
            this.selection();
            this.reproduction();
            this.evaluate();
        }
    }

}


module.exports = {Population, VectorPopulation, TextPopulation};