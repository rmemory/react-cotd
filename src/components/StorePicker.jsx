import React, { Fragment } from 'react';

class StorePicker extends React.Component {
	render() {
		return (
			<React.Fragment>
				{ /* This is a store picker*/  }
				<form className="store-selector">
					<h2>Please Enter a Store</h2>
					<input type="text" required placeholder="Store Name"/>
					<button type="submit">Visit Store ➞</button>
				</form>
			</React.Fragment>
		)
	}
}

export default StorePicker;