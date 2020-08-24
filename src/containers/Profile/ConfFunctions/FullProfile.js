import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import './FullProfile.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class FullProfile extends Component {
    state = {
        loadedPost: null,
        delete: false,
        deleteSuccess:false
    }

    // loadData () {
    //     if ( this.props.match.params.id ) {
    //         console.log(this.props.match.params.id);
    //         if ( !this.state.loadedPost ) {
    //             axios.get( "https://ecsuop2020.firebaseio.com/Speakers/" + this.props.match.params.id + '.json' )
    //                 .then( response => {
    //                     this.setState( { loadedPost: response.data } );
    //                     // console.log(response);
    //                 } );
    //         }
    //     }
    // }

    componentDidMount() {
        if ( this.props.match.params.id ) {
            console.log(this.props.match.params.id);
            if ( !this.state.loadedPost ) {
                axios.get( "https://ecsuop2020.firebaseio.com/Speakers/" + this.props.match.params.id + '.json' )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    render () {

        let profile = <Spinner/>;

        if ( this.state.loadedPost ) {
            
        }
        
        return(
            <Aux >
                <div className="Page">
                    {profile}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        tokenID: state.auth.token,
        UID: state.auth.userId,
        isAuthorized: state.auth.Authority === "PHI"
    }
}

export default connect(mapStateToProps)(FullProfile);