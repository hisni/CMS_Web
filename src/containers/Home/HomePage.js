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
						timeTillDate="08 24 2020, 12:38 pm" 
						timeFormat="MM DD YYYY, h:mm a" 
					/>
				</div>
				<div className="AltText">
						<h2><FontAwesomeIcon icon={faCalendarAlt}/> 24 August 2020</h2>
				</div>
				<div className="AltText">
						<h2><FontAwesomeIcon icon={faMapMarkerAlt}/> Silicon Allee Atriumn</h2>
				</div>
				
				<div className="ButtonText">
					<button class="Button">Call for Papers  <FontAwesomeIcon icon={faArrowRight}/></button>
					<button class="Button">Register</button>
				</div>
			</div>
        );
    }
}

export default HomePage