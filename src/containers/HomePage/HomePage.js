import React, { Component } from 'react';
import './HomePage.css';
import Countdown from '../Timer/Timer'

class HomePage extends Component {

    render() {
        return (
			<div className="Home">
				<div>
					<h1>ESC 2020</h1>
					<h1>Engineering Students Conference 2020</h1>
				</div>
				<div>
                <Countdown 
                    timeTillDate="06 30 2020, 6:00 am" 
                    timeFormat="MM DD YYYY, h:mm a" 
                />
	
					<h1>Register</h1>
				</div>
			</div>
        );
    }
}

export default HomePage