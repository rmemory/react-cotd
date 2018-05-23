import React, { Fragment } from 'react';

class Header extends React.Component {
	render() {
		return (
			<React.Fragment>
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
						<span>Fresh Daily</span>
					</h3>
				</header>
			</React.Fragment>
		)
	}
}

export default Header;