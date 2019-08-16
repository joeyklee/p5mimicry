class Particle {
    constructor(location, mass, maxForce, decayRate, lifespan){
        this.location = location.copy();
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.mass = mass || 2;
        this.lifespan = lifespan || 255.0;
        this.maxForce = maxForce || 2;
        this.decayRate = decayRate|| 2.0;
    }

    applyForce(force){
        const f = force.copy();
        f.div(this.mass)
        this.acceleration.add(f);
    }

    run(){
        this.update();
        this.display();
    }

    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxForce)
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        this.lifespan -= this.decayRate;
    }

    display(){
        stroke(200, this.lifespan);
        strokeWeight(2);
        fill(127, this.lifespan);
        ellipse(this.location.x, this.location.y, 12, 12);
    }

    isDead(){
        if (this.lifespan < 0.0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Particle;