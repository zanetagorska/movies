import { put, takeLatest, call } from 'redux-saga/effects';
import { loginUser } from './api';
import { history } from '../../utils/history';

function* login(action) {
	try {
		const response = yield call(loginUser, action.user);
		yield put({ type: 'LOGIN_SUCCESS' });
		yield window.sessionStorage.setItem('token', response.data.token);
		yield history.push('/');
	} catch (e) {
		yield put({ type: 'LOGIN_FAILURE' });
	}
}

export default function* auth() {
	yield takeLatest('LOGIN_REQUEST', login);
}
