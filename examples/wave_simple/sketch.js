let wave;
function setup() {
    createCanvas(480, 360);
    
    wave = new nocjs.Wave(1, 0.6, -0.05, 200, 40, 10)
    background(250);
}

function draw() {
    
    background(250);
    wave.update();

    // display the wave
    push();
    translate(width/2, height/2);
    wave.display();
    
    // draw the line with the points
    beginShape();
    wave.wavePoints.forEach(item => {
        vertex(item.x, item.y)
    })
    endShape()

    pop();

}
