import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import UserLayout from '../../Profile/UserLayout';
import { Redirect } from 'react-router-dom';

import './EvalPaper.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import Input from '../../../components/UI/Input/Input';
// import { updateObject, checkValidity } from '../../../shared/utility';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ViewPaper from '../../../components/ViewPaper/ViewPaper';

class AcceptPaper extends Component {
    state = {
        eval1: 0,
        eval2: 0,
        comments:'',
        Data:null,
        submitted: false,
        formIsValid: true,
    }

    componentDidMount() {
        if ( this.props.match.params.rpid ) {
            console.log(this.props.match.params.rpid);
            let token=  "Bearer " + this.props.token;
            
            let url = "submissions/" + this.props.match.params.rpid;
            console.log(url)
            axios.get(url, {headers: {Authorization: token}} )
            .then( response => {                
                this.setState({Data:response.data.submission[0]})
                console.log(this.state.Data)
                
            }).catch(err => {
                console.log(err);
            });
        }
    }

    saveDataHandler = (event) => {

        event.preventDefault();

        let token=  "Bearer " + this.props.token;
        let url = "ratings/"+this.state.Data.id;
        
        const data = {
            completeness: this.state.eval1,
            subject_knowledge: this.state.eval2,
            comments: this.state.comments,
            token: token
        };

        console.log(data)
        console.log(url)
        
        axios.post(url, data, {headers: {Authorization: token}})
            .then( response => {                
                console.log(response)
                this.setState({submitted:true});
            }).catch(err => {
                console.log(err);
            });

    }

    eval1ChangedHandler = (event)=>{
        this.setState({eval1:event.target.value})
    }

    eval2ChangedHandler = (event)=>{
        this.setState({eval2:event.target.value})
    }

    commentChangedHandler = (event)=>{
        this.setState({comments:event.target.value})
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

        
        let form = (
            <Aux>
                <div className="rowIN">
                    <label className="PLabel">Completeness (0.0 - 10.0)</label>
                        <input
                        className="InputNumber"
                        type='text'
                        placeholder='0.0'
                        value={this.state.eval1}
                        onChange={this.eval1ChangedHandler} />
                </div>
                <div className="rowIN">
                    <label className="PLabel">Subject Knowldege (0.0 - 10.0)</label>
                        <input
                        className="InputNumber"
                        type='text'
                        placeholder='0.0'
                        value={this.state.eval2}
                        onChange={this.eval2ChangedHandler} />
                </div>
                <div className="rowIN">
                    <label className="PLabel">Comments</label>
                        <textarea
                            className="InputComm"
                            type='text'
                            placeholder='Description'
                            value={this.state.comments}
                            onChange={this.commentChangedHandler} />;
                </div>
            </Aux>
        );
        
        return(
            <Aux>
                <UserLayout>
                    <div className="Title">
                        <h1>Evaluate Paper</h1>                    
                    </div>
                    <div>
                        {redirect}
                        {details}
                    </div>
                    <div className="PaperView">
                        {paper}
                    </div>
                    <div className="Title2">
                        <h1>Evaluation Criterias</h1>                    
                    </div>
                    <div className="ControlStyle">
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

export default connect(mapStateToProps)(AcceptPaper);