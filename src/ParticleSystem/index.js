const Particle = require('./Particle');

class ParticleSystem {
    constructor(location){
        this.location = location.copy();
        this.particles = [];
    }
    // maxForce, decayRate, lifespan
    addParticle(location, mass, maxForce, decayRate, lifespan){
        let loc = location ? location.copy() : this.location
        let m = mass ? mass : 2;
        this.particles.push(new Particle(loc, m, maxForce, decayRate, lifespan))
    }

    run(){
        for(let particle of this.particles){
            particle.run();
        }

        this.particles = this.particles.filter(particle => !particle.isDead());
    }

    update(){
        for(let particle of this.particles){
            particle.update();
        }
    }

    filterParticles(){
        this.particles = this.particles.filter(particle => !particle.isDead());
    }

    // send an array of 
    applyParticleForce(multiplierX, multiplierY){
        for(let particle of this.particles){
            const randomForce = p5.Vector.random2D();
            randomForce.x *= multiplierX;
            randomForce.y *= multiplierY;
            particle.applyForce(randomForce);
        }
    }

    applyForce(f){
        for(let particle of this.particles){
            particle.applyForce(f);
        }
    }

}

module.exports = ParticleSystem;