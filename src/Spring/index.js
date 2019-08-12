class Spring {
    constructor(x, y, length) {
        this.anchor = createVector(x, y);
        this.restLength = length;
        this.k = 0.2;
        this.minConstraint = 30;
        this.maxConstraint = 200;

        this.bob = new Bob(x, y + length);
    }

    connect() {
        // Vector pointing from anchor to bob location
        let force = p5.Vector.sub(this.bob.location, this.anchor);
        // get the distance
        let d = force.mag();
        // stretch is the difference between the current distance and rest length
        let stretch = d - this.restLength;

        // calc strength based on Hooke's Law
        // F = k * stretch;
        force.normalize();
        force.mult(-1 * this.k * stretch);
        this.bob.applyForce(force);
    }

    update(){
        this.connect();
        this.constrainLength( this.minConstraint, this.maxConstraint);
        this.bob.applyGravity();
        this.bob.update();
    }

    // Constrain the distance between bob and anchor between min and max
    // Constrain the distance between bob and anchor between min and max
    constrainLength(minLength, maxLength) {
        let dir = p5.Vector.sub(this.bob.location, this.anchor);
        let d = dir.mag();
        // Is it too short?
        if (d < minLength) {
            dir.normalize();
            dir.mult(minLength);
            // Reset location and stop from moving (not realistic physics)
            this.bob.location = p5.Vector.add(this.anchor, dir);
            this.bob.velocity.mult(0);
            // Is it too long?
        } else if (d > maxLength) {
            dir.normalize();
            dir.mult(maxLength);
            // Reset location and stop from moving (not realistic physics)
            this.bob.location = p5.Vector.add(this.anchor, dir);
            this.bob.velocity.mult(0);
        }
    }


    display() {
        stroke(255);
        fill(127);
        strokeWeight(2);
        ellipse(this.anchor.x, this.anchor.y, 10);
        line(this.bob.location.x, this.bob.location.y, this.anchor.x, this.anchor.y);
        ellipse(this.bob.location.x, this.bob.location.y, this.bob.mass / 2);
    }

}

class Bob {
    constructor(x, y) {
        this.location = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = 40;
        // Arbitrary damping to simulate friction / drag
        this.damping = 0.98;
        // For user interaction
        this.dragOffset = createVector();
        this.dragging = false;
        this.gravity = createVector(0, 2);
    }
    // Standard Euler integration
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.mult(this.damping);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }


    applyGravity(force) {
        let g = force ? force.copy() : this.gravity.copy();
        this.applyForce(g);
    }

    // Newton's law: F = M * A
    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    // Draw the bob
    display() {
        stroke(255);
        strokeWeight(2);
        fill(127);
        if (this.dragging) {
            fill(200);
        }
        // ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
    }

    clicked(mx, my) {
        let d = dist(mx, my, this.location.x, this.location.y);
        if (d < this.mass) {
            this.dragging = true;
            this.dragOffset.x = this.location.x - mx;
            this.dragOffset.y = this.location.y - my;
        }
    }

    stopDragging() {
        this.dragging = false;
    }

    drag(mx, my) {
        if (this.dragging) {
            this.location.x = mx + this.dragOffset.x;
            this.location.y = my + this.dragOffset.y;
        }
    }
}

export default Spring;