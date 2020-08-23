import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Paper.css';
import Input from '../../components/UI/Input/Input';
// import AUX from '../../hoc/Auxiliary/Auxiliary';
import { updateObject, checkValidity } from '../../shared/utility';
import UserLayout from '../Profile/UserLayout';

// import ViewPaper from './ViewPaper'

class Paper extends Component {

    state = {
        PostForm: {
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
            Authors: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Authors'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            SubjectID: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Subject ID'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            File: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    name: 'submissionFile'
                },
                value: '',
                file: null,
                validation: {
                    required: true,
                },
                valid: true
            }
        },
        submitted: false,
        formIsValid: false,
        postID: null,
        FName:null,
    }

    inputChangedHandler = (event, PostIdentifier) =>{

        let updatedPostForm = null;
        if( PostIdentifier === "File" ){
            console.log(event.target);
            updatedPostForm = updateObject( this.state.PostForm, {
                [PostIdentifier]: updateObject( this.state.PostForm[PostIdentifier], {
                    value: event.target.value,
                    file: event.target.files[0],
                    valid: checkValidity( event.target.value, this.state.PostForm[PostIdentifier].validation ),
                    touched: true
                } )
            } );    
        }else{
            updatedPostForm = updateObject( this.state.PostForm, {
                [PostIdentifier]: updateObject( this.state.PostForm[PostIdentifier], {
                    value: event.target.value,
                    valid: checkValidity( event.target.value, this.state.PostForm[PostIdentifier].validation ),
                    touched: true
                } )
            } );    
        }
        
        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({PostForm: updatedPostForm, formIsValid: formIsValid});

    }

    componentDidMount(){
        
    }

    postDataHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formIdentifier in this.state.PostForm ){
            formData[formIdentifier] = this.state.PostForm[formIdentifier].value;
        }

        const token = "Bearer "+ this.props.token;

        console.log(token)
        const data = new FormData();
        data.append('submissionFile', this.state.PostForm.File.file);
        data.append('token', token);
        data.append('subject_id', this.state.PostForm.SubjectID.value);
        data.append('title', this.state.PostForm.Title.value);

        console.log(data);
        let url = 'uploadfile';
        
        axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data', Authorization: token}} )
        .then( response => {                
            console.log(response.data.fileData.filename);
            this.setState({submitted:true});
            this.setState({FName:response.data.fileData.filename});
            
        }).catch(err => {
            console.log(err);
        });

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.PostForm) {
            formElementsArray.push({
                id: key,
                config: this.state.PostForm[key]
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
                <div className="PageSub">
                        <div className="Title">
                            <h1>Submit a Paper</h1>                    
                        </div>
                    <div className="Sub">
                        {/* {redirect} */}
                        <form onSubmit={this.postDataHandler} encType="multipart/form-data">
                            {form}
                            <button className="CB" disabled={!this.state.formIsValid} >Submit</button>
                        </form>
                    </div>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Paper)