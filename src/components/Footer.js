import React from 'react';
import './FooterStyles.css';
import { Link } from 'react-router-dom';
import {FaFacebook, FaLinkedin, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-container'>
            <div className='footer-section'>
                <h4>Cover up when the index hits 3!</h4>
                <p>Sun is bright, it is a great day to be outdoors with your family and friends. However, we are exposed to some of the strongest and most hazardous UV rays when we are outside.</p>
                <Link to="/measures" className="learn-cover-up">Learn how to cover up</Link>
            </div>
            <div className='footer-section'>
                <h4>Sensitive skin?</h4>
                <p>What about those who suffer from itchy rashes, irritations, or even breakouts from using sunscreen? It is important to know how your skin reacts to sunscreen. Every skin type has the right to be protected safely and comfortably.</p>
                <Link to="/measures" className="learn-cover-up">Learn what works for you</Link>
            </div>
        </div>
    </div>
  );
}

export default Footer;
