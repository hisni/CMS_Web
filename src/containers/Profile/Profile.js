import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import './Profile.css';
import Tile from '../../components/UI/Tile/Tile';
import AUX from '../../hoc/Auxiliary/Auxiliary';

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

        // const tokenData = {
        //     token: this.props.token
        // };

        // axios.get( 'test/submissions',tokenData )
        // .then( response => {
        //         console.log(response);
        //     const fetchedNodes = [];
        //     for(let key in response.data){
        //         fetchedNodes.push({
        //             ...response.data[key],
        //             id: key
        //         });
        //     }
        //     this.setState({RelayNodes: fetchedNodes});

        //     this.state.RelayNodes.map(nodes => {
        //         const updatedControls = {
        //             ...this.state.Controls,
        //         };
        //         updatedControls.Nodes.elementConfig.options.push(
        //                 { value: nodes.id, displayValue: nodes.id }
        //         )
        //         this.setState({Controls: updatedControls});
        //         return true;
        //     })
        //     // console.log(this.state.Coordinates);
        // } );
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

export default connect(mapStateToProps)(Profile)