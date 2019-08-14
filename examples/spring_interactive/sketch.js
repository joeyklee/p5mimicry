
let spring;
function setup(){
    createCanvas(480, 360);
    spring = new noc.Spring(width/2, 20, 100, {k: 0.75}, {mass: 100});
}

function draw(){
    background(220);
    spring.bob.drag(mouseX, mouseY);
    spring.update();
    spring.display();
}

function mousePressed(){
    spring.bob.clicked(mouseX, mouseY);
}

function mouseReleased(){
    spring.bob.stopDragging();
}