
let spring;
function setup(){
    createCanvas(480, 360);
    spring = new p5mimicry.Spring(width/2, 20, 100);
}

function draw(){
    background(220);
    spring.update();
    spring.display();
}
