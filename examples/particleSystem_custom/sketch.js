
let ps;
function setup(){
    createCanvas(480, 360);
    ps = new nocjs.ParticleSystem( createVector(width/2, 20) );
    
    
}   

function draw(){
    background(240);
    
    // applies a random force individually to each particle
    ps.applyParticleForce(6, 1)

    // Apply gravity force to all Particles
    let gravity = createVector(0, 4);
    ps.applyForce(gravity);
    
    // add a new particle in each animation loop
    ps.addParticle(ps.location, 2);
    // ps.run(); // commented out in favor of custom display
    ps.update();
    ps.filterParticles();

    // use the particle locations for a custom visualization
    noFill();
    beginShape();
    ps.particles.forEach(particle => {
        curveVertex(particle.location.x, particle.location.y)
    });
    endShape();

    

}