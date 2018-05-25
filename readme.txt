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

*** Firebase notes

It uses web sockets, which fire updates in real time rather than AJAX. This updates all current
users of the database. They offer an authentication feature, which we will use. They also offer a 
database which we will use. We won't be using the storage, hosting, or function features
of firebase.

Step 1) Go to https://firebase.google.com and create an account.

Step 2) Add Project. Give it a project name. Select a geographical location.

Step 3) Click on Getting Started, and for now select the Dismiss button to dismiss default
security rules requiring users to be authenticated. Stated differently, the Database->rules 
JS object should look like this to disable authentication (temporarily)

{
  "rules": {
    ".write": true,
    ".read": true
    }
}

Step 4) Click on Project Overview, select web app. This provides the API keys.

<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAH894Ddjcui6-XHVNMxoqYAmExsSOlxk4",
    authDomain: "cotd-rmemory.firebaseapp.com",
    databaseURL: "https://cotd-rmemory.firebaseio.com",
    projectId: "cotd-rmemory",
    storageBucket: "cotd-rmemory.appspot.com",
    messagingSenderId: "942796800086"
  };
  firebase.initializeApp(config);
</script>

We only need the innards of the config. But first, we need to create a local base.js file.


Step 5) Locally, create a base.js file. This is not a React component.

import Rebase from 're-base'; // Allows state to be be mirrored to firebase
import firebase from 'firebase'; // we pass the rebase to firebase

const firebaseApp = firebase.initializeApp();

Paste the config innards into the initializeApp args.

const firebaseApp = firebase.initializeApp(
	apiKey: "AIzaSyAH894Ddjcui6-XHVNMxoqYAmExsSOlxk4",
    authDomain: "cotd-rmemory.firebaseapp.com",
    databaseURL: "https://cotd-rmemory.firebaseio.com"
);

Now we need to create our rebase. 

const base = Rebase.createClass(firebaseApp.database());

The call to database, returns the actual database.

Export everything:

// This is a named export
export { firebaseApp }

// This is a default export
export default base;

The final base.js file looks like this:

import Rebase from 're-base'; // Allows state to be be mirrored to firebase
import firebase from 'firebase'; // we pass the rebase to firebase

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAH894Ddjcui6-XHVNMxoqYAmExsSOlxk4",
	authDomain: "cotd-rmemory.firebaseapp.com",
	databaseURL: "https://cotd-rmemory.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp }

// This is a default export
export default base;

Step 6) Integrate the database with the react app, where the state is contained. 
In our case this is App.jsx.

To do this, we need to wait until the app is on the page. And we need to use a 
lifecycle method: componentDidMount: The very first possible second when the component
displays on the page. 

https://reactjs.org/docs/react-component.html

Add this code to sync the fishes part of state (not including the order), and put it into
a "fishes" folder in the database, where the database has the same name as the storeId

	import base from '../base';

	componentDidMount() {
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	// clean up after the user exists the store to prevent memory leak
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

Step 7) Persist order information in local storage. This information doesn't require
any authentication. If you open the developer tools, open the Application tab, then 
Local Storage, and the URL, you will see all of the items stored in local storage.


Here is the updated code in app.

	/* Database methods */
	componentDidMount() {
		// Restore local storage first
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		// If this isn't a new store, meaning there is localStorageRef, then setState
		if (localStorageRef) {
			this.setState({order: JSON.parse(localStorageRef)});
		}

		// The refresh of local storage above will be immediate. The refresh
		// of the fishes will take some time. Fishes state will be empty until 
		// firebase restores the data, causing undefined when rendering the order
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	/* local storage methods 
		This method is called after the app has updated, which happens
		when the user has added items to his order */
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

*** To update any field that contains state data, we must use an onChange event handler.

handleChange = event => {
	console.log(event.currentTarget.value);
}
const { name, price, status, desc, image } = this.props.fish;
<input type="text" name="name" onChange={this.handleChange} value={name}/>

To make the actual edit in the input field, we must actually update the value in state.

*** For animation ...

import { TransitionGroup, CSSTransition} from 'react-transition-group';

In our case, we are adding animation to a list, so this ..

	<ul className="order">
		{orderFishKeys.map((fishKey) => this.renderOrder(fishKey))}
	</ul>

Becomes this ...

	<TransitionGroup component="ul" className="order">
		{orderFishKeys.map((fishKey) => this.renderOrder(fishKey))}
	</TransitionGroup>

And this:

	return <li key={fishKey}>
			{count} lbs {fish.name}: 
				{formatPrice(count * fish.price)}
				<button onClick={() => this.props.removeFromOrderStateFunc(fishKey)}>
					&times;
				</button>
			</li>

Becomes this ...

	return (
		<CSSTransition
			classNames="orders"
			key={fishKey}
			timeout={{enter: 250, exit: 250}}>
			<li key={fishKey}>
				{count} lbs {fish.name}: 
					{formatPrice(count * fish.price)}
					<button onClick={() => this.props.removeFromOrderStateFunc(fishKey)}>
						&times;
					</button>
			</li>
		</CSSTransition>
	)