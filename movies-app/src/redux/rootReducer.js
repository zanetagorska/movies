import { combineReducers } from 'redux';
import auth from './auth/reducer';
import movies from './movies/reducer';

export default combineReducers({
	auth,
	movies
});
