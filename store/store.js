import { useMemo } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import count from "./count/reducer";
import auth from "./auth/reducer";

let store;

const initialState = {
    count: {
        count: 0,
    },
    auth: {
        isLoggedIn: false,
        email: "",
    },
};

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
    count,
    auth,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

const persistConfig = {
    key: "primary",
    storage,
    whitelist: ["count", "isLoggedIn", "email"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

const initStore = () => {
    return createStore(
        persistedReducer,
        initialState,
        bindMiddleware([thunkMiddleware])
    );
};

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

export const wrapper = createWrapper(initStore);
