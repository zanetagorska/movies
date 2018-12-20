const INITIAL_STATE = {
	isLogin: null,
	errorMessage: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'RESET_LOGIN':
			return { ...state, errorMessage: null };
		case 'LOGIN_SUCCESS':
			return { ...state, isLogin: true, errorMessage: null };
		case 'LOGIN_FAILURE':
			return { ...state, isLogin: false, errorMessage: 'Podano niepoprawne dane. Proszę spróbować ponownie' };
		default:
			return state;
	}
};

export const login = (user) => ({
	type: 'LOGIN',
	user
});

export const resetLogin = () => ({
	type: 'RESET_LOGIN'
});
