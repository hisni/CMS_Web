import React, { Component } from 'react';
import Tile from '../../components/Tile/Tile'

import axios from 'axios';

import './Organizers.css';

class Organizers extends Component {

	state = {
		Data:null
	}

	componentDidMount() {
		let url = "https://ecsuop2020.firebaseio.com/Organizers.json";
        
        axios.get( url)
        .then( response => {
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({Data: fetchedData});
            
        }).catch(err => {
            console.log(err);
        });

	}
	
	tileSelectedHandler = () =>{
		
	}

    render() {

		let Organizers = null;

		if( this.state.Data ){
            var data = [];
    
            this.state.Data.map(d => {
                data.push({
					name: d.Name,
					role: d.Role,
					url: d.url,
                });
                return null;
            });

			// console.log(data);
			
			Organizers = (data.map(key => (
					<Tile
						Name={key.name} 
						url={key.url}
						Description={key.role}
						clicked={ () => this.tileSelectedHandler("Name") }
					/>
				))
			)

		}
		
        return (
			<div className="PageSPK">
				<div>
					<h1 className="T2" >Organizing committee</h1>
				</div>
				<div className="Speakers">
					{Organizers}
				</div>
			</div>
        );
    }
}

export default Organizers;