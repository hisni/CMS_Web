import React, {Component} from 'react';
import Tile from '../../components/Tile/Tile'

import './Organizers.css';

class Organizers extends Component {

	tileSelectedHandler = (Name) => {
        // this.props.history.push({pathname: '/posts/' + district + '/' + id});
    }
	
	render() {
		return (
			<div >
				<div>
					<h1 className="T2" >Organizing Committee</h1>
				</div>
				<div className="Organizers">
					<Tile
						Name="Hisni Mohammed" 
						url="https://firebasestorage.googleapis.com/v0/b/ecsuop2020.appspot.com/o/Speakers%2F1c.jpg?alt=media&token=4db4b982-bf15-4819-89b9-d950805985e7"
						Description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
						clicked={ () => this.tileSelectedHandler("Name") }
					/>
					<Tile
						Name="Suhail Sajahan" 
						url="https://firebasestorage.googleapis.com/v0/b/ecsuop2020.appspot.com/o/Speakers%2F1c.jpg?alt=media&token=4db4b982-bf15-4819-89b9-d950805985e7"
						Description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
						clicked={ () => this.tileSelectedHandler("Name") }
					/>
					<Tile
						Name="Mohamed Aslam" 
						url="https://firebasestorage.googleapis.com/v0/b/ecsuop2020.appspot.com/o/Speakers%2F1c.jpg?alt=media&token=4db4b982-bf15-4819-89b9-d950805985e7"
						Description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
						clicked={ () => this.tileSelectedHandler("Name") }
					/>
					<Tile
						Name="Cristina Ale" 
						url="https://firebasestorage.googleapis.com/v0/b/ecsuop2020.appspot.com/o/Speakers%2FFemale.jpeg?alt=media&token=63c14303-c804-4945-978e-367bf9ff4982"
						Description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
						clicked={ () => this.tileSelectedHandler("Name") }
					/>
					<Tile
						Name="Robert Lows" 
						url="https://firebasestorage.googleapis.com/v0/b/ecsuop2020.appspot.com/o/Speakers%2FMale.png?alt=media&token=d234fca0-2fd8-4f76-b7f4-bfcc0fb5ba6b"
						Description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
						clicked={ () => this.tileSelectedHandler("Name") }
					/>
				</div>
			</div>
		);

	}
}

export default Organizers;
