import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import './UserLayout.css';
import SidebarItems from './Sidebar/SidebarItems'

class UserLayout extends Component {
    
    render () {
        return (
            <Aux>
                <div className="UserLayout">
                    <SidebarItems 
                        isAuth={this.props.isAuthenticated}
                        // isAuth={true}
                        drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <main className="mainContent">
                        {this.props.children}
                    </main>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(UserLayout);