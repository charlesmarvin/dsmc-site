export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';


export function signIn(username, password) {
	return dispatch => {
		dispatch(requestSignIn());
		return fetch('http://localhost:8000/api/login')
			.then(res => res.json())
			.then(res => dispatch(signInSuccess(res.jwt)))
			.catch(e => dispatch(signInFailure());
	};
}

export function signOut() {
	return {
		type: SIGN_OUT,
		username: null,
		password: null,
		jwt: null
	}
}

export function requestSignIn() {
	return {
		type: REQUEST_SIGN_IN,
		signingIn: true
	}
}

export function signInSuccess(jwt) {
	return {
		type: SIGN_IN_SUCCESS,
		signingIn: true
		jwt
	}
}

export function signInFailure() {
	return {
		type: SIGN_IN_FAILURE,
		username: null,
		password: null,
		jwt: null
	}
}