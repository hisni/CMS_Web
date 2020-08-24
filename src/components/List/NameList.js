import React from 'react';

import './NameList.css';

const NameList = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
    </article>
);

export default NameList;