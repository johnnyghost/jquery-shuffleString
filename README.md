# jQuery.shuffleString.js

A jQuery plugin to shuffle a string. This could be used as a string and also as an hover mouse event.

## Usage

In the html we need to define the type of shuffle and the data to be shuffled, so we use ```data-shuffle-type``` to define the desired
shuffle type(We can choose between ```hover``` and ```slide```) and ```data-shuffle-data``` to pass the data to be shuffled.


```html

<body>
	<h2 data-shuffle-type="hover" data-shuffle-data="hello stranger!!!">hello</h1>
	...
```

```javascript

$('body').shuffleString();

```
We could also pass options to the plugin in a object type.

```javascript

$('body').shuffleString({animation: 400});

```
You can see both demos here. hover-demo and slide-demo.

## Options

### animationSpeed
The speed of the animation when shuffling the chars.

### slideDuration
If the shuffle is ```slide``` type, you can choose the duration of each transition.

### loop
If the shuffle is ```slide``` type, then you can choose if you want to loop.

## License

jQuery-shuffleString is released under a MIT License.
