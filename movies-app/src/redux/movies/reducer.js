const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'FETCH_MOVIES_SUCCESS':
			return [ ...action.movies ];
		case 'FETCH_MOVIES_FAILURE':
			return state;
		default:
			return state;
	}
};

export const fetchMovies = (params) => ({
	type: 'FETCH_MOVIES',
	params
});
