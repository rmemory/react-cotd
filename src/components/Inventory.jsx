import React, { Fragment } from 'react';
import AddFishForm from './AddFishForm.jsx';

class Inventory extends React.Component {
	render() {
		return (
			<Fragment>
				<div className="order">
					<h2>
						Inventory
					</h2>
					<AddFishForm addFishStateFunc={this.props.addFishStateFunc}/>
					<button onClick={this.props.loadSampleFishesStateFunc}>Load Sample Fishes</button>
				</div>
			</Fragment>
		)
	}
}

export default Inventory;