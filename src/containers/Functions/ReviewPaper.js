import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import './Paper.css';
// import Input from '../../components/UI/Input/Input';
// import AUX from '../../hoc/Auxiliary/Auxiliary';
// import { updateObject, checkValidity } from '../../shared/utility';
import UserLayout from '../Profile/UserLayout';

// import ViewPaper from './ViewPaper'

class Paper extends Component {

    state = {
        
    }

    componentDidMount(){
        
    }

    render() {

        return (
            <UserLayout>
                <div className="Title">
                    <h1>Review Papers</h1>                    
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