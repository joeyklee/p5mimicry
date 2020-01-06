
let mover;
let path;

// let coords = [[20, 320],[66, 28],[142, 191],[168, 105],[251, 300],[279, 94],[331, 124],[380, 28]]
let coords = [[23, 26],[265, 96],[451, 28],[379, 167],[439, 326],[229, 225],[32, 332],[92, 169],[23, 27]]
// let coords = [[25,25],[241,60],[388,19],[450,171],[414,332],[237,275],[128,334],[23,173],[40,24]]

function setup(){
    createCanvas(480, 360);

    mover = new p5mimicry.Mover(10, 10, 40, {maxForce:5, debug:true});

    path = new p5mimicry.PathComplex(2);
    coords.forEach(coord => {path.addPoint(coord[0], coord[1])})

}

function draw(){
    background(220);

    path.display();
    
    mover.followComplex(path);
    mover.update();
    mover.display();

    
}

