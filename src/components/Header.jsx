import React, { Fragment } from 'react';
import PropTypes from  "prop-types";

/* Note that when you have a stateless component like this one,
	'this' disappears (its just a function), and it takes the 
	args like props via parameters, and note the removed curly braces
	and replaced with regular parenthesis, and in this case we 
	are destructuring the props into its components, in this case
	only tagline, which saves us from using props.tagline below */
const Header = ({tagline}) => (
	<Fragment>
		<header className="top">
			<h1>
				Catch 
				<span className="ofThe">
					<span className="of">
						of
					</span>
					<span className="the">
						the
					</span>
				</span> 
				Day
			</h1>
			<h3 className="tagline">
				{/* 'this' points at the component instance */}
				<span>{tagline}</span>
			</h3>
		</header>
	</Fragment>
);

Header.propTypes = {
	tagline: PropTypes.string.isRequired
}

// Because this is a stateless component, don't need this
// class Header extends React.Component {
// 	render() {
// 		return (
// 		)
// 	}
// }

export default Header;