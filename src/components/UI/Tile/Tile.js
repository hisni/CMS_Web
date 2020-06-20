import React from 'react';

import './Tile.css';

const post = (props) => (
    <article className="Tile" onClick={props.clicked}>
        <p>{props.title}</p>
    </article>
);

export default post;