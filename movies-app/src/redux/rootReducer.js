import { combineReducers } from 'redux';
import auth from './auth/reducer';
import movies from './movies/reducer';
import actors from './actors/reducer';

export default combineReducers({
	auth,
	movies,
	actors
});
