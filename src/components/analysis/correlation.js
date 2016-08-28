import React, { Component } from 'react';

export default class Correlation extends Component {
	render() {
		return (
			<div>
				<h3>Correlation</h3>
				<button
					className="btn btn-primary"
					onClick={this.props.handleCorrelation}>
					Back</button>
			</div>
		);
	}
}
