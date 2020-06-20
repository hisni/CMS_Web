import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './SubmitPaper.css';
// import Tile from '../../components/UI/Tile/Tile';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
// import AUX from '../../hoc/Auxiliary/Auxiliary';
import { updateObject, checkValidity } from '../../shared/utility';


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
                validation: {},
                valid: true
            }
        },
        submitted: false,
        formIsValid: false,
        postID: null
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = updateObject( this.state.PostForm, {
            [PostIdentifier]: updateObject( this.state.PostForm[PostIdentifier], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.PostForm[PostIdentifier].validation ),
                touched: true
            } )
        } );

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

        const token = this.props.token;
        
        const data = {
            token: token,
            file : this.state.PostForm.File.value
        };
        
        console.log(data);
        let url = 'uploadfile';
        
        axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}} )
            .then( response => {                
                console.log(response)
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
            <div className="PageSub">
                <div className="Sub">
                    {/* {redirect} */}
                    <h1>Submit a Paper</h1>
                    <form onSubmit={this.postDataHandler} encType="multipart/form-data">
                        {form}
                        <Button btnType="Success" disabled={!this.state.formIsValid} >Add Post</Button>
                    </form>
                </div>
            </div>
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