class SteeringPerceptron {
    constructor(n, c){
      this.weights = new Array(n);
      
      for(let i = 0; i < this.weights.length; i++){
        this.weights[i] = random(0, 1);
      }
      
      this.c = 0.001;
      
    }
    
    feedforward(inputs){
      // inputs are forces here!
     let sum = createVector();
    
      for(let i = 0; i < this.weights.length; i++){
        inputs[i].mult(this.weights[i]);
        sum.add(inputs[i]);
      }
      
      // no activation function here
      // return this.activate(sum)
      return sum;
    
    }

    // activate(sum){
    //   if(sum > 0) return 1;
    //   else return -1;
    // }
    
    train(inputs, error){
    // inputs are forces here!
      for(let i = 0; i < this.weights.length; i++){
      
        this.weights[i] += this.c * error.x * inputs[i].x;
        this.weights[i] += this.c * error.y * inputs[i].y;
        this.weights[i] = constrain(this.weights[i], 0, 1);
      } 
    
    }
  
  }

  const instance = (targetNumber) => new SteeringPerceptron(targetNumber);

  module.exports = instance;