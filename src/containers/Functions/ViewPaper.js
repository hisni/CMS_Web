import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AUX from '../../hoc/Auxiliary/Auxiliary';
 
class ViewPaper extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
        filePath:null,
    }
    
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({pageNumber: numPages});
    }
    
    componentDidMount(){
        let url = 'submissions/';
        const token = "Bearer "+ this.props.token;

        axios.get(url, {headers: {Authorization: token}} )
        .then( response => {                
            console.log(response.data.submissions[0].file); 
            this.setState({filePath:response.data.submissions[0].file})
        }).catch(err => {
            console.log(err);
        });
    }

    render(){

        let resPDF = null;
        if( this.state.filePath ){
            console.log( "true" ); 
            resPDF = (
                <AUX>
                    <embed src="http://localhost:3000/submissions/159826451330715318431.pdf" width="800px" height="1160px" ></embed>
                </AUX>
            )
        }

        return (
            <div>
                {resPDF}
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

export default connect(mapStateToProps)(ViewPaper)