import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import moviesSaga from './movies/saga';

export default function* rootSaga() {
	yield all([ authSaga(), moviesSaga() ]);
}
