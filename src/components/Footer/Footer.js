import React from 'react'
import './Footer.css'
import { FaCopyright } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { SocialMediaIconsReact } from 'social-media-icons-react';

const Footer = () => {

  return (
    <footer className="footer">
        <div className="Left">
            <h3>Partners</h3>
        </div>
		<div className="Left">
            <h3>Useful Links</h3>
			<div className="LiBlock" >
				<SocialMediaIconsReact url="https://facebook.com/" icon="facebook" iconColor="#2b161e" backgroundColor="#eee" iconSize="8"/>
			</div>
			<div className="LiBlock" >
				<SocialMediaIconsReact url="https://twitter.com/" icon="twitter" iconColor="#2b161e" backgroundColor="#eee" iconSize="8"/>
			</div>
			<div className="LiBlock" >
				<SocialMediaIconsReact url="https://linkedin.com/" icon="linkedin" iconColor="#2b161e" backgroundColor="#eee" iconSize="8"/>
			</div>
        </div>
        <div className="Left">
            <h3>More Links</h3>
			<h4 className="Cen"><a href="http://www.ce.pdn.ac.lk/" target="_blank" rel="noopener noreferrer" >ce.pdn.ac.lk</a></h4>
			<h4 className="Cen"><a href="https://eng.pdn.ac.lk/" target="_blank" rel="noopener noreferrer" >eng.pdn.ac.lk</a></h4>
        </div>
		<div className="Right">
            <h3>Have Questions?</h3>
			<div className="HBlock">
				<span className="SP1" ><FontAwesomeIcon icon={faMapMarkerAlt}/></span>
				<h4>Department of Computer Engineering,</h4>
				<h4>Faculty of Engineering,</h4>
				<h4>University of Peradeniya,</h4>
				<h4>Peradeniya, 20400,</h4>
				<h4>Sri Lanka</h4>
			</div>
			<div className="HBlock">
				<span className="SP2" ><FontAwesomeIcon icon={faPhoneAlt}/></span>
				<h4>+94771234567</h4>
			</div>
			<div className="HBlock">
				<span className="SP3" ><FontAwesomeIcon icon={faEnvelope}/></span>
				<h4>escuop2020@ce.pdn.ac.lk</h4>
			</div>
        </div>
        <div className="Bottom">
			<h4><FaCopyright color="#eee" /> 2020, Department of Computer Engineering University of Peradeniya - All rights reserved </h4>
        </div>
    </footer>
  )
}

export default Footer;
