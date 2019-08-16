class DNA {
    constructor(newGenes, lifetime, createGenes){
        this.lifetime = lifetime || 300;
        this.createGenes = createGenes;

        if(newGenes){
            this.genes = newGenes;
        } else {
            this.genes = [];
            
            // Constructor (makes a DNA of random PVectors)
            for (let i = 0; i < this.lifetime; i++) {

                // let angle = random(TWO_PI);
                // this.genes[i] = createVector(cos(angle), sin(angle));
                // this.genes[i].mult(random(0, this.maxforce));

                // createGenes function should return something like a p5.Vector or string or something iterable
                this.genes[i] = this.createGenes();

              }

        }
    }

    // crossover 
    // creates new DNA sequecne from two (this and a partner)
    crossover(partner){
        let child = [];

        // pick a midppoint
        let crossover = floor(random(this.genes.length));
        // Take "half" from one and "half" from the other
        for (let i = 0; i < this.genes.length; i++) {
            if (i > crossover) child[i] = this.genes[i];
            else child[i] = partner.genes[i];
        }
        let newGenes = new DNA(child, this.lifetime, this.createGenes);
        return newGenes;

    }

    // mutation based on a probability
    mutate(m){
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < m) {
            //   let angle = random(TWO_PI);
            //   this.genes[i] = p5.Vector.fromAngle(angle);
            //   this.genes[i].mult(random(0, this.maxforce));

            // ADD RANDOM MUTATION TO AFFECT GENES
            this.genes[i] = this.createGenes();

            }
          }
    }

}

module.exports = DNA;