import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(formProps) {
		// Call action creator to sign up the user!
		this.props.signupUser(formProps); // object with email, password, passwordConfirm - as parameter
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const { handleSubmit, fields: { email, password, passwordConfirm} } = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input className="form-control" {...email} type="email" />
				</fieldset>
				{email.touched && email.error && <div className="error">{email.error}</div>}
				<fieldset className="form-group">
					<label>Password:</label>
					<input className="form-control" {...password} type="password" />
				</fieldset>
				{password.touched && password.error && <div className="error">{password.error}</div>}
				<fieldset className="form-group">
					<label>Confirm Password:</label>
					<input className="form-control" {...passwordConfirm} type="password" />
				</fieldset>
				{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign Up</button>
			</form>
		);
	}
}

function validate(formProps) {
	const errors = {};

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password'
	}

	if (formProps.password) {
		if(formProps.password.length < 8
		) {
			errors.password = 'Password length must be minimum 8 symbols'
		}
	}


	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation'
	}

	if (formProps.password !== formProps.passwordConfirm) {
		errors.passwordConfirm = 'Password must match';
		// console.log(errors);
	}

	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };

}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate // validate: validate
}, mapStateToProps, actions)(Signup);
