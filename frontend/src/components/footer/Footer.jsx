import React from 'react';
import { FaFacebookF } from 'react-icons/fa'; // Facebook icon
import { FaTwitter } from 'react-icons/fa'; // Twitter icon
import { FaInstagram } from 'react-icons/fa'; // Instagram icon

import './footer.css';

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2024 Your EduNexus platform. All rights are reserved. <br /> Made by <a href="">Himanshu Sharma</a>
            </p>
            <div className="social-links">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
