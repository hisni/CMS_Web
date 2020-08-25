import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import UserLayout from '../../Profile/UserLayout';
import { Redirect } from 'react-router-dom';

import './AcceptPaper.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ViewPaper from '../../../components/ViewPaper/ViewPaper';

class AcceptPaper extends Component {
    state = {
        Form: {
            Status: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'pending', displayValue: 'Pending'},
                        {value: 'approved', displayValue: 'Approve'},
                        {value: 'rejected', displayValue: 'Reject'},
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
        Completeness:null,
        SubKnowledge:null,
        Comments:'',
    }

    componentDidMount() {
        if ( this.props.match.params.sid ) {
            console.log(this.props.match.params.sid);
            let token=  "Bearer " + this.props.token;
            
            let url = "submissions/" + this.props.match.params.sid;
            console.log(url)
            axios.get(url, {headers: {Authorization: token}} )
            .then( response => {                
                this.setState({Data:response.data.submission[0]})
                console.log(this.state.Data)
                let url = "ratings/" + this.props.match.params.sid;
                axios.get(url, {headers: {Authorization: token}} )
                    .then( response => {                
                        this.setState({Completeness:response.data.rating.completeness})
                        this.setState({SubKnowledge:response.data.rating.subject_knowledge})
                        this.setState({Comments:response.data.rating.comments})

                        console.log(this.state.Comments);
                        
                    }).catch(err => {
                        console.log(err);
                    });

                
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
            submissionId: this.state.Data.id,
            status : this.state.Form.Status.value,
        };

        // const data = this.state.Form.Status.value

        console.log(data)
        
        let token=  "Bearer " + this.props.token;
            
        let url = "submissions/status/"+this.state.Data.id;
        
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
            redirect = <Redirect to={"/dashboard/submissions"}/>
        }

        let details = <Spinner />;
        let paper = null;
        if( this.state.Data ){
            let data = this.state.Data;
            details = (
                <Aux>
                    <div  className="Name">
                        <h1>{data.title }</h1>
                        <h1>Subject ID: {data.subject_id}</h1>
                        <h1>Completenes: {this.state.Completeness}</h1>
                        <h1>Subject Knowledge: {this.state.SubKnowledge}</h1>
                        <h1>Comments: {this.state.Comments[0]}</h1>
                        <h1>Current Status: {data.status}</h1>
                    </div>
                </Aux>
            )

            paper = (
                <ViewPaper 
                    url={this.state.Data.file}
                />
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
                        <h1>Accept/Reject Paper</h1>                    
                    </div>
                    <div>
                        {redirect}
                        {details}
                    </div>
                    <div className="RoleStyle">
                        <form onSubmit={this.saveDataHandler} >
                            {form}
                            <button className="CB" disabled={!this.state.formIsValid} >Change</button>
                        </form>
                    </div>
                    <div className="PaperView">
                        {paper}
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

export default connect(mapStateToProps)(AcceptPaper);