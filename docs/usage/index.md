# Usage

Here you'll find the documentation for the `class`es and functions that are available to you using `nocjs`.

## Mover

```js
new nocjs.Mover(x?, y?, mass?, options?)
```

**Parameters**
* **x**: the starting x location
* **y**: the starting y location
* **mass**: the mass of the Mover
* options?: options param for options

**Defaults/Options**
```js
const DEFAULTS = {
    mass: 40,
    frictionCoefficient: 0.01,
    dragCoefficient: 0.01,
    G: 0.4,
    maxForce: 0.2,
    maxSpeed: 2,
    debug: false,
    separationDistance: 40
}
```

**Methods**

**.applyForce()**:
> 
> *Applies a force to `this.acceleration`*
```js
.applyForce(vector?)
```
**Parameters**
* **vector?**: a p5.Vector


**.update()**:
>
> *Applies Euler integration*
```js
.update()
```
**Parameters**
* (none)

**.display()**:
>
> Renders the Mover as a circle with a line pointing in the directino of movement
```js
.display()
```
**Parameters**
* (none)


**.seek(vector?)**:
>
> applies the Reynold's seek based on an input vector location
```js
.seek(vector?)
```
**Parameters**
* **vector?**: a p5.Vector


**.arrive(vector?)**:
>
> applies the Reynold's arrive based on an input vector location
```js
.arrive(vector?)
```
**Parameters**
* **vector?**: a p5.Vector


**.attract(attractor?, locationProp?, massProp?, attractionConstant?)**:
>
> applies an gravitational attraction
```js
.attract(attractor?, locationProp?, massProp?, attractionConstant?)
```
> **Parameters**:
* attractor?: Mover or class with location and mass 
* locationProp?: property for the location, defaults to 'location'
* massProp?:  property for the mass, defaults to 'mass'
* attractionConstant?: value for attraction, required


**.repel(repeller?, locationProp?, massProp?, attractionConstant?)**
>
> applies an gravitational repulsion
```js
.repel(repeller?, locationProp?, massProp?, repulsionConstant?)
```
**Parameters**:
* repeller?: Mover or class with location and mass 
* locationProp?: property for the location, defaults to 'location'
* massProp?:  property for the mass, defaults to 'mass'
* repellerConstant?: value for repulsion, required


**.applyFriction()**
>
> applies a friction force
```js
.applyFriction()
```
**Parameters**:
* none



**.applyResistance()**
> 
> applies a resistance force
```js
.applyResistance()
```
**Parameters**:
* none


**.follow(Path?)**:
>
> given an input Path object, follows from left to right
```js
.follow(Path?)
```
**Parameters**:
* Path?: A nocjs.Path class


**.followComplex(PathComplex?)**
> given an input PathComplex object, follows the pathway however the Mover manages to.
```js
.followComplex(PathComplex?)
```
**Parameters**:
* Path?: A nocjs.Path class

**.checkEdges()**
> checks the screen edges and doesn't allow the Movers to jump out
```js
.checkEdges()
```
**Parameters**:
* none

**.separate(Movers?)**
> separates the given movers
```js
.separate(Movers?)
```
**Parameters**:
* Movers: an array of Mover 
**Returns**:
* vector: a separation force. Use .applyForce() on the return value to apply that force.

**.contain(vector?, containerWidth, containerHeight)**
> contains the mover
```js
.contain(vector, containerWidth, containerHeight)
```
**Parameters**:
* vector: a p5.Vector object specifying the center of the container
* containerWidth: the container width from center
* containerHeight: the container height from center


**.cohesion(movers)**
> calculates an cohesion force for an array of movers
```js
.align(movers)
```
**Parameters**:
* movers: an array of movers
**returns**:
* steering force

**.align(movers)**
> calculates an alignment force for an array of movers
```js
.align(movers)
```
**Parameters**:
* movers: an array of movers
**returns**:
* steering force


**.flock(movers, flockOptions?)**
> applies a flocking behavior to an array of movers
> Uses .separate(), .align(), .cohesion() under the hood
```js
.flock(movers, flockOptions?)
```
**Parameters**:
* movers: an array of movers
* flockOptions?: an object containing: 
* ```{sepMultiplier:1.5, aliMultiplier:1, cohMultiplier:1}```





## Pendulum

```js
new nocjs.Pendulum(x, y, armLength, bobRadius, options ={})
```

docs coming soon


## Spring

```js
new nocjs.Spring(x, y, length, options = {}, bobOptions = {})
```

docs coming soon


## Path

```js
new nocjs.Path()
```

docs coming soon

## PathComplex

```js
new nocjs.PathComplex()
```

docs coming soon

## ParticleSystem


```js
new nocjs.ParticleSystem(vectorLocation?)
```

docs coming soon