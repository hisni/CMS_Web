import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import UserLayout from '../Profile/UserLayout';
import { Redirect } from 'react-router-dom';

import './User.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner'


class User extends Component {
    state = {
        Form: {
            NewRole: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Author', displayValue: 'Author'},
                        {value: 'Reviewer', displayValue: 'Reviewer'},
                        {value: 'Admin', displayValue: 'Admin'},
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
        },
        Data:null,
        submitted: false,
        formIsValid: false,
    }

    componentDidMount() {
        if ( this.props.match.params.uid ) {
            console.log(this.props.match.params.uid);
            let token=  "Bearer " + this.props.token;
            
            let url = "userdata/users/" + this.props.match.params.uid;
            // console.log(url)
            axios.get(url, {headers: {Authorization: token}} )
            .then( response => {                
                this.setState({Data:response.data.result[0]})
                console.log(this.state.Data)
            }).catch(err => {
                console.log(err);
            });
        }
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = updateObject( this.state.Form, {
            [PostIdentifier]: updateObject( this.state.Form[PostIdentifier], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.Form[PostIdentifier].validation ),
                touched: true
            } )
        } );

        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({Form: updatedPostForm, formIsValid: formIsValid});

    }

    saveDataHandler = (event) => {

        event.preventDefault();
        

        const data = {
            userId: this.state.Data.id,
            role : this.state.Form.NewRole.value,
        };

        console.log(data)
        
        let token=  "Bearer " + this.props.token;
            
        let url = "userdata/roles";
        
        axios.put(url, data, {headers: {Authorization: token}})
            .then( response => {                
                console.log(response)
                this.setState({submitted:true});
            }).catch(err => {
                console.log(err);
            });

    }

    render () {

        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to={"/dashboard/users"}/>
        }

        let details = <Spinner />;
        if( this.state.Data ){
            let data = this.state.Data;
            details = (
                <Aux>
                    <div  className="Name">
                        <h1>{data.first_name + " " +data.last_name }</h1>
                        <h1>Email: {data.email}</h1>
                        <h1>Country Code: {data.country_ode}</h1>
                        <h1>Current Role: {data.user_role}</h1>
                    </div>
                </Aux>
            )
        }

        const formElementsArray = [];
        for (let key in this.state.Form) {
            formElementsArray.push({
                id: key,
                config: this.state.Form[key]
            });
        }
        let form = (
            formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    label={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );
        
        return(
            <Aux>
                <UserLayout>
                    <div className="Title">
                        <h1>Change Users Role</h1>                    
                    </div>
                    <div>
                        {redirect}
                        {details}
                    </div>
                    <div >
                        <form onSubmit={this.saveDataHandler} >
                            {form}
                            <button className="CB" disabled={!this.state.formIsValid} >Change</button>
                        </form>
                    </div>
                </UserLayout>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(User);