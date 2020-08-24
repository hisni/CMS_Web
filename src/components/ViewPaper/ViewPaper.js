import React from 'react';
import AUX from '../../hoc/Auxiliary/Auxiliary';

// import './ViewPaper.css';

const ViewPaper = (props) => {
    
    // console.log(props)
    let url = "http://localhost:3000/" + props.url;
    return (
        <AUX>
            <div>
                <embed src={url} width="800px" height="1160px" ></embed>
            </div>
        </AUX>
    );
    
};

export default ViewPaper;