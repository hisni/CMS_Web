import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {storage} from "../../../firebase/firebase";

import './EditSpk.css';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
import UserLayout from '../UserLayout';
import List from '../../../components/List/NameList'
import smallSpinner from '../../../components/UI/Spinner/smallSpinner'

class EditConf extends Component {
    state = {
        Data:null,
        Form: {
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            Description: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Description'
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
        imageAsFile:null,
        imageAsUrl:null,
        isClick:false,
        loading:false,
    }

    componentDidMount() {
		let url = "https://ecsuop2020.firebaseio.com/Speakers.json";
        
        axios.get( url)
        .then( response => {
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({Data: fetchedData});            
        }).catch(err => {
            console.log(err);
        });

    }

    inputPhotoChangedHandler = (event) =>{
		const image = event.target.files[0]
		this.setState({imageAsFile: image})
	}

    inputChangedHandler = (event, PostIdentifier) =>{
        console.log(event.target.value)
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

    submitHandler = (event) => {

        event.preventDefault();

        this.setState({loading:true});

        if(this.state.imageAsFile === null ) {
			console.error(`not an image, the image file is a ${typeof(this.state.imageAsFile)}`);
		}
        
        const uploadTask = storage.ref(`/Speakers/${this.state.imageAsFile.name}`).put(this.state.imageAsFile);
        
        let data = {
            Name: this.state.Form.Name.value,
            Description: this.state.Form.Description.value,
            url: null,
        }
		
		uploadTask.on('state_changed', 
		(snapShot) => {
			//takes a snap shot of the process as it is happening
			console.log(snapShot)
		}, (err) => {
			//catches the errors
			console.log(err)
		}, () => {
			// gets the functions from storage refences the image storage in firebase by the children
			// gets the download url then sets the image from firebase as the value for the imgUrl key:
			storage.ref('/Speakers').child(this.state.imageAsFile.name).getDownloadURL()
			.then(fireBaseUrl => {
                this.setState({imageAsUrl: fireBaseUrl});
                data.url = fireBaseUrl;
                console.log(fireBaseUrl);
                axios.post('https://ecsuop2020.firebaseio.com/Speakers.json', data)
                .then( response => {                
                    this.setState({submitted:true});
                }).catch(err => {
                    console.log(err);
                })
			})
        })
        
    }

    onClickHandler = () => {
        this.setState({isClick:true});
        console.log(this.state.isClick);
    }

    nameSelectedHandler = (id) =>{
        // this.props.history.push({pathname: '/dashboard/editspk/' + id});
    }

    render () {
         
        const formElementsArray = [];
        for (let key in this.state.Form) {
            formElementsArray.push({
                id: key,
                config: this.state.Form[key]
            });
        }

        let formEL = (
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
  
        let redirect = null;

        
        
        if( this.state.submitted ){
            redirect = <Redirect to={"/speakers"}/>
        }else if( this.state.loading ){
            redirect = <smallSpinner />
        }

        let form = (
            <div className="">
                <form onSubmit={this.submitHandler} >
                    {formEL}
                    <div className="Input">
                        <label className="Label">DaImagete</label>
                        <input 
                            type="file"
                            onChange={this.inputPhotoChangedHandler}
                        />
                    </div>
                    <button className="CBN" disabled={!this.state.formIsValid} >Add</button>
                    {redirect}
                </form>
            </div>
        )

        let speakers = null;

        if( this.state.Data ){

            var data = [];
    
            this.state.Data.map(d => {
                data.push({
                    id: d.id,
					name: d.Name,
					des: d.Description,
					url: d.url,
                });
                return null;
            });

			speakers = (data.map(key => (
                <List 
                    key={key.id} 
                    title={key.name} 
                    clicked={() => this.nameSelectedHandler(key.id)}/>
				))
            )
        }

        return (
            
            <UserLayout>
                
                <div className="TitleNew">
                    <h1>Speakers</h1>                    
                </div>
                <div className="NameList">
                    {speakers}
                </div>
                <div className="TitleNew">
                    <h1>Add New Speakers</h1>                    
                </div>
                {form}
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