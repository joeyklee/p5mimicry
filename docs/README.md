# Learn to use p5mimicry

An open-source JavaScript library for p5.js based on [Dan Shiffman](https://shiffman.net/)'s [Nature of Code](https://natureofcode.com/) by @[Joey Lee](https://jk-lee.com/work/).

> Note: This is a forever-in-beta release project. Expect things to change often!

## Quickstart

Add these to your html file
```html
<!-- p5 libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
<!-- p5mimicry -->
<script src="https://unpkg.com/p5mimicry@latest/dist/p5mimicry.min.js"></script>
```

or 

If you're using a bundler like `webpack` or `browserify` you can `npm install`:

```sh
npm install p5 p5mimicry
```



## Getting Started

Include the latest p5mimicry.js and p5.js versions into your `index.html` file, then start making!:


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
    
  </head>
  <body>
      
    <!-- p5mimicry -->
    <!-- <script src="http://localhost:8080/p5mimicry.js"></script> -->
    <script src="https://unpkg.com/p5mimicry@latest/dist/p5mimicry.min.js"></script>
    <script>
    let mover;
    function setup(){
        createCanvas(480, 360);
        mover = new p5mimicry.Mover(width/2, height/2, 40);
    }
    function draw(){
        background(220);
        const target = createVector(mouseX, mouseY);
        mover.seek(target);
        mover.update();
        mover.display();
    }
    </script>
  </body>
</html>

```


## Examples

Find the list of nifty examples here: [/examples](/examples/index)

## Usage

Read the [usage](/usage) docs to learn more about the various nature of code `class`es that are part of this library: [/usage](/usage/index)


## Issues

Report any issues you might encounter here on the project's [GitHub Issues](https://github.com/joeyklee/p5mimicry/issues)


## Credits

This project is based on Dan Shiffman's Nature of Code book and [code examples](https://github.com/nature-of-code/noc-examples-p5.js). Credits go to Dan and all of the people who have contributed to building those examples. 

This library is being built to make it easier to quickly breath "life" into your p5.js projects by simulating natural systems and behaviors with code. Dan's Nature of Code helped me to discover the beauty and expressivenes of code and continues to be a major influence in my creative practice. 

I hope you can find inspiration in the natural world and find new ways to simulate them with code. Happy coding!

