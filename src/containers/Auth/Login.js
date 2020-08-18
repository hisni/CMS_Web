import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/smallSpinner';
import './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { SocialMediaIconsReact } from 'social-media-icons-react';
import Hash from 'object-hash';

class Login extends Component {
    state = {
        controls: {
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
            }
        },
        isSignup: false,
        formIsValid: false
    }

    componentDidMount() {
        if ( this.props.error ) {
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
        
        this.props.onAuth( this.state.controls.Email.value, hash );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p className="errormsg">Invalid email or password. Please try again.</p>
            );
        }

        let form = (
                <Aux>
                    <div className="container">
                        <div id="login">
                            <form className="login-form" onSubmit={this.submitHandler}>
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
                            <span><FontAwesomeIcon icon={faLock} /></span>
                            <input
                                autoComplete="off"
                                maxLength="16"
                                onChange={( event ) => this.inputChangedHandler( event, "Password" )}
                                placeholder="Password"
                                type="password"
                                value={this.state.controls.Password.value}
                                required
                            />
                            <input className="SubButton" type="submit" disabled={!this.state.formIsValid} value="Log in"/>
                            {errorMessage}
                            </form>
                        </div>
                    </div>
                    
                    <div className="sign-up__actions clearfix">
                        <p>Not a member? <a href="/register">Sign up now</a><span><FontAwesomeIcon icon={faArrowRight}/></span></p>
                    </div>

                    <div className="sign-in__actions">
                        <ul>
                            <li><SocialMediaIconsReact icon="github" iconColor="#f5f7fa" backgroundColor="#2b161e" iconSize="8"/></li>
                            <li><SocialMediaIconsReact icon="googleplus" iconColor="#f5f7fa" backgroundColor="#2b161e" iconSize="8" /></li>
                            <li><SocialMediaIconsReact icon="facebook" iconColor="#f5f7fa" backgroundColor="#2b161e" iconSize="8"/></li>
                            <li><SocialMediaIconsReact icon="twitter" iconColor="#f5f7fa" backgroundColor="#2b161e" iconSize="8"/></li>
                        </ul>
                    </div> 
                </Aux>);

        let loadSpinner = null;

        if (this.props.loading) {
            // loadSpinner = <Spinner />
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={'/dashboard'}/>
        }

        return (
            <div className="Page" >
                <div >
                    {authRedirect}
                    {form}
                    <div className="Extras">
                        {loadSpinner}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.authSignIn( email, password ) ),
        setAuth: () => dispatch(actions.setAuth()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );