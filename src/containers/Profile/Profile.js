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
        let url = "https://ecsuop2020.firebaseio.com/ConferenceDetails/Info.json";
        
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

            // console.log(this.state.Data);
            
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
            var data = [];
            this.state.Data.map(d => {
                data.push({
                    title: d.Title,
                    venue: d.Venue,
                    date: d.Date,
                    time: d.Time,
                    seats: d.Seats,
                    submissions: d.Submissions,
                    accepted: d.Accepted,
                });
                return null;
            });
        
            data = data.slice(-1)[0];

            console.log(data);

            ConDetails = (
                <AUX>
                    <div  className="Name">
                        <h1>{data.title}</h1>
                        <h1>Date: {data.date}</h1>
                        <h1>Time: {data.time} GMT</h1>
                        <h1>Venue: {data.venue}</h1>
                        <h1>Submissions: {data.submissions} Accepted: {data.accepted}</h1>
                        <h1>Seats Available: {data.seats}</h1>
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
