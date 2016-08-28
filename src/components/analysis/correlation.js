import React, { Component } from 'react';

export default class Correlation extends Component {
	// Basic stuff definition--- Part I
	constructor() {
		super();
		this.state = { firArrVal: '', secArrVal: ''};

		this.regExp = /^[-0-9]+(,[-0-9]+)*$/;

		this.handleFirArrVal = this.handleFirArrVal.bind(this);
		this.handleSecArrVal = this.handleSecArrVal.bind(this);
	}


	handleFirArrVal(ev) {
		let firArr = ev.target.value.toString();

		if(this.regExp.test(firArr)) {
			this.setState({ firArrVal: firArr.split(',') });
		}
	}

	handleSecArrVal(ev) {
		let secArr = ev.target.value.toString();

		if(this.regExp.test(secArr)) {
			this.setState({ secArrVal: secArr.split(',') });
		}
	}
	
	
	// Correlation coefficient --- part II
	// Coefficient definition
	correlationCoefficientDefinition(){
		let firArr = [], secArr = [], arrsLeng = this.state.firArrVal.length, temp = [];
		for (let i = 0; i < arrsLeng; i++) {
			firArr.push(parseInt(this.state.firArrVal[i]));
			secArr.push(parseInt(this.state.secArrVal[i]));
		}

		for (let key in firArr) { // for [2,4,3]
			if (secArr[key]) temp.push(key); // if [6, 9 ,1] true => temp: [0, 1, 2]
		}

		let temp_leng = temp.length; // ["0", "1", "2"].length => 3
		if (temp_leng === 0) return 0;

		let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
		for (let i = 0; i < temp.length; i++) {
			sum1 += firArr[temp[i]]; // 2 + 4 + 3 -> 9
			sum2 += secArr[temp[i]]; // 6 + 9 + 1 -> 16
			sum1Sq += Math.pow(firArr[temp[i]], 2); // 2*2, 4*4, 3*3 -> 4 + 16 + 9 -> 29
			sum2Sq += Math.pow(secArr[temp[i]], 2); // 6*6, 9*9, 1*1 -> 36 + 81 + 1 -> 118
			pSum += firArr[temp[i]] * secArr[temp[i]]; // 2*6 + 4*9 + 3*1 -> 12 + 36 + 3 -> 51
		}

		// Formula - part IV
		let top = pSum - (sum1 * sum2 / temp_leng); // 51 - (9 * 16 / 3) -> 51 - 48 => num: 3
		let bottom =  Math.sqrt((sum1Sq - Math.pow(sum1, 2) / temp_leng) * (sum2Sq - Math.pow(sum2, 2) / temp_leng));
		if (bottom == 0) return 0;

		return top / bottom;
	}
	
	// Validation with Output
	correlationCoefficientOutput() {
		if (!(this.state.firArrVal.length > 2 && this.state.firArrVal.length === this.state.secArrVal.length)) {
			return 'Your coefficient will appear on this place';
		} else {
			return `Correlation coefficient is ${this.correlationCoefficientDefinition().toFixed(6)}`
		}
	}


	render() {
		return (
			<div>
				<h6>Enter 2 arrays of data of equal length. Each array should contain at least 3 different numbers.</h6>
				<div className="row">
					<div className="col-md-5">
						<textarea
							className="form-control"
							onChange={this.handleFirArrVal} />
					</div>
					<div className="col-md-5">
						<textarea
							className="form-control"
							onChange={this.handleSecArrVal} />
					</div>
					<div className="col-md-2">
						<button
							className="btn btn-primary"
							onClick={this.props.handleCorrelation}>
							Back</button>
					</div>
				</div>
				<br/>
				<h6>{this.correlationCoefficientOutput()}</h6>
			</div>
		);
	}

}
