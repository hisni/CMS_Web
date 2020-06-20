import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Hash from 'object-hash';

// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/smallSpinner';
import './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

class Signup extends Component {
    state = {
        controls: {
            Username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true,
        formIsValid: false
    }

    componentDidMount() {
        if ( this.props.signUpSuccess || this.props.error ) {
            this.props.setAuth();
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState( { controls: updatedControls, formIsValid: formIsValid } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        
        var hash = Hash(this.state.controls.Password.value, { algorithm: 'md5', encoding: 'base64' });
        
        const data = {
            Email: this.state.controls.Email.value,
            Password: hash,
            Username: this.state.controls.Username.value,
        }
        this.props.onAuth( data, this.state.isSignup );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = (
                <Aux>
                    <div className="container">
                        <div id="login">
                            <form className="login-form" onSubmit={this.onSubmit}>
                                <span><FontAwesomeIcon icon={faUser}/></span>
                                <input
                                    autoFocus
                                    maxLength="25"
                                    onChange={( event ) => this.inputChangedHandler( event, "Username" )}
                                    placeholder="Username"
                                    type="text"
                                    value={this.state.controls.Username.value}
                                    required
                                />
                                <span><FontAwesomeIcon icon={faEnvelope}/></span>
                                <input
                                    autoFocus
                                    maxLength="25"
                                    onChange={( event ) => this.inputChangedHandler( event, "Email" )}
                                    placeholder="Email"
                                    type="email"
                                    value={this.state.controls.Email.value}
                                    required
                                />
                                <span><FontAwesomeIcon icon={faLock}/></span>
                                <input
                                    autoComplete="off"
                                    maxLength="16"
                                    onChange={( event ) => this.inputChangedHandler( event, "Password" )}
                                    placeholder="Password"
                                    type="password"
                                    value={this.state.controls.Password.value}
                                    required
                                />
                                <input type="submit" value="Sign Up"/>
                            </form>
                        </div>
                    </div>
                </Aux>
        );

        let loadSpinner = null;

        if (this.props.loading) {
            // loadSpinner = <Spinner />
        }

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let redirect = null;
        if (this.props.signUpSuccess) {
            redirect = <Redirect to={'/login'}/>
        }

        return (
            <div className="Page">
                <div>
                    {redirect}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        {/* <Button btnType="SuccessRe" disabled={!this.state.formIsValid} >Signup</Button> */}
                        <div className="Extras">
                            {loadSpinner}
                            {errorMessage}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        signUpSuccess: state.auth.signUpSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( data, isSignup ) => dispatch( actions.authSignUp( data, isSignup ) ),
        setAuth: () => dispatch(actions.setAuth()),        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Signup );