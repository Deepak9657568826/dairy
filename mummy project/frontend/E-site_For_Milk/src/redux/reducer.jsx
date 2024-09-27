import { LOGINLOADING, LOGINSUCCESS, LOGINFAILURE, LOGOUTFAILURE, LOGOUTSUCCESS, LOGOUTLOADING } from "./actionType";

const initialState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null

};


export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGINLOADING:
            return {
                ...state, loading: true, error: null
            };
        case LOGINSUCCESS:
            return {
                ...state, isLoggedIn: true, loading: false, user: action.payload, error: null
            };
        case LOGINFAILURE:
            return {
                ...state, loading: false, error: action.payload, isLoggedIn: false,
            };
            case LOGOUTLOADING:
                return {
                    ...state, loading: true
                };
            case LOGOUTSUCCESS:
                return {
                    ...state, isLoggedIn: false, loading: false, user: null, error: null 
                };
            case LOGOUTFAILURE:
                return {
                    ...state, loading: false, error: action.payload 
                };


        default:
            return state;
    }
}

