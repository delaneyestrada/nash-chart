import { authActionTypes } from "./action";

const authInitialState = {
    isLoggedIn: false,
    email: "",
};

export default function reducer(state = authInitialState, action) {
    switch (action.type) {
        case authActionTypes.LOGIN:
        case authActionTypes.REGISTER:
            return Object.assign({}, state, {
                isLoggedIn: true,
                email: action.currentUser.email,
            });
        case authActionTypes.LOGOUT:
            return Object.assign({}, state, {
                isLoggedIn: false,
                email: "",
            });
        case authActionTypes.FETCH:
            if (action.currentUser) {
                return Object.assign({}, state, {
                    isLoggedIn: true,
                    email: action.currentUser.email,
                });
            } else {
                return Object.assign({}, state, {
                    isLoggedIn: false,
                    email: "",
                });
            }
        default:
            return state;
    }
}
