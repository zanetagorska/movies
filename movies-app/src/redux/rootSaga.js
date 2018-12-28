import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import moviesSaga from './movies/saga';
import actorsSaga from './actors/saga';

export default function* rootSaga() {
	yield all([ authSaga(), moviesSaga(), actorsSaga() ]);
}
