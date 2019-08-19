class DNA {
    constructor(newGenes, lifetime) {
        this.fitness = 0;
        // the lifetime is the length of thing you're trying to solve
        this.lifetime = lifetime;
        this.genes = null;
        this.name = this.constructor.name;
        // create a proxy for each type of unique DNA passed in
        this.DNAProxy = this.constructor
        this.init(newGenes);
    }


    /**
     *  create an array of genes
        their length should be the approx. or exact 
        length of the thing you are trying to solve for
        for example: an array of vectors telling a rocket how to travel
        for example: the length of a sentence you're trying to solve
     * @param {*} newGenes 
     */
    init(newGenes) {
        if (newGenes !== null) {
            this.genes = newGenes;
        } else {
            this.genes = [];
            for (let i = 0; i < this.lifetime; i++) {
                // createGenes function should return something like a p5.Vector or string or something iterable
                this.genes[i] = this.createGenes();
            }
        }
    }


    // DEPENDS ON THE USE CASE, DEFAULTS TO Random Number between -1 and 1;
    createGenes() {
        let num = random(0, 1)
        num = parseFloat(num.toFixed(2));
        return num
    }

    // crossover 
    // creates new DNA sequecne from two (this and a partner)
    crossover(partner) {
        let child = [];

        // pick a midppoint
        let crossover = floor(random(this.genes.length));
        // Take "half" from one and "half" from the other
        for (let i = 0; i < this.genes.length; i++) {
            if (i > crossover) child[i] = this.genes[i];
            else child[i] = partner.genes[i];
        }
        let newGenes = new this.DNAProxy( child, this.lifetime);
        return newGenes;

    }

    // mutation based on a probability
    mutate(m) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < m) {
                // ADD RANDOM MUTATION TO AFFECT GENES
                this.genes[i] = this.createGenes();

            }
        }
    }

}

class TextDNA extends DNA {
    constructor(newGenes, lifetime) {
        super(newGenes, lifetime);
    }

    createGenes() {
        let c = floor(random(63, 122));
        if (c === 63) c = 32;
        if (c === 64) c = 46;
        return String.fromCharCode(c);
    }

}


class VectorDNA extends DNA {
    constructor(newGenes, lifetime) {
        super(newGenes, lifetime);

    }

    createGenes() {
        let angle = random(TWO_PI);
        let gene = createVector(cos(angle), sin(angle));
        // TODO: add maxForce param here
        gene.mult(random(0, 0.2));
        return gene;
    }

}

// const classes = {
//     DNA,
//     TextDNA,
//     VectorDNA
// }

// class DNAProxy {
//     constructor(className, newGenes, lifetime) {
//         return new classes[className](newGenes, lifetime)
//     }
// }

module.exports = {
    DNA,
    VectorDNA,
    TextDNA
};