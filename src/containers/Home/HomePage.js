import React, { Component } from 'react';
import './HomePage.css';
import Countdown from '../Timer/Timer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Tile from '../../components/UI/Tile/Tile';

class HomePage extends Component {

	state = {

	}

	componentDidMount() {
		
	}
	
	postSelectedHandler = (id) => {
        switch ( id ) {
            case "papers":
                this.props.history.push({pathname: '/dashboard/submitpaper'});
                break;
            case "register":
                this.props.history.push({pathname: '/dashboard/register'});
                break;
            default: ;
        }
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
				<section className="PM">
					<div className="ButtonText">
						<Tile 
							title={"Call for Papers"}
							clicked={() => this.postSelectedHandler('papers')}/>
						<Tile 
							title={'Buy Ticket'}
							clicked={() => this.postSelectedHandler('Register')}/>
					</div>
				</section>
			</div>
        );
    }
}

export default HomePage