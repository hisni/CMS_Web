import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" >Home</NavigationItem>
        <NavigationItem link="/schedule" >Schedule</NavigationItem>
        <NavigationItem link="/speakers" >Speakers</NavigationItem>
        <NavigationItem link="/organizers" >Organizers</NavigationItem>
        
        { !props.isAuthenticated
            ? <NavigationItem link="/login">Login</NavigationItem> 
            : <NavigationItem link="/profile">Dashboard</NavigationItem> }

        { !props.isAuthenticated
            ? <NavigationItem link="/register">Register</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationItems;