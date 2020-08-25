import React, { Component } from 'react';
import './HomePage.css';
import Countdown from '../Timer/Timer';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Tile from '../../components/UI/Tile/Tile';

class HomePage extends Component {

	state = {
		Data:null,
		Title:null,
		Date:null,
		Time:null,
		Venue:null,
	}

	componentDidMount() {
		let url = "https://ecsuop2020.firebaseio.com/ConferenceDetails/Info.json";
        
        axios.get( url)
        .then( response => {
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id: key
				});
				console.log(response.data[key].Title);
				this.setState({Title: response.data[key].Title});
				this.setState({Date: response.data[key].Date});
				this.setState({Time: response.data[key].Time});
				this.setState({Venue: response.data[key].Venue});
            }
            this.setState({Data: fetchedData});
            
        }).catch(err => {
            console.log(err);
        });
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

		let details = null;
		if( this.state.Venue ){
			details = (
				<Aux>
					<div>
						<h1 className="T1" >ICDM 2020</h1>
						<h1 className="T2">{this.state.Title}</h1>
					</div>
					<div className="Timer">
						<Countdown 
							timeTillDate="08 25 2020, 11:30 am" 
							timeFormat="MM DD YYYY, h:mm a" 
						/>
					</div>
					<div className="AltText">
							<h2><FontAwesomeIcon icon={faCalendarAlt}/> {this.state.Date}</h2>
					</div>
					<div className="AltText">
							<h2><FontAwesomeIcon icon={faMapMarkerAlt}/> {this.state.Venue}</h2>
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
				</Aux>
			)
		}

        return (
			<div className="Home">
				{details}
			</div>
        );
    }
}

export default HomePage