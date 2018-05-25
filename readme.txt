Topics:

*** Each component must minimally do the following:

import React from 'react';

class MyComponent extends React.Component {
	render() {
		return (insert JSX code)
	}
}

export default StorePicker;

*** Methods internal to components don't have access to the Component via 
'this', unless they do this:

constructor() {
	super();
	this.myMethod = this.myMethod.bind(this);
}

Or more effciently, just assign the method to a Component property
myMethod = (someArg) => {
}

*** Data is stored in "state", using the this.setState() API.

	someStateFunc = (someData) => {
		// Make a copy of the state
		const copyOfStateVar = {...this.state.theVar};

		// Add the new data
		copyOfStateVar[someNewIndex] = someData;


		// setState
		this.setState({
			theVar: copyOfStateVar
		});
	}

*** Data is passed between component using props, which can be either 
data or callbacks.

*** Gain access to the DOM element using a "ref"

	someElementRef = React.createRef();

	<input name="name" ref={this.someElementRef} type="text" placeholder="Name"/>

*** Events in React are Synthetic Events

https://reactjs.org/docs/events.html

<button onClick={this.someFunction}>Do Stuff</button>

Note, that I didn't add paranthesis, as this would cause the callback to be called
immeidately, causing a stack overflow. Also note that calling state callbacks 
should be done from within the local someFunction, and not directly.

*** Use className instead of class and defaultValue instead of value in input
elements.

	<li className="menu-fish">
		<img src={image} alt={name}/>
		<h3 className="fish-name">
			{name}
			<span className="price">{formatPrice(price)}</span>
		</h3>
		<p>{desc}</p>
		<button>Add To Cart</button>
	</li>


	<input 
		type="text"
		ref={this.storeNameInput}
		required 
		placeholder="Store Name" 
		defaultValue={getFunName()}/>

'*** To manually call a function, via the console. 

First select the correct component using the react tab
Next, select $r.myFunction(someArg)


*** All list items must have a unique key attribute:

	return <li key={id}>
			Sorry, {this.props.fishes[id] ? this.props.fishes[id].name : 'fish'} is no longer available
			</li>
