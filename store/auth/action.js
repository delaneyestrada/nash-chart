import { auth } from "../../utils/auth/auth-service";

export const authActionTypes = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    LOGOUT: "LOGOUT",
    FETCH: "FETCH",
};

export const loginSuccess = () => {
    return {
        type: authActionTypes.LOGIN,
        currentUser: auth.currentUser.toJSON(),
    };
};

export const registerSuccess = () => {
    return {
        type: authActionTypes.REGISTER,
        currentUser: auth.currentUser.toJSON(),
    };
};

export const register = (email, password) => async (dispatch) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        dispatch(registerSuccess());
    } catch (error) {
        throw error;
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch(loginSuccess());
    } catch (error) {
        throw error;
    }
};

export const logout = () => async (dispatch) => {
    try {
        await auth.signOut();
        dispatch({
            type: authActionTypes.LOGOUT,
            currentUser: auth.currentUser,
        });
    } catch (error) {
        throw error;
    }
};

export const fetchUser = () => async (dispatch) => {
    try {
        await auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                dispatch({
                    type: authActionTypes.FETCH,
                    currentUser: currentUser.toJSON(),
                });
            } else {
                dispatch({
                    type: authActionTypes.FETCH,
                    currentUser: null,
                });
            }
        });
    } catch (error) {
        throw error;
    }
};
