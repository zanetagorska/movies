const INITIAL_STATE = {
	actor: {
		_id: null,
		imdbId: null,
		name: null,
		birthday: null,
		country: null,
		gender: null,
		photoUrl: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'FETCH_ACTOR_SUCCESS':
			return { ...state, actor: action.actor };
		case 'FETCH_ACTOR_FAILURE':
			return state;
		default:
			return state;
	}
};

export const fetchActor = (imdbId) => ({
	type: 'FETCH_ACTOR',
	imdbId
});
