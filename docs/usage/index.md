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