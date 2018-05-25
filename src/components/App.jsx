import React, { Fragment } from 'react';
import PropTypes from  "prop-types";

import Header from './Header.jsx';
import Order from './Order.jsx';
import Inventory from './Inventory.jsx';
import Fish from './Fish.jsx';

import sample_fishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	/* 
	 * Database interface, via lifecycle methods 
	 */

	// Update state from database after component is mounted
	componentDidMount() {
		// Restore local storage first, using store id as key
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		// If this isn't a new store, meaning there is localStorageRef, then setState
		if (localStorageRef) {
			this.setState({order: JSON.parse(localStorageRef)});
		}

		// The refresh of local storage above will be immediate. The refresh
		// of the fishes will take some time. Fishes state will be empty until 
		// firebase restores the data, causing undefined when rendering the order
		// We check for a null fish state in Order.jsx
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	// clean up after the user exits the component to prevent memory leak
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// Update local storage after user changes data, in this case only local
	// storage needs to be updated, because firebase is automatically sync'd 
	// via the base.syncState above
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	/*
	 *	State methods
	 */ 

	addFish = (fish) => {
		const copyOfFishState = {...this.state.fishes};
		copyOfFishState[`fish-${Date.now()}`] = fish;
		// All pages that refer to fishes will be updated
		this.setState({
			fishes: copyOfFishState
		});
	}

	editFish = (key, updatedFishObject) => {
		const copyOfFishState = {...this.state.fishes};
		copyOfFishState[key] = updatedFishObject;
		this.setState({
			fishes: copyOfFishState
		});
	}

	deleteFish = (key) => {
		const copyOfFishState = {...this.state.fishes};
		copyOfFishState[key] = null; // Required by firebase
		this.setState({
			fishes: copyOfFishState
		});
	}

	loadSampleFishes = () => {
		// dont call this.setState in a loop
		this.setState({fishes: sample_fishes});
	}

	addToOrder = (fishKey) => {
		const copyOfOrderState = {...this.state.order};
		copyOfOrderState[fishKey] = copyOfOrderState[fishKey] + 1 || 1;
		this.setState({
			order: copyOfOrderState
		})
	}

	removeFromOrder = (fishKey) => {
		const copyOfOrderState = {...this.state.order};
		delete copyOfOrderState[fishKey]; // We can use delete because this isn't firebase
		this.setState({
			order: copyOfOrderState
		})
	}

	render() {
		return (
			<Fragment>
				<div className="catch-of-the-day">
					<div className="menu">
						{/* String props, like this one can be just quotes. Other
							kinds of props like numbers must be in curly braces */}
						<Header tagline="Fresh Seafood Daily"/>
						<ul className="fishes">
							{Object.keys(this.state.fishes).map((fishKey) => {
								return <Fish 
										key={fishKey} 
										fishKey={fishKey}
										fish={this.state.fishes[fishKey]}
										addToOrderStateFunc={this.addToOrder}/>
							})}
						</ul>
					</div>
					<Order 
						fishes={this.state.fishes} 
						order={this.state.order}
						removeFromOrderStateFunc={this.removeFromOrder}/>
					<Inventory 
						addFishStateFunc={this.addFish}
						deleteFishStateFunc={this.deleteFish}  
						loadSampleFishesStateFunc={this.loadSampleFishes}
						editFishStateFunc={this.editFish}
						fishes={this.state.fishes} />
				</div>
			</Fragment>
		)
	}
}

App.propTypes = {
	match: PropTypes.object.isRequired
}

export default App;