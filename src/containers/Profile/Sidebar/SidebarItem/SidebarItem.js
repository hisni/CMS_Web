import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarItem.css';

const SidebarItem = ( props ) => (
    <li className={["SidebarItem", [props.Type]].join(' ')}>
        <NavLink
            to={props.link} exact
            activeClassName="active">{props.children}</NavLink>
    </li>
);

export default SidebarItem;