import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import './Profile.css';
import Tile from '../../components/UI/Tile/Tile';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import UserLayout from './UserLayout';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Profile extends Component {

    state = {
        Data:null,
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();
        let url = "https://ecsuop2020.firebaseio.com/ConferenceDetails.json";
        
        axios.get( url)
        .then( response => {
            this.setState({Data: response.data});
        }).catch(err => {
            console.log(err);
        });
    }

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "Edit":
                this.props.history.push({pathname: '/dashboard/editconf'});
                break;
            case "Speakers":
                this.props.history.push({pathname: '/dashboard/editspk'});
                break;
            case "Organizers":
                this.props.history.push({pathname: '/dashboard/editorg'});
                break;
            default: ;
        }
    }

    render() {

        var ConDetails = <Spinner/>;

        if( this.state.Data ){
            const data = this.state.Data;

            ConDetails = (
                <AUX>
                    <div  className="Name">
                        <h1>{data.Name}</h1>
                        <h1>Date: {data.Date}</h1>
                        <h1>Time: {data.Time} GMT</h1>
                        <h1>Venue: {data.Venue}</h1>
                        <h1>Submissions: {data.Submissions} Accepted: {data.Accepted}</h1>
                        <h1>Seats Available: {data.Seats}</h1>
                    </div>
                </AUX>
            )
        }

        var profile = (
            <UserLayout>
                <div className="Profile">
                    <div className="Title">
                        <h1>{this.props.Name}</h1>
                    </div>
                    <div>
                        {ConDetails}
                    </div>
                    <div>
                        <section className="ProfileMangement">
                            <div className="Controls">
                                <Tile 
                                    title={'Edit Conference'}
                                    clicked={() => this.postSelectedHandler('Edit')}/>
                                <Tile 
                                    title={'Speakers'}
                                    clicked={() => this.postSelectedHandler('Speakers')}/>
                                <Tile 
                                    title={'Organizers'}
                                    clicked={() => this.postSelectedHandler('Organizers')}/> 
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
        token: state.auth.token,
        Name: state.auth.first_name + " "+ state.auth.last_name,
        Email: state.auth.email,
        Role: state.auth.user_role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Profile );
