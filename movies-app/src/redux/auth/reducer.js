const INITIAL_STATE = {
	isLogin: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state };
		case 'LOGIN_SUCCESS':
			return { ...state, isLogin: true };
		case 'LOGIN_FAILURE':
			console.log(action);
			return { ...state, isLogin: false };
		default:
			return state;
	}
};

export const login = (user) => ({
	type: 'LOGIN',
	user
});
