
let mover;
let path;
function setup(){
    createCanvas(480, 360);

    mover = new nocjs.Mover(20, 20, 40);
    mover.maxForce = 1.5;

    path = new nocjs.Path(0, height*0.25, width, height*0.75, 10);
}

function draw(){
    background(220);

    path.display();
    
    mover.follow(path);
    mover.update();
    mover.display();

    // make the mover go back to the start to keep following path
    if (mover.location.x > path.end.x + mover.mass) {
        mover.location.x = path.start.x - mover.mass;
        mover.location.y = path.start.y + (mover.location.y - path.end.y);
      }
    
}