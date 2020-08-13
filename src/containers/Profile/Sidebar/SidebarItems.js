import React from 'react';

import './SidebarItems.css';
import SidebarItem from './SidebarItem/SidebarItem';

const SidebarItems = (props) => (
    <ul className="SidebarItems">
        <SidebarItem link="/dashboard" >Overview</SidebarItem>
        <SidebarItem link="/dashboard/users" >User Management</SidebarItem>
        <SidebarItem link="/dashboard/submitpaper" >Submit Paper</SidebarItem>
        <SidebarItem link="/dashboard/review" >Review Papers</SidebarItem>
        <SidebarItem link="/dashboard/submissions" >Submissions</SidebarItem>
        <SidebarItem link="/dashboard/conferences" >Past Conferences</SidebarItem>

        
        {/* { !props.isAuthenticated
            ? <SidebarItem link="/login">Login</SidebarItem> 
            : <SidebarItem link="/dashboard">Dashboard</SidebarItem> }

        { !props.isAuthenticated
            ? <SidebarItem link="/register">Register</SidebarItem>
            : <SidebarItem link="/logout">Logout</SidebarItem> } */}
    </ul>
);

export default SidebarItems;