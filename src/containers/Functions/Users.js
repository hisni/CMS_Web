import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Users.css';
import AUX from '../../hoc/Auxiliary/Auxiliary';

class Profile extends Component {

    state = {
        Data:null
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();

        const tokenData = {
            token: this.props.token
        };

        axios.get( 'test/users',tokenData )
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
                    ID: post.id,
                    FN: post.first_name,
                    LN: post.last_name,
                    EM: post.email,
                    CC: post.country_code
                    // Humidity: post.Humidity,
                    // stab: post.Stability
                });
                return null;
            });
        }

        data = data.slice(-25);

        console.log(data);

        var tableData = (
            data.map(TD => (
                <tr>
                    <td>{TD.ID}</td>
                    <td>{TD.FN}</td>
                    <td>{TD.LN}</td>
                    <td>{TD.EM}</td>
                    <td>{TD.CC}</td>
                </tr>
            ))
        );

        return(
            <AUX>
                <div className="TrackBg" >
                    <div className="Title">
                        <h1>Users</h1>                    
                    </div>
                    <div className="Main">
                        <div className="Search">
                            <label for="sc">Search: </label>
                            <input type="search" id="gsearch" name="dc"/> 
                        </div>
                        <table id="Tdata">
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Country Code</th>
                            </tr>
                            {tableData}
                        </table>
                    </div>
                </div>
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

export default connect(mapStateToProps)(Profile)