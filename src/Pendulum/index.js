class Pendulum {
    constructor(x, y, armLength){
        // location of the origin of the pendulum
        this.location = createVector(x, y);
        // the boblocation
        this.bob = createVector(0,0);
        this.angle = PI/4;

        // angular values
        this.aVelocity = 0.0;
        this.aAcceleration = 0.0;
        this.damping = 0.995;
        this.gravity = 0.4;

        this.r = armLength;
    }

    go(){
        this.update();
        this.display();
    }

    follow(){
        this.location = createVector(mouseX, mouseY);
        const diff = p5.Vector.sub(this.bob, this.location);
        this.angle = atan2(diff.x, diff.y) ;
    }


    update(){
        this.aAcceleration = (-1 * this.gravity / this.r) * sin(this.angle);

        // add acceleration to velocity
        this.aVelocity += this.aAcceleration;
        this.aVelocity *= this.damping;
        // add velocity to angle
        this.angle += this.aVelocity;
    }

    display(){
        // the bob
        this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle));
        this.bob.add(this.location);

        // the origin and arm
        line(this.location.x, this.location.y, this.bob.x, this.bob.y);
        ellipse(this.bob.x, this.bob.y, 4, 4);

    }

}

export default Pendulum;