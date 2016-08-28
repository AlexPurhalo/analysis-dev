import React, { Component } from 'react';

export default class SimpleAnalysis extends Component {
	render() {
		return (
			<div>
				<h3>Simple Analysis Componen</h3>
				<button
					className="btn btn-primary"
					onClick={this.props.handleCorrelation}>
					Go to correlation</button>
			</div>
		);
	}
}
