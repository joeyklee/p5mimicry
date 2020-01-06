
let ps;
function setup(){
    createCanvas(480, 360);
    ps = new p5mimicry.ParticleSystem( createVector(width/2, 20) );
    
    
}   

function draw(){
    blendMode(BLEND)
    background(240);

    // applies a random force individually to each particle
    ps.applyParticleForce(6, 2)

    // Apply gravity force to all Particles
    let gravity = createVector(0, 4);
    ps.applyForce(gravity);
    

    ps.addParticle(ps.location, 2);
    
    blendMode(BURN)
    fill(255, 0,0)
    ps.run();
}