import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Testimonial from '../../testimonials/Testimonial';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to EduNexus</h1>
        <p>Unlock Your Potential with World-Class Learning</p>
        <button onClick={() => navigate("/courses")} className='common-btn'>Get Started</button>
      </div>
      <Testimonial />
    </div>
  );
};

export default Home;
