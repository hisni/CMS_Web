import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import './User.css';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class User extends Component {
    state = {
        loadedPost: null,
        delete: false,
        deleteSuccess:false
    }

    componentDidMount() {
        if ( this.props.match.params.id ) {
            console.log(this.props.match.params.uid);
            axios.get( "https://ecsuop2020.firebaseio.com/Speakers/" + this.props.match.params.id + '.json' )
                .then( response => {
                    this.setState( { loadedPost: response.data } );
                } );
        }
    }

    render () {
        
        return(
            <Aux>
                <div className="Page">
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        id: state.auth.token,
    }
}

export default connect(mapStateToProps)(User);