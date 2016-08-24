import axios from 'axios';

const ROOT_URL = 'https://analysis-server.herokuapp.com/';

export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/sign_in`, { email, password }); // email: email, password: password
	};
	// Submit email/password to the server

	// If request is good.
	// - Update state to indicate user is authenticated
	// - Save the JWT token
	// - redirect to the route '/feature'

	// If request is bad.
	// - Show an error to the user
}
