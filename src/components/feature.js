import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SimpleAnalysis from './analysis/simple_analysis';
import Correlation from './analysis/correlation';

class Feature extends Component {
	constructor() {
		super();

		this.state = { correlation: false };

		this.handleCorrelation = this.handleCorrelation.bind(this);
	}
	componentWillMount() {
		this.props.fetchMessage();
	}

	handleCorrelation() {
		this.setState({correlation: !this.state.correlation})
	}

	render() {
		// console.log(this.state.correlation);
		return (
			<div>
				<h5>{this.props.message}</h5><br/>
				{!this.state.correlation ? (
					<SimpleAnalysis handleCorrelation={this.handleCorrelation}/>
				) : (
					<Correlation handleCorrelation={this.handleCorrelation}/>
				)}
			</div>

		);
	}
}

function mapStateToProps(state) {
	return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(Feature);
