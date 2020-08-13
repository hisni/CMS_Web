import React, { Component } from 'react';
import axios from 'axios';

import './Schedule.css';

class Schedule extends Component {

	state = {

	}

	componentDidMount() {
		let url = "https://escuop20.firebaseio.com/Day.json";
		let authData = 25;
		axios.put(url, authData)
        .then(response => {
            console.log(response.data)
            
        })
        .catch(err => {
            console.log(err);
        });

    }

    render() {
        return (
			<div className="Home">
				<div>
					<h1 className="T2" >Under Construction</h1>
					<h1 className="T2">Coming Soon...</h1>
				</div>
			</div>
        );
    }
}

export default Schedule;