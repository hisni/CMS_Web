import axios from 'axios';
// import qs from 'qs';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username, phone) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        name:username,
        phoneNo:phone
    };
};

export const authFail = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const signUpSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        
        let url = 'users/login';
     
        axios.post(url, authData)
        .then(response => {
            console.log(response.data)
            // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.token);
            // localStorage.setItem('expirationDate', expirationDate);
            // localStorage.setItem('userId', response.data.localId);
            // dbURL = 'https://co321project-e273b.firebaseio.com/userInfo/'+response.data.localId+'.json?auth=' + response.data.idToken; 
            // dispatch(loadSigninData( dbURL, response.data.idToken, response.data.localId ));
            // dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data.token, "admin", "admin", "123"));
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err.response.data.error));
        });
    };
};


export const authSignUp = ( data ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: data.Email,
            password: data.Password,
            // name: data.Username,
            first_name: data.Firstname,
            last_name:  data.Lastname,
            // returnSecureToken: true
        };

        let url = 'users/signup';

        axios.post(url,authData)
        .then(response => {
            dispatch(signUpSuccess());
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err.response.data.error));
        });
    };
};

export const storeSignupData = ( dbURL, dbData ) => {
    return dispatch => {
        axios.post(dbURL, dbData)
        .then(response => {
            console.log(dbData);
            console.log(response);
            dispatch(signUpSuccess());
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const loadSigninData = ( dbURL, idToken, localId ) => {
    
    return dispatch => {
        var username = '';
        var phone = '';
        
        axios.get(dbURL)
        .then(response => {
            username = response.data.name;
            phone = response.data.phone;

            localStorage.setItem('username', username);
            localStorage.setItem('phone', phone);
            dispatch(authSuccess(idToken, localId, username, phone));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const setAuth = () => {
    return {
        type: actionTypes.SET_AUTH,
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
            //     const userId = localStorage.getItem('userId');
            //     const username = localStorage.getItem('username');
            //     const phone = localStorage.getItem('phone');

                dispatch(authSuccess(token, "admin", "admin", "123" ));
                // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            // }   
        }
    };
};