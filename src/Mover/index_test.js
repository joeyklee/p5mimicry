const expect = require('chai').expect;
const Mover = require('./index');
// const jsdom = require('mocha-jsdom')
// const p5 = require('p5');

describe('mover class', function(){
    
    // jsdom({
    //     url: "http://localhost"
    //   });

    let mover;
    beforeEach(() => {
        // Create a new Rectangle object before every test.
        mover = new Mover(100, 100, 100);
      });

    it('should should work', function(){
        expect(true).to.be.true;
    });

    
})


// var expect = chai.expect;
