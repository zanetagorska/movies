const INITIAL_STATE = {
	isLogin: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, isLogin: true };
		default:
			return state;
	}
};

export const login = (user) => ({
	type: 'LOGIN',
	user
});
