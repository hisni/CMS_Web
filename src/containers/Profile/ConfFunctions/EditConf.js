import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import './EditConf.css';
// import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
// import AUX from '../../../hoc/Auxiliary/Auxiliary';
import UserLayout from '../UserLayout';


class EditConf extends Component {
    state = {
        Form: {
            Title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            Venue: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Venue'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
        },
        submitted: false,
        formIsValid: false,
        postID: null,
        DateValue: new Date(),
        TimeValue: "10:00",
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

    onDateChangeHandler = (event)=>{
        // console.log(this.state.DateValue);
        // console.log(event);
        this.setState({DateValue: event});
    }

    onTimeChangeHandler = (event)=>{
        // console.log(this.state.DateValue);
        // console.log(event[0]);
        this.setState({TimeValue: event});
    }


    saveDataHandler = (event) => {

        event.preventDefault();
        // const token = this.props.tokenID;
        // const ID = this.props.userID

        let map = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"]

        let month = this.state.DateValue.getMonth();
        let day = this.state.DateValue.getDate();
        let year = this.state.DateValue.getFullYear();
        
        let t = this.state.TimeValue;
        let time = t[0] + t[1] + " " + t[3] + t[4] + " AM";

        const data = {
            Title: this.state.Form.Title.value,
            Venue : this.state.Form.Venue.value,
            Date: day +" " + map[month] + " " + year,
            Time: time,
            Seats: 750,
            Submissions: 12,
            Accepted: 4,
        };

        console.log(data)
        
        axios.post('https://ecsuop2020.firebaseio.com/ConferenceDetails/Info.json', data)
            .then( response => {                
                this.setState({submitted:true});
            }).catch(err => {
                console.log(err);
            });

        // this.setState({submitted:true});

    }

    render () {
        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to={"/dashboard"}/>
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
  
        return (
            <UserLayout>
                <div className="Title">
                    <h1>Edit Conference Details</h1>                    
                </div>
                <div className="NewPost">
                    {redirect}
                    <form onSubmit={this.saveDataHandler} >
                        {form}
                        <div className="Input">
                            <label className="Label">Date</label>
                            <DatePicker
                                onChange={this.onDateChangeHandler}
                                value={this.state.DateValue}
                            />
                        </div>
                        <div className="Input">
                            <label className="Label">Time</label>
                            <TimePicker
                                onChange={this.onTimeChangeHandler}
                                value={this.state.TimeValue}
                            />
                        </div>
                        <button className="CB" disabled={!this.state.formIsValid} >Save</button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenID: state.auth.token,
        userID: state.auth.userId
    }
}

export default connect(mapStateToProps)(EditConf);