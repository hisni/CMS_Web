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
			<h4 className="Cen"><a href="https://intelsolutions.de/" target="_blank" rel="noopener noreferrer" >intelsolutions.de</a></h4>
			<h4 className="Cen"><a href="https://architecintel.de/" target="_blank" rel="noopener noreferrer" >architecintel.de</a></h4>
        </div>
		<div className="Right">
            <h3>Have Questions?</h3>
			<div className="HBlock">
				<span className="SP1" ><FontAwesomeIcon icon={faMapMarkerAlt}/></span>
				<h4>IntElligence Solutions,</h4>
				<h4>107 5/10, Senefelderstr,</h4>
				<h4>Offenbach Am Main,</h4>
				<h4>Frankfurt, 78214,</h4>
				<h4>Germany</h4>
			</div>
			<div className="HBlock">
				<span className="SP2" ><FontAwesomeIcon icon={faPhoneAlt}/></span>
				<h4>+6952466012</h4>
			</div>
			<div className="HBlock">
				<span className="SP3" ><FontAwesomeIcon icon={faEnvelope}/></span>
				<h4>icdm2020@intelsolutions.de</h4>
			</div>
        </div>
        <div className="Bottom">
			<h4><FaCopyright color="#eee" /> 2020, IntElligence Solutions - All rights reserved </h4>
        </div>
    </footer>
  )
}

export default Footer;
