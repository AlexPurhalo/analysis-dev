import React, { Component } from 'react';

export default class SimpleAnalysis extends Component {
	// Basic dat definition and input handling --- Part I
	constructor() {
		super();

		this.state = { value: '', dataCond: ''};

		this.handleAnalysis = this.handleAnalysis.bind(this)
	}

	handleAnalysis(ev) {
		let arr = ev.target.value.toString();
		let regExp = /^[-0-9]+(,[-0-9]+)*$/;
		regExp.test(arr) ? this.setState({ value: arr.split(","), dataCond: '' })
			: this.setState({ dataCond: 'Waiting for correct data' })
	}

	// Simple analysis (avg, max, min) ---- Part II
	maxItemDefinition() {
		return Math.max(...this.state.value)
	}

	minItemDefinition() {
		return Math.min(...this.state.value)
	}

	averageItemDefinition() {
		let total = 0, arr = this.state.value;
		for(let i = 0; i < arr.length; i++) {
			total += parseInt(arr[i]);
		}

		return total / arr.length;
	}

	render() {
		return (
			<div>
				<h3>Simple Analysis</h3><br/>
				<h6>Enter at least 3 numbers separated by commas like: <span>3,10,14,19,22,29,32,36,49,70</span></h6>
				<textarea
					type="text"
					className="form-control"
					onChange={this.handleAnalysis} />
				<h5>{this.state.dataCond}</h5>
				{this.state.value.length > 2 ? (
					<ul >
						<li>Max: {this.maxItemDefinition()}</li>
						<li>Min: {this.minItemDefinition()}</li>
						<li>Avg: {this.averageItemDefinition()}</li>
					</ul>
				) : <div>On this place will appear your analysis</div>}
				<br/><br/>
				<button
					className="btn btn-primary"
					onClick={this.props.handleCorrelation}>
					Go to correlation</button>
			</div>
		);
	}
}
