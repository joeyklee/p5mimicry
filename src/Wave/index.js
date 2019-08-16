class Wave {
    constructor(startAngle, angularVelocity, angularAcceleration, waveWidth, amplitude, resolution){
       this.startAngle =  startAngle || 0;
       this.angularVelocity = angularVelocity || 0.20;
       this.angularAcceleration = angularAcceleration || 0.015;
       this.amplitude = amplitude || 50;
       this.waveWidth = waveWidth || 100;
       this.angle = null;
       this.wavePoints = [];
        this.resolution = resolution || 24;

        this.init();
    }

    init(){
        this.startAngle += this.angularAcceleration;
        this.angle = this.startAngle;
        
        for (let x = 0; x <= this.waveWidth; x += this.resolution) {
            let y = map(sin(this.angle), -1, 1,-this.amplitude/2, this.amplitude/2);
            this.wavePoints.push( {x, y})
            this.angle += this.angularVelocity;
        }

    }

    update(){
        
        this.startAngle += this.angularAcceleration;
        this.angle = this.startAngle;
        let counter = 0;
        for (let x = 0; x <= this.waveWidth; x += this.resolution) {
            let y = map(sin(this.angle), -1, 1, -this.amplitude/2, this.amplitude/2);
            this.wavePoints[counter] = {x, y}
            this.angle += this.angularVelocity;
            counter++;
        }
    }

    display(){
        this.wavePoints.forEach(wavePoint => {
            stroke(164);
            fill(255, 50);
            strokeWeight(2);
            ellipse(wavePoint.x, wavePoint.y, 10, 10);
        })
    }
}

module.exports = Wave;