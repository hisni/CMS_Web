import React from 'react';

import './SidebarItems.css';
import SidebarItem from './SidebarItem/SidebarItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const SidebarItems = (props) => (
    <ul className="SidebarItems">
        
        { props.role === "SuperAdmin"
                ? <Aux>
                    <SidebarItem link="/dashboard" >Overview</SidebarItem>
                    <SidebarItem link="/dashboard/users" >User Management</SidebarItem>
                    <SidebarItem link="/dashboard/submitpaper" >Submit Paper</SidebarItem>
                    <SidebarItem link="/dashboard/review" >Review Papers</SidebarItem>
                    <SidebarItem link="/dashboard/submissions" >Submissions</SidebarItem>
                    <SidebarItem link="/dashboard/conferences" >Past Conferences</SidebarItem>
                </Aux>
                : <Aux>
                    <SidebarItem link="/userdashboard" >Overview</SidebarItem>
                    <SidebarItem link="/dashboard/submitpaper" >Submit Paper</SidebarItem>
                    <SidebarItem link="/dashboard/review" >Review Papers</SidebarItem>
                    <SidebarItem link="/dashboard/submissions" >Submissions</SidebarItem>
                    <SidebarItem link="/dashboard/conferences" >Past Conferences</SidebarItem>
                </Aux> }

    </ul>
);

export default SidebarItems;