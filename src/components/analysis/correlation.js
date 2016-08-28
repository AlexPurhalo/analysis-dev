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
			</div>
		);
	}

}
