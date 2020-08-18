import React, { Component } from 'react';
import { connect } from 'react-redux';

// import axios from 'axios';

import './Profile.css';
import Tile from '../../components/UI/Tile/Tile';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import UserLayout from './UserLayout';
import * as actions from '../../store/actions/index';

class Profile extends Component {

    state = {
        RelayNodes: null,
        coordinates: null,
        Controls: {
            Nodes: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "select", displayValue: "Select a node" }
                    ]
                },
                value: 'select',
                validation: {},
                valid: true
            }
        },
        Update:false
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();
    }

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "Users":
                this.props.history.push({pathname: '/dashboard/users'});
                break;
            case "SPaper":
                this.props.history.push({pathname: '/dashboard/submitpaper'});
                break;
            case "Conferences":
                this.props.history.push({pathname: '/dashboard/conferences'});
                break;
            case "Submissions":
                this.props.history.push({pathname: '/dashboard/submissions'});
                break;
            default: ;
        }
    }

    render() {

        var profile = (
            <UserLayout>
                <div className="Profile">
                    <div className="Title">
                        <h1>Profile</h1>
                    </div>
                    <div>
                        <section className="ProfileMangement">
                            <div className="Controls">
                                <Tile 
                                    title={'Users'}
                                    clicked={() => this.postSelectedHandler('Users')}/>
                                <Tile 
                                    title={'Submit Paper'}
                                    clicked={() => this.postSelectedHandler('SPaper')}/>
                                <Tile 
                                    title={'Conferences'}
                                    clicked={() => this.postSelectedHandler('Conferences')}/> 
                                <Tile 
                                    title={'Submissions'}
                                    clicked={() => this.postSelectedHandler('Submissions')}/> 
                            </div>
                        </section>
                    </div>
                </div>
            </UserLayout>
        );

        return (
            <AUX>
                {profile}
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        UID: state.auth.userId,
        Name: state.auth.username,
        phone: state.auth.phone,
        token: state.auth.token
        // District: state.auth.District
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Profile );
