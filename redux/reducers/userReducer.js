import { REMOVE_USER, SET_USER } from "../actions/userActions";

const userReducer = (state = { user: null }, action) => {
	console.log(action);
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.user,
			};
		case REMOVE_USER:
			return { ...state, user: null };
		default:
			return state;
	}
};

export default userReducer;
