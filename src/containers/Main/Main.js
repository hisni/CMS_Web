import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Main.css';
import Layout from '../../hoc/Layout/Layout';
import Login from '../../containers/Auth/Login';
import Signup from '../../containers/Auth/Signup';
import HomePage from '../../containers/Home/HomePage';
import Schedule from '../../containers/Home/Schedule';
import Speakers from '../../containers/Home/Speakers';
import Organizers from '../../containers/Home/Organizers';
import Logout from '../../containers/Auth/Logout';
import Profile from '../../containers/Profile/Profile';
import Paper from '../../containers/Functions/Paper';
// import Users from '../../containers/Functions/Users';
import Conferences from '../../containers/Functions/Page';
import Submissions from '../../containers/Functions/Submissions';
import EditConf from '../Profile/ConfFunctions/EditConf';
import EditOrg from '../Profile/ConfFunctions/EditOrg';
import EditSpk from '../Profile/ConfFunctions/EditSpk';

import Users from '../../containers/Users/Users'
import * as actions from '../../store/actions/index';

class Main extends Component {

    componentDidMount(){
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={Login} />                        
                <Route path="/register" exact component={Signup} />  
                <Route path="/schedule" exact component={Schedule} />
                <Route path="/speakers" exact component={Speakers} />
                <Route path="/organizers" exact component={Organizers} />
                <Route path="/users" exact component={Users} />                                                           
                <Redirect to="/" />
            </Switch>
        );
      
        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" exact component={Login} />     
                    <Route path="/dashboard" exact component={Profile} /> 
                    <Route path="/schedule" exact component={Schedule} />
                    <Route path="/speakers" exact component={Speakers} />  
                    <Route path="/organizers" exact component={Organizers} />             
                    <Route path="/logout" exact component={Logout} />                    
                    <Route path="/dashboard/submitpaper" exact component={Paper} />                        
                    <Route path="/dashboard/users" exact component={Users} />  
                    <Route path="/dashboard/conferences" exact component={Conferences} />                         
                    <Route path="/dashboard/submissions" exact component={Submissions} /> 
                    <Route path="/dashboard/editconf" exact component={EditConf} />                         
                    <Route path="/dashboard/editspk" exact component={EditSpk} /> 
                    <Route path="/dashboard/editorg" exact component={EditSpk} />                         
                    
                    <Redirect to="/" />                        
                </Switch>
            );
        }

        return (
            <div className="Main">
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() ),
        // onTryAutoAdminSignup: () => dispatch( actions.adminAuthCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Main ));