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

	// Quartiles Definition --- Part III
	// Helper functions
	arrSort(arrToSort) {
		arrToSort.sort(function(a, b) { return parseInt(a) - parseInt(b) });
	};

	inputParsing(unparsed_arr) {
		let arr = [];

		for(let i = 0; i < unparsed_arr.length; i++) { arr.push(parseInt(unparsed_arr[i])) }

		return arr
	}


	// Quartiles definition helper
	quartilesDefinition(percentile) {
		// Array Parsing and Soring
		let arr = this.inputParsing(this.state.value);
		this.arrSort(arr);

		// Main Logic
		let index = (percentile/100) * arr.length, result;

		if (Math.floor(index) == index) {
			result = (arr[(index-1)] + arr[index])/2;
		} else {
			result = arr[Math.floor(index)];
		}

		return result
	}

	// Quartiles 1, 2, 3
	lowerQuartile() {
		return this.quartilesDefinition(25)
	}

	median() {
		return this.quartilesDefinition(50)
	}

	upperQuartile() {
		return this.quartilesDefinition(75)
	}

	///Outliers definition --- Part IV
	// http://www.statisticshowto.com/find-outliers/ - I've used this guide
	Outliers() {
		// Parsing and Soring
		let arr = this.inputParsing(this.state.value), outliers = [];
		this.arrSort(arr);
		// console.log(`parsed and sorted array: ${arr}`);

		// Elements Definition
		let Q1 = this.lowerQuartile(), Q3 = this.upperQuartile();
		let IQR = Q3 - Q1, IQRx15 = IQR * 1.5; // IQR: 36 - 14 -> 22 // IQRx15: 33
		let maximum = Q3 + IQRx15, minimal = Q1 - IQRx15; //max: 33 + 36 -> 69 //min: 14 - 33 -> -19
		// console.log(`max: ${maximum}, min: ${minimal}, firVal: ${arr[0]}, lastVal: ${arr[arr.length-1]}`);

		// Pushing to outliers numbers
		if (minimal > arr[0]) outliers.push(arr[0]);
		if (maximum < arr[arr.length-1]) outliers.push(arr[arr.length-1]);
		// console.log(`outliers: ${outliers}`);

		// Array returning
		return outliers
	}

	// Output choicing
	outliersCondition(outliers) {
		switch(outliers.length) {
			case 1:
				return `Outlier: ${outliers[0]}`;
			case 2:
				return `Outliers: ${outliers[0]}, ${outliers[1]}`;
			default:
				return 'No Outliers';
		}
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
						<li>Lower Quartile: {this.lowerQuartile()}</li>
						<li>Median: {this.median()}</li>
						<li>Upper Quartile: {this.upperQuartile()}</li>
						<li>{this.outliersCondition(this.Outliers())}</li>
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
