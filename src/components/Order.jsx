import React, { Fragment } from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
	renderOrder = (fishKey) => {
		const fish = this.props.fishes[fishKey];
		const count = this.props.order[fishKey];

		// This will occur when firebase is restoring fishes state
		if (!fish) return null;

		if (fish.status === 'available') {
			return <li key={fishKey}>
					{count} lbs {fish.name}: 
						{formatPrice(count * fish.price)}
						<button onClick={() => this.props.removeFromOrderStateFunc(fishKey)}>
							&times;
						</button>
					</li>
		} else {
			return <li key={fishKey}>
					Sorry, {fish ? fish.name : 'fish'} is no longer available
				   </li>
		}
	}

	render() {
		const orderFishKeys = Object.keys(this.props.order);
		const total = orderFishKeys.reduce((tally, fishKey) => {
			const fish = this.props.fishes[fishKey];
			const orderCount = this.props.order[fishKey];
			const isAvailable = fish && fish.status === 'available';

			if (isAvailable) {
				return tally + (orderCount * fish.price);
			} else {
				return tally;
			}
		}, 0);

		return (
			<Fragment>
				<div className="order-wrap">
					<h2>Order</h2>
					<ul className="order">
						{orderFishKeys.map((fishKey) => this.renderOrder(fishKey))}
					</ul>
					<div className="total">
						Total:
						<strong>{formatPrice(total)}</strong>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Order;