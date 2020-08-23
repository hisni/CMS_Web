import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
 
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
            resPDF = <embed src="localhost:3000/submissions/159811121813615318431.pdf" width="100%" height="600px" />
        }

        return (
            <div>
                {resPDF}
            {/* <Document
                file="localhost:3000/submissions/159811121813615318431.pdf"
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={this.state.pageNumber} />
            </Document>
            <p>Page {this.state.pageNumber} of {this.state.numPages}</p> */}
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