import React, { Fragment } from 'react';

import Header from './Header.jsx';
import Order from './Order.jsx';
import Inventory from './Inventory.jsx';
import Fish from './Fish.jsx';

import sample_fishes from '../sample-fishes';

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

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
						loadSampleFishesStateFunc={this.loadSampleFishes}/>
				</div>
			</Fragment>
		)
	}
}

export default App;