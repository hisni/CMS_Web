import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Conferences.css';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import UserLayout from '../Profile/UserLayout';

class Confernces extends Component {

    state = {
        Data:null
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();

        const tokenData = {
            token: this.props.token
        };

        axios.get( 'test/conferences',tokenData )
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data.result){
                fetchedPosts.push({
                    ...response.data.result[key],
                    id: key
                });
            }
            this.setState({Data: fetchedPosts});
            // console.log(this.state.Data);
        } );
    }

    render() {

        var data = [];
    
        if( this.state.Data ){
            this.state.Data.map(post => {
                data.push({
                    TT: post.title,
                    DE: post.description,
                    DA: post.date,
                    VN: post.venue,
                    ST: post.total_seats,
                    AS: post.available_seats
                    // Humidity: post.Humidity,
                    // stab: post.Stability
                });
                return null;
            });
        }

        data = data.slice(-25);

        // console.log(data);

        var tableData = (
            data.map(TD => (
                <tr>
                    <td>{TD.TT}</td>
                    <td>{TD.DE}</td>
                    <td>{TD.DA}</td>
                    <td>{TD.VN}</td>
                    <td>{TD.ST}</td>
                    <td>{TD.ST}</td>
                </tr>
            ))
        );

        return(
            <AUX>
                <UserLayout>
                    <div className="TrackBg" >
                        <div className="Title">
                            <h1>Conferences</h1>                    
                        </div>
                        <div className="Main">
                            <div className="Search">
                                <label for="sc">Search: </label>
                                <input type="search" id="gsearch" name="dc"/> 
                            </div>
                            <table id="Tdata">
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Venue</th>
                                    <th>Seats Count</th>
                                    <th>Available Seats</th>
                                </tr>
                                {tableData}
                            </table>
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

export default connect(mapStateToProps)(Confernces)