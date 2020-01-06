let movers =[];
let flowField;

function setup(){
    createCanvas(480, 360);

    movers = [... new Array(50).fill(null)].map(item => new p5mimicry.Mover(random(width), random(height), 10) )
    flowField = new p5mimicry.FlowField(20);
    flowField.init('perlin');
}

function draw(){
    background(240, 240, 240, 10);

    // flowField.display();
    
    movers.forEach( (mover, idx) => {
        mover.followFlowField(flowField);
        mover.update();
        // mover.display();   
        if(idx%2){
            stroke(231, 76, 60)
        } else if(idx %3){
            stroke(52, 152, 219)
        } else {
            stroke( 244, 208, 63)
        }
        line(mover.location.x, mover.location.y, mover.location.x + cos(frameCount/30) * 10, mover.location.y + cos(frameCount/30))
        mover.borders(); 
    })

}

