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

// .Home {
//     margin: 0 auto;
// 	min-height: 50vh;
// 	align-items: center;
// }

// .Button {
// 	width: 235px;
//     text-align: center;
//     text-decoration: none;
// 	border-radius: 8px;
// 	background-color: #693e4f;
//     color: #c3cfe2;
//     outline: none;
//     cursor: pointer;
//     font: inherit;
//     font-size: 24px;
//     font-weight: bold;
//     transition-duration: 0.4s;
// 	padding: 15px 15px;
// 	margin: 25px 30px;
// }

// .Button:hover {
//     background-color: #8b6977;
//     color: #dbdfe7;
// }

// .Button:disabled {
//     /* color: rgb(37, 241, 146); */
//     opacity: .3;
// 	cursor: not-allowed;
// }

// .T1{
// 	font-size: 68px;
// 	font-weight: bolder;
// 	color: #2a264b;
// 	padding: 20px 0 40px 0;	

// }

// .T2{
// 	font-size: 36px;
// 	font-weight: bold;
// 	color: #4d3e69;
// 	padding: 0 0 20px 0;
// }

// .h2{
// 	padding: 10px 0;
// }
// .AltText{
// 	font-size: 24px;
// 	font-weight: bold;
// 	color: #4b2626;
// 	padding: 15px 0 15px 0;	
// }

// Timer{
// 	clear: both;
// 	float: none;
// 	padding: 40px 0;
// }