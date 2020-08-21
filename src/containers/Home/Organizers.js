import React, {Component} from 'react';
import {storage} from "../../firebase/firebase";
import axios from 'axios';

class Organizers extends Component {

	state = {
		imageAsFile:null,
		imageAsUrl:null,
	}

	componentDidMount() {

	}
	
	inputChangedHandler = (event) =>{
		const image = event.target.files[0]
		this.setState({imageAsFile: image})
	}

	onSumbitHandler = (event) => {
        event.preventDefault();
		
		if(this.state.imageAsFile === null ) {
			console.error(`not an image, the image file is a ${typeof(this.state.imageAsFile)}`);
		}
        
		const uploadTask = storage.ref(`/Speakers/${this.state.imageAsFile.name}`).put(this.state.imageAsFile);
		
		uploadTask.on('state_changed', 
		(snapShot) => {
			//takes a snap shot of the process as it is happening
			console.log(snapShot)
		}, (err) => {
			//catches the errors
			console.log(err)
		}, () => {
			// gets the functions from storage refences the image storage in firebase by the children
			// gets the download url then sets the image from firebase as the value for the imgUrl key:
			storage.ref('/Speakers').child(this.state.imageAsFile.name).getDownloadURL()
			.then(fireBaseUrl => {
				this.setState({imageAsUrl: fireBaseUrl});
				console.log(fireBaseUrl);
			})
		})

    }

	

    render() {

		let upimage = null;

        if (this.state.imageAsUrl) {
            upimage = <img src={this.state.imageAsUrl} alt="asdad" />
		}
		
        return (
			<div className="App">
				<form onSubmit={this.onSumbitHandler}>
					<input 
						type="file"
						onChange={this.inputChangedHandler}
					/>
					<button>Upload</button>
				</form>
				{upimage}
			</div>
        );
    }
}

export default Organizers;