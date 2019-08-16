class DNA {
    constructor(newGenes, lifetime, geneType){
        this.lifetime = lifetime || 300;
        this.geneType = geneType || 'vectors';

        if(newGenes){
            this.genes = newGenes;
        } else {
            this.genes = [];
            
            // Constructor (makes a DNA of random PVectors)
            for (let i = 0; i < this.lifetime; i++) {

                // createGenes function should return something like a p5.Vector or string or something iterable
                this.genes[i] = this.createGenes();

              }

        }
    }

    createGenes(){
        switch(this.geneType){
            case 'vectors':
                return this.createVectorGenes();
            case 'text':
                return this.createRandomTextGenes();
            default:
                return this.createVectorGenes();
        }

    }

    createVectorGenes(maxForce){
        let angle = random(TWO_PI);
        let gene = createVector(cos(angle), sin(angle));
        // TODO: add maxForce param here
        gene.mult(random(0, 0.2));
        return gene;
    }

    createRandomTextGenes(){
        let c = floor(random(63, 122));
        if (c === 63) c = 32;
        if (c === 64) c = 46;
        
        return String.fromCharCode(c);
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