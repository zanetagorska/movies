const INITIAL_STATE = {
	collection: [],
	movie: {
		_id: null,
		imdbId: null,
		title: null,
		director: null,
		year: null,
		metascore: null,
		actors: [],
		posterUrl: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'FETCH_MOVIES_SUCCESS':
			return { ...state, collection: action.movies };
		case 'FETCH_MOVIE_SUCCESS':
			return { ...state, movie: action.movie };
		case 'FETCH_MOVIES_FAILURE':
		case 'FETCH_MOVIE_FAILURE':
			return state;
		default:
			return state;
	}
};

export const fetchMovies = (params) => ({
	type: 'FETCH_MOVIES_REQUEST',
	params
});

export const fetchMovie = (imdbId) => ({
	type: 'FETCH_MOVIE',
	imdbId
});
