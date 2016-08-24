import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'https://analysis-server.herokuapp.com/';

export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/sign_in`, { email, password }) // email: email, password: password
		.then(response => {
			// If request is good.
			// - Update state to indicate user is authenticated
			dispatch({ type: AUTH_USER });

			// - Save the JWT token
			localStorage.setItem('token', response.data.access_token);
			// in browser console try as input: localStorage.getItem('token'), output: token info

			// - redirect to the route '/feature'
			browserHistory.push('/feature')

		}).catch(() => {
			// If request is bad.
			// - Show an error to the user
			dispatch(authError('Bad Login Info'))
		})
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser() {
	localStorage.removeItem('token');

	return { type: UNAUTH_USER };
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/users`, { user: { email, password } })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.access_token);
				browserHistory.push('/feature');
			})
			.catch(response => dispatch(authError(response.data.error)));
	}
}
