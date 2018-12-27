import { put, takeLatest, call } from 'redux-saga/effects';
import { loginUser } from './api';

function* login(action) {
	console.log('saga runs');
	try {
		const response = yield call(loginUser, action.user);
		yield put({ type: 'LOGIN_SUCCESS' });
		yield window.sessionStorage.setItem('token', response.data.token);
	} catch (e) {
		yield put({ type: 'LOGIN_FAILURE' });
	}
}

export default function* auth() {
	yield takeLatest('LOGIN', login);
}
