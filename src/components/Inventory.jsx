import React, { Fragment } from 'react';
import PropTypes from  "prop-types";

import EditFishForm from './EditFishForm.jsx';
import AddFishForm from './AddFishForm.jsx';

class Inventory extends React.Component {
	render() {
		return (
			<Fragment>
				<div className="order">
					<h2>
						Inventory
					</h2>
					{Object.keys(this.props.fishes).map(key => {
						return <EditFishForm 
							key={key}
							fishKey={key}
							fish={this.props.fishes[key]}
							editFishStateFunc={this.props.editFishStateFunc}
							deleteFishStateFunc={this.props.deleteFishStateFunc}/>
					})}
					<AddFishForm addFishStateFunc={this.props.addFishStateFunc}/>
					<button onClick={this.props.loadSampleFishesStateFunc}>
						Load Sample Fishes
					</button>
				</div>
			</Fragment>
		)
	}
}

Inventory.propTypes = {
	fishes: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number
	}).isRequired,
	editFishStateFunc: PropTypes.func.isRequired,
	deleteFishStateFunc: PropTypes.func.isRequired
}


export default Inventory;