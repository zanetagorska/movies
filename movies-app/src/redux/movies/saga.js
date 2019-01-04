import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchMovies, fetchMovie } from './api';

function* watchFetchMovies(action) {
	try {
		const response = yield call(fetchMovies, action.params);
		const movies = response.data.collection;
		yield put({ type: 'FETCH_MOVIES_SUCCESS', movies });
	} catch (e) {
		yield put({ type: 'FETCH_MOVIES_FAILURE', error: e.response.status });
	}
}

function* watchFetchMovie(action) {
	try {
		const response = yield call(fetchMovie, action.imdbId);
		const movie = response.data;
		yield put({ type: 'FETCH_MOVIE_SUCCESS', movie });
	} catch (e) {
		yield put({ type: 'FETCH_MOVIE_FAILURE', error: e.response.status });
	}
}

export default function* movies() {
	yield takeLatest('FETCH_MOVIES_REQUEST', watchFetchMovies);
	yield takeLatest('FETCH_MOVIE_REQUEST', watchFetchMovie);
}
