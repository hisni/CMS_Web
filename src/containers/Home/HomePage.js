import React, { Component } from 'react';
import './HomePage.css';
import Countdown from '../Timer/Timer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class HomePage extends Component {

	state = {


	}

	componentDidMount() {
    }

    render() {
        return (
			<div className="Home">
				<div>
					<h1 className="T1" >ICDM 2020</h1>
					<h1 className="T2">International Conference on Digital Manufacturing 2020</h1>
				</div>
				<div className="Timer">
					<Countdown 
						timeTillDate="06 30 2020, 6:00 am" 
						timeFormat="MM DD YYYY, h:mm a" 
					/>
				</div>
				<div className="AltText">
						<h2><FontAwesomeIcon icon={faCalendarAlt}/> 30 June 2020</h2>
				</div>
				<div className="AltText">
						<h2><FontAwesomeIcon icon={faMapMarkerAlt}/> Silicon Allee Atrium</h2>
				</div>
				
				<div>
					<button class="Button">Call for Papers  <FontAwesomeIcon icon={faArrowRight}/></button>
					<button class="Button">Register</button>
				</div>
			</div>
        );
    }
}

export default HomePage