
let ps;
function setup(){
    createCanvas(480, 360);
    ps = new nocjs.ParticleSystem( createVector(width/2, 20) );
}   

function draw(){
    background(240);
    
    // applies a random force individually to each particle
    ps.applyParticleForce(6, 2)
    
    // Apply gravity force to all Particles
    let gravity = createVector(0, 4);
    ps.applyForce(gravity);
    
    // location, mass, maxForce, decayRate, lifespan
    ps.addParticle(ps.location, 2, 3, 2, 200);

    ps.run();
}