const DEFAULTS = {
    mass: 40,
    frictionCoefficient: 0.01,
    dragCoefficient: 0.01,
    G: 0.4,
    maxForce: 0.2,
    maxSpeed: 2,
    debug: false,
    separationDistance: 40
}


class Mover {
    constructor(x, y, mass, options) {
        options = (typeof options !== 'undefined') ? options : {};

        this.location = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        this.mass = mass || options.mass || DEFAULTS.mass;
        this.maxForce = options.maxForce || DEFAULTS.maxForce;
        this.maxSpeed = options.maxSpeed || DEFAULTS.maxSpeed;
        this.frictionCoefficient = options.frictionCoefficient || DEFAULTS.frictionCoefficient;
        this.dragCoefficient = options.dragCoefficient || DEFAULTS.dragCoefficient;
        this.separationDistance = options.separationDistance || this.mass / 2 || DEFAULTS.separationDistance;
        this.G = options.G || DEFAULTS.G;

        this.debug = options.debug || DEFAULTS.debug;
    }

    applyFriction(frictionCoefficient) {
        // friction = -1 * N * μ * velocity
        const frictionMag = frictionCoefficient || this.frictionCoefficient
        // fricition is operating in the opposite direction
        const f = this.velocity.copy();
        f.mult(-1);
        f.normalize();
        // scale the friction by the friction coefficient
        f.mult(frictionCoefficient);

        // here we directly apply friction
        this.applyForce(f);
    }

    applyResistance(dragCoefficient) {
        // fluid resistance = (the opposite direction of velocity) * speed^2 * drag coefficient
        const f = this.velocity.copy();

        // get the speed before normalizing
        const speed = f.mag();
        // get the opposite direction
        f.mult(-1);
        // normalize;
        f.normalize();

        const dragCoeff = dragCoefficient || this.dragCoefficient;
        const strength = dragCoeff * speed * speed;
        f.mult(strength);

        this.applyForce(f);
    }

    follow(path) {
        let predict = this.velocity.copy();
        predict.normalize();
        predict.mult(50); // predict a position 50px ahead
        let predictLocation = p5.Vector.add(this.location, predict);

        // look at the line segment;
        let a = path.start;
        let b = path.end;

        // get the normal point to the line
        let normalPoint = this.getNormalPoint(predictLocation, a, b);
        // find the target point a bit further ahead of normal
        let dir = p5.Vector.sub(b, a);
        dir.normalize();
        dir.mult(10); // arbitrary 10 pixels ahead

        let target = p5.Vector.add(normalPoint, dir);

        // How far away are we from the path?
        let distance = p5.Vector.dist(predictLocation, normalPoint);
        // Only if the distance is greater than the path's radius do we bother to steer

        // FROM NOC
        if (distance > path.radius) {
            this.seek(target);
        }

        // Seek always
        // this.seek(target)
    }

    followComplex(p) {
        // Predict location 50 (arbitrary choice) frames ahead
        // This could be based on speed
        let predict = this.velocity.copy();
        predict.normalize();
        predict.mult(20);
        let predictLoc = p5.Vector.add(this.location, predict);

        // Now we must find the normal to the path from the predicted location
        // We look at the normal for each line segment and pick out the closest one

        let normal = null;
        let target = null;
        let worldRecord = 1000000; // Start with a very high record distance that can easily be beaten

        // Loop through all points of the path
        for (let i = 0; i < p.points.length - 1; i++) {

            // Look at a line segment
            let a = p.points[i];
            let b = p.points[i + 1];
            //println(b);

            // Get the normal point to that line
            let normalPoint = this.getNormalPoint(predictLoc, a, b);

            if (normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x) || normalPoint.y < min(a.y, b.y) || normalPoint.y > max(a.y, b.y)) {
                normalPoint = b.copy();
            }

            // How far away are we from the path?
            let distance = p5.Vector.dist(predictLoc, normalPoint);
            // Did we beat the record and find the closest line segment?
            if (distance < worldRecord) {
                worldRecord = distance;
                // If so the target we want to steer towards is the normal
                normal = normalPoint;

                // Look at the direction of the line segment so we can seek a little bit ahead of the normal
                let dir = p5.Vector.sub(b, a);
                dir.normalize();
                // This is an oversimplification
                // Should be based on distance to path & velocity
                dir.mult(10);
                target = normalPoint.copy();
                target.add(dir);
            }
        }

        // Only if the distance is greater than the path's radius do we bother to steer
        if (worldRecord > p.radius && target !== null) {
            this.seek(target);
        }

        // Draw the debugging stuff
        // const debug = true;
        if (this.debug) {
            // Draw predicted future location
            stroke(255);
            fill(200);
            line(this.location.x, this.location.y, predictLoc.x, predictLoc.y);
            ellipse(predictLoc.x, predictLoc.y, 4, 4);

            // Draw normal location
            stroke(255);
            fill(200);
            ellipse(normal.x, normal.y, 4, 4);
            // Draw actual target (red if steering towards it)
            line(predictLoc.x, predictLoc.y, normal.x, normal.y);
            if (worldRecord > p.radius) fill(255, 0, 0);
            noStroke();
            ellipse(target.x, target.y, 8, 8);
        }
    }

    // Implementing Reynolds' flow field following algorithm
    // http://www.red3d.com/cwr/steer/FlowFollow.html
    followFlowField(flowField) {
        // What is the vector at that spot in the flow field?
        let desired = flowField.lookup(this.location);
        // Scale it up by maxspeed
        desired.mult(this.maxSpeed);
        // Steering is desired minus velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce); // Limit to maximum steering force
        this.applyForce(steer);
    }

    // A function to get the normal point from a point (p) to a line segment (a-b)
    // This function could be optimized to make fewer new Vector objects
    getNormalPoint(p, a, b) {
        // Vector from a to p
        let ap = p5.Vector.sub(p, a);
        // Vector from a to b
        let ab = p5.Vector.sub(b, a);
        ab.normalize(); // Normalize the line
        // Project vector "diff" onto line by using the dot product
        ab.mult(ap.dot(ab));
        let normalPoint = p5.Vector.add(a, ab);
        return normalPoint;
    }

    attract(attractor, locationProp, massProp, attractionConstant) {
        // gravitational attraction = (G * m1 * m2) / (distance * distance)
        // get the direction of attraction
        let lProp = locationProp || 'location';
        let mProp = massProp || attractor.mass;
        const f = p5.Vector.sub(this.location, attractor[lProp])
        // get the distance between those objects
        let distance = f.mag();
        let G = attractionConstant || DEFAULTS.G;
        // no matter how close or far, the lowest distance is 5 and highest is 25
        distance = constrain(distance, 5.0, 25.0);

        // normalize the force so we can scale it by the strength of attraction
        f.normalize();
        const strength = (G * this.mass * attractor[mProp]) / (distance * distance);
        f.mult(strength);

        return f;
    }

    repel(attractor, locationProp, massProp, attractionConstant) {
        // gravitational attraction = (G * m1 * m2) / (distance * distance)
        // get the direction of attraction
        let lProp = locationProp || 'location';
        let mProp = massProp || attractor.mass;
        const f = p5.Vector.sub(this.location, attractor[lProp])
        // get the distance between those objects
        let distance = f.mag();
        let G = attractionConstant || DEFAULTS.G;
        // no matter how close or far, the lowest distance is 5 and highest is 25
        distance = constrain(distance, 5.0, 25.0);

        // normalize the force so we can scale it by the strength of attraction
        f.normalize();
        const strength = (G * this.mass * attractor[mProp]) / (distance * distance);
        // REPEL: by adding -1
        f.mult(strength * -1);

        return f;
    }


    seek(target) {
        const desired = p5.Vector.sub(target, this.location);

        // get there as fast as the mover is able...
        desired.setMag(this.maxSpeed);

        // steering = desired location minus the velocity;
        const steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

    arrive(target) {
        const desired = p5.Vector.sub(target, this.location);
        let d = desired.mag();

        // once the mover is w/in 100 pixels
        // scale the max speed down
        if (d < 100) {
            let m = map(d, 0, 100, 0, this.maxSpeed);
            desired.setMag(m);
        } else {
            // get there as fast as the mover is able...
            desired.setMag(this.maxSpeed);
        }

        // steering = desired location minus the velocity;
        const steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

    // Separation
    // Method checks for nearby vehicles and steers away
    separate(vehicles) {
        let desiredseparation = this.separationDistance;
        let sum = createVector();
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < vehicles.length; i++) {
            let d = p5.Vector.dist(this.location, vehicles[i].location);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.location, vehicles[i].location);
                diff.normalize();
                diff.div(d); // Weight by distance
                sum.add(diff);
                count++; // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxSpeed);
            // Implement Reynolds: Steering = Desired - Velocity
            sum.sub(this.velocity);
            sum.limit(this.maxForce);
        }
        return sum;
    }

    applyForce(force) {
        // acceleration = force/mass
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        // velocity
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        // location
        this.location.add(this.velocity);
        // reset the acceleration on each iteration
        this.acceleration.mult(0);
    }

    checkEdges() {
        if (this.location.x > width - this.mass) {
            this.location.x = width - this.mass;
            this.velocity.x *= -1;
        } else if (this.location.x < this.mass) {
            this.location.x = this.mass;
            this.velocity.x *= -1;
        }

        if (this.location.y > height - this.mass) {
            this.location.y = height - this.mass;
            this.velocity.y *= -1;
        } else if (this.location.y < this.mass) {
            this.location.y = this.mass;
            this.velocity.y *= -1;
        }
    }

    // Wraparound
    borders() {
        if (this.location.x < -this.mass) this.location.x = width + this.mass;
        if (this.location.y < -this.mass) this.location.y = height + this.mass;
        if (this.location.x > width + this.mass) this.location.x = -this.mass;
        if (this.location.y > height + this.mass) this.location.y = -this.mass;
    }



    display() {
        const angle = this.velocity.heading();
        push();
        translate(this.location.x, this.location.y);
        rotate(angle);
        ellipse(0, 0, this.mass / 2, this.mass / 2);
        line(0, 0, this.mass / 2, 0);
        pop();
    }
}

export default Mover;