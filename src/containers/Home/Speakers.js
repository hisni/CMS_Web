import React, { Component } from 'react';
import Tile from '../../components/Tile/Tile'

import axios from 'axios';

import './Speakers.css';

class Speakers extends Component {

	state = {
		Data:null
	}

	componentDidMount() {
		let url = "https://ecsuop2020.firebaseio.com/Speakers.json";
        
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

		let speakers = null;

		if( this.state.Data ){
            var data = [];
    
            this.state.Data.map(d => {
                data.push({
					name: d.Name,
					des: d.Description,
					url: d.url,
                });
                return null;
            });

			// console.log(data);
			
			speakers = (data.map(key => (
					<Tile
						Name={key.name} 
						url={key.url}
						Description={key.des}
						clicked={ () => this.tileSelectedHandler() }
					/>
				))
			)

		}
		
        return (
			<div className="PageSPK">
				<div>
					<h1 className="T2" >Keynote Speakers</h1>
				</div>
				<div className="Speakers">
					{speakers}
				</div>
			</div>
        );
    }
}

export default Speakers;