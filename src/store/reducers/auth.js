import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    first_name: null,
    last_name: null,
    email: null,
    user_role: null,
    error: null,
    loading: false,
    signUpSuccess: false,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    console.log(action);
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        first_name: action.first_name,
        last_name: action.last_name,
        email: action.email,
        user_role: action.user_role,
        error: null,
        loading: false,
        signUpSuccess: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, username: null, phone:null });
};

const signUpSuccess = (state, action) => {
    return updateObject(state, { 
        signUpSuccess: true,
        error: null,
        loading: false });
};

const setAuth = (state, action) => {
    return updateObject(state, { 
        signUpSuccess: false,
        error: null,
        loading: false });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH: return setAuth(state,action);
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state,action);

        default:
            return state;
    }
};

export default reducer;