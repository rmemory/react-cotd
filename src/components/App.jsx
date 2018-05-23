import React, { Fragment } from 'react';

import Header from './Header.jsx';
import Order from './Order.jsx';
import Inventory from './Inventory.jsx';

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<div className="catch-of-the-day">
					<div className="menu">
						{/* String props, like this one can be just quotes. Other
							kinds of props like numbers must be in curly braces */}
						<Header tagline="Fresh Seafood Daily"/>
					</div>
					<Order/>
					<Inventory/>
				</div>
			</Fragment>
		)
	}
}

export default App;