import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = ( props ) => (
    <li className={["NavigationItem", [props.Type]].join(' ')}>
        <NavLink
            to={props.link} exact
            activeClassName="active">{props.children}</NavLink>
    </li>
);

export default navigationItem;