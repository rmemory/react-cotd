import React, { Fragment } from 'react';

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

	// clean up after the user exists the store to prevent memory leak
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	/* local storage methods 
		This method is called after the app has updated, which happens
		when the user has added items to his order */
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	addFish = (fish) => {
		const copyOfFishState = {...this.state.fishes};
		copyOfFishState[`fish-${Date.now()}`] = fish;
		// All pages that refer to fishes will be updated
		this.setState({
			fishes: copyOfFishState
		});
	}

	addToOrder = (fishName) => {
		const copyOfOrderState = {...this.state.order};
		copyOfOrderState[fishName] = copyOfOrderState[fishName] + 1 || 1;
		this.setState({
			order: copyOfOrderState
		})
	}

	loadSampleFishes = () => {
		// dont call this.setState in a loop
		this.setState({fishes: sample_fishes});
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
										fishObject={this.state.fishes[fishKey]}
										addToOrderStateFunc={this.addToOrder}/>
							})}
						</ul>
					</div>
					<Order 
						fishes={this.state.fishes} 
						order={this.state.order}/>
					<Inventory 
						addFishStateFunc={this.addFish} 
						loadSampleFishesStateFunc={this.loadSampleFishes}
						editFishStateFunc={this.editFish}
						fishes={this.state.fishes} />
				</div>
			</Fragment>
		)
	}
}

export default App;