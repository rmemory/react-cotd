import React, { Fragment } from 'react';
import PropTypes from  "prop-types";
import { TransitionGroup, CSSTransition} from 'react-transition-group';

import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderOrder = (fishKey) => {
		const fish = this.props.fishes[fishKey];
		const count = this.props.order[fishKey];

		const orderTransitionOptions = {
			classNames: "order",
			key: fishKey,
			timeout: {enter: 500, exit: 500}
		}

		// This will occur when firebase is restoring fishes state
		if (!fish) return null;

		if (fish.status === 'available') {
			return (
				<CSSTransition
					{...orderTransitionOptions}
				>
					<li key={fishKey}>
						<span>
							<TransitionGroup
								component="span"
								className="count">
								<CSSTransition
									classNames="count"
									key={count}
									timeout={{ enter: 500, exit: 500 }}>
									<span>{count}</span>
								</CSSTransition>
							</TransitionGroup>
							lbs {fish.name}: 
								{formatPrice(count * fish.price)}
								<button onClick={() => this.props.removeFromOrderStateFunc(fishKey)}>
									&times;
								</button>
						</span>
					</li>
				</CSSTransition>
			)
		} else {
			return (
				<CSSTransition
					{...orderTransitionOptions}
				>
					<li key={fishKey}>
						Sorry, {fish ? fish.name : 'fish'} is no longer available
					</li>
				</CSSTransition>
			)
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
					<TransitionGroup component="ul" className="order">
						{orderFishKeys.map((fishKey) => this.renderOrder(fishKey))}
					</TransitionGroup>
					<div className="total">
						Total:
						<strong>{formatPrice(total)}</strong>
					</div>
				</div>
			</Fragment>
		)
	}
}

Order.propTypes = {
	fishes: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number
	}).isRequired,
	order: PropTypes.object.isRequired
}

export default Order;