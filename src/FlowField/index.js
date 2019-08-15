const DEFAULTS = {
    noiseSeedValue: 10000
}

class FlowField {
    constructor(resolution, options = {}) {
        options = (typeof options !== 'undefined') ? options : {};
        // how large is each cell in the flow field
        this.resolution = resolution;
        this.noiseSeedValue = options.noiseSeedValue || Math.floor(random(DEFAULTS.noiseSeedValue));

        // Determine the number of columns and rows based on the sketch's w and h
        this.cols = width / this.resolution;
        this.rows = height / this.resolution;

        // A flowfield is a 2-D array of p5Vectors
        this.field = this.make2DArray(this.cols);

    }

    make2DArray(nCols) {
        let array = [];
        for (let i = 0; i < nCols; i++) {
            array[i] = [];
        }
        return array;

    }

    init(kind) {
        // init with different kinds of flow fields
        switch (kind) {
            case 'perlin':
                this.makePerlin();
                return;
            case 'random':
                this.makeRandom();
                return;
            case 'randomGaussian':
                this.makeRandomGaussian();
                return;
            case 'default':
                this.makePerlin();
                return;
        }
    }

    makeRandom(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let theta = map(random(), 0, 1, 0, TWO_PI);
                this.field[i][j] = createVector(cos(theta), sin(theta));
            }
        }
    }

    makeRandomGaussian(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let theta = map(randomGaussian(), 0, 1, 0, TWO_PI);
                this.field[i][j] = createVector(cos(theta), sin(theta));
            }
        }
    }

    makePerlin() {
        noiseSeed(this.noiseSeedValue);

        let xoff = 0;

        for (let i = 0; i < this.cols; i++) {
            let yoff = 0;
            for (let j = 0; j < this.rows; j++) {
                let theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
                this.field[i][j] = createVector(cos(theta), sin(theta));
                yoff += 0.1;
            }
            xoff += 0.1;
        }
    }

    lookup(lookup) {
        let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
        let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
        //println(lookup.x);
        return this.field[column][row].copy();
    }

    display() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
            }
        }
    }

    // Renders a vector object 'v' as an arrow and a location 'x,y'
  drawVector(v, x, y, scayl) {
    push();
    let arrowsize = 4;
    // Translate to location to render vector
    translate(x, y);
    stroke(200, 100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    let len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  }

}

module.exports = FlowField;