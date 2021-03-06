import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './MyPapers.css';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import UserLayout from '../Profile/UserLayout';
import ViewPaper from '../../components/ViewPaper/ViewPaper'

class MyPapers extends Component {

    state = {
        Data:null,
        filePath:null,
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();
        let url = 'submissions/';
        const token = "Bearer "+ this.props.token;

        axios.get(url, {headers: {Authorization: token}} )
        .then( response => {                
            console.log(response.data); 
            this.setState({Data:response.data.submissions[0]})
            this.setState({filePath:response.data.submissions[0].file})
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        let paper = (<p>No Submissions</p>);
        let details = null;

        if( this.state.filePath ){
            console.log(this.state.filePath);
            paper = (
                <ViewPaper 
                    url={this.state.filePath}
                />
            )

            details = (
                <div  className="Name">
                    <h1>Title: {this.state.Data.title }</h1>
                    <h1>Status: {this.state.Data.status }</h1>
                </div>
            )
        }

        return(
            <AUX>
                <UserLayout>
                    <div className="PageSub">
                        <div className="Title">
                            <h1>My Submission Paper</h1>                    
                        </div>
                        {details}
                        <div>
                            {paper}
                        </div>
                    </div>
                    
                </UserLayout>
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(MyPapers)