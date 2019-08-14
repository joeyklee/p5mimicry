const DEFAULTS = {
    angle: Math.PI / 4,
    aVelocity: 0.0,
    aAcceleration: 0.0,
    damping: 0.995,
    gravity: 0.4,
    bobRadius: 20,
    r: 100,
}

class Pendulum {
    constructor(x, y, armLength, bobRadius, options ={}) {
        options = (typeof options !== 'undefined') ? options : {};
        // location of the origin of the pendulum
        this.location = createVector(x, y);
        // the boblocation
        this.bob = createVector(0, 0);
        this.angle = options.angle || DEFAULTS.angle;
        this.aVelocity =  options.aVelocity || DEFAULTS.aVelocity;
        this.aAcceleration =  options.aAcceleration || DEFAULTS.aAcceleration;
        this.damping = options.damping || DEFAULTS.damping;
        this.gravity =  options.gravity || DEFAULTS.gravity;
        this.bobRadius = bobRadius || DEFAULTS.bobRadius;
        this.r = armLength || options.r || DEFAULTS.r;
        this.dragging = false;
    }

    go() {
        this.update();
        this.display();
    }

    follow() {
        this.location = createVector(mouseX, mouseY);
        const diff = p5.Vector.sub(this.bob, this.location);
        this.angle = atan2(diff.x, diff.y);
    }


    update() {
        // As long as we aren't dragging the pendulum, let it swing!
        if (!this.dragging) {
            this.aAcceleration = (-1 * this.gravity / this.r) * sin(this.angle);

            // add acceleration to velocity
            this.aVelocity += this.aAcceleration;
            this.aVelocity *= this.damping;
            // add velocity to angle
            this.angle += this.aVelocity;
        }
    }

    // The methods below are for mouse interaction

    // This checks to see if we clicked on the pendulum ball
    clicked(mx, my) {
        let d = dist(mx, my, this.bob.x, this.bob.y);
        if (d < this.bobRadius) {
            this.dragging = true;
        }
    }

    // This tells us we are not longer clicking on the ball
    stopDragging() {
        this.aVelocity = 0; // No velocity once you let go
        this.dragging = false;
    }

    drag() {
        // If we are draging the ball, we calculate the angle between the
        // pendulum origin and mouse position
        // we assign that angle to the pendulum
        if (this.dragging) {
            let diff = p5.Vector.sub(this.location, createVector(mouseX, mouseY)); // Difference between 2 points
            this.angle = atan2(-1 * diff.y, diff.x) - radians(90); // Angle relative to vertical axis
        }
    }

    display() {
        // the bob
        this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle));
        this.bob.add(this.location);

        // the origin and arm
        line(this.location.x, this.location.y, this.bob.x, this.bob.y);
        ellipse(this.bob.x, this.bob.y, this.bobRadius);

    }

}

export default Pendulum;