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

	addFish = (fish, name='') => {
		const copyOfFishState = {...this.state.fishes};
		const key = name === '' ? `fish-${Date.now()}` : name;
		copyOfFishState[key] = fish;
		// All pages that refer to fishes will be updated
		this.setState({
			fishes: copyOfFishState
		});
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
							{Object.keys(this.state.fishes).map((fishName) => {
								return <Fish 
										key={fishName} 
										fishObject={this.state.fishes[fishName]}/>
							})}
						</ul>
					</div>
					<Order/>
					<Inventory 
						addFishStateFunc={this.addFish} 
						loadSampleFishesStateFunc={this.loadSampleFishes}/>
				</div>
			</Fragment>
		)
	}
}

export default App;