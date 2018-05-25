import React, { Fragment } from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderOrder = (id) => {
		if (this.props.fishes[id].status === 'available') {
			return <li key={id}>
					{this.props.order[id]} lbs {this.props.fishes[id].name}: 
						{formatPrice(this.props.order[id] * this.props.fishes[id].price)}
					</li>
		} else {
			return <li key={id}>
					Sorry, {this.props.fishes[id] ? this.props.fishes[id].name : 'fish'} is no longer available
				   </li>
		}
	}

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((tally, id) => {
			const fish = this.props.fishes[id];
			const orderCount = this.props.order[id];
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
						{orderIds.map((id) => this.renderOrder(id))}
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