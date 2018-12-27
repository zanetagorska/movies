import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchMovies } from './api';

function* watchFetchMovies(action) {
	try {
		const response = yield call(fetchMovies, action.params);
		const movies = response.data.collection;
		yield put({ type: 'FETCH_MOVIES_SUCCESS', movies });
	} catch (e) {
		yield put({ type: 'FETCH_MOCIES_FAILURE', error: e.response.status });
	}
}

export default function* movies() {
	yield takeLatest('FETCH_MOVIES', watchFetchMovies);
}
