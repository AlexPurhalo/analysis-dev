import React, { Component } from 'react';

export default class SimpleAnalysis extends Component {
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
			</div>
		);
	}
}
