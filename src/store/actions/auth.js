import axios from 'axios';
// import qs from 'qs';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, fname, lname, email, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        first_name: fname,
        last_name: lname,
        email: email,
        user_role: role,
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
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('role');
    
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
            console.log(response.data.details)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.details.email);
            localStorage.setItem('fname', response.data.details.first_name);
            localStorage.setItem('lname', response.data.details.last_name);
            localStorage.setItem('role', response.data.details.user_role);

            // localStorage.setItem('expirationDate', expirationDate);
            // localStorage.setItem('userId', response.data.localId);
            // dbURL = 'https://co321project-e273b.firebaseio.com/userInfo/'+response.data.localId+'.json?auth=' + response.data.idToken; 
            // dispatch(loadSigninData( dbURL, response.data.idToken, response.data.localId ));
            // dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data.token, response.data.details.first_name, response.data.details.last_name, response.data.details.email, response.data.details.user_role));
        })
        .catch(err => {
            // console.log(err);
            dispatch(authFail("Invalid Email/Password"));
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
            console.log(response);
            let url = 'userdata/roles';
            let token = "Bearer " + response.data.token;

            let data = {
                token: "Bearer " + response.data.token,
            }
            
            axios.post(url, data, {headers: {Authorization: token}})
            .then(response => {
                dispatch(signUpSuccess());
            })
            .catch(err => {
                console.log("Error");
                // dispatch(authFail(err.response.data.error));
            });
        })
        .catch(err => {
            console.log("Error");
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
            
            const fname = localStorage.getItem('fname');
            const lname = localStorage.getItem('lname');
            const email = localStorage.getItem('email');
            const role = localStorage.getItem('role');
            
            dispatch(authSuccess(token, fname, lname, email, role));   
        }
    };
};