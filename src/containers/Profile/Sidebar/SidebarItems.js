import React from 'react';

import './SidebarItems.css';
import SidebarItem from './SidebarItem/SidebarItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const SidebarItems = (props) => {
    
    let outputEl = null;

    if( props.role === "SuperAdmin" || props.role === "Admin" ){
        outputEl = 
            <Aux>
                <SidebarItem link="/dashboard" >Overview</SidebarItem>
                <SidebarItem link="/dashboard/users" >User Management</SidebarItem>
                <SidebarItem link="/dashboard/submitpaper" >Submit Paper</SidebarItem>
                <SidebarItem link="/dashboard/review" >Review Papers</SidebarItem>
                <SidebarItem link="/dashboard/submissions" >Submissions</SidebarItem>
                <SidebarItem link="/dashboard/conferences" >Past Conferences</SidebarItem>
            </Aux>
    }else if( props.role === "Author" ){
        outputEl = 
            <Aux>
                <SidebarItem link="/dashboard" >Overview</SidebarItem>
                <SidebarItem link="/dashboard/mysubmissions" >My Submissions</SidebarItem>
                <SidebarItem link="/dashboard/submitpaper" >Submit Paper</SidebarItem>
                <SidebarItem link="/dashboard/register" >Register</SidebarItem>
            </Aux>
    }else if( props.role === "Reviewer" ){
        outputEl = 
            <Aux>
                <SidebarItem link="/dashboard" >Overview</SidebarItem>
                <SidebarItem link="/dashboard/mysubmissions" >My Submissions</SidebarItem>
                <SidebarItem link="/dashboard/submitpaper" >Submit Paper</SidebarItem>
                <SidebarItem link="/dashboard/review" >Review Papers</SidebarItem>
                <SidebarItem link="/dashboard/register" >Register</SidebarItem>
            </Aux>
    }

    return (
        <ul className="SidebarItems">
            {outputEl}
        </ul>
        );
   
};

export default SidebarItems;