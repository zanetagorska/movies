import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchActor } from './api';

function* watchFetchActor(action) {
	try {
		const response = yield call(fetchActor, action.imdbId);
		const actor = response.data;
		yield put({ type: 'FETCH_ACTOR_SUCCESS', actor });
	} catch (e) {
		yield put({ type: 'FETCH_ACTOR_FAILURE', error: e.response.status });
	}
}

export default function* actor() {
	yield takeLatest('FETCH_ACTOR', watchFetchActor);
}
