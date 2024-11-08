import React from "react";
import { FaInfoCircle } from "react-icons/fa"; // Importing a React icon for visual enhancement
import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          At <span>Our Company</span>, we are committed to delivering exceptional service and providing innovative solutions that enhance the lives of our customers. Our team is driven by a passion for excellence and a desire to make a meaningful impact in the industries we serve.
        </p>
        <p>
          With a focus on quality, reliability, and customer satisfaction, we offer a wide range of services designed to meet your unique needs. Whether you're looking for personalized advice, premium products, or professional expertise, we are here to support you every step of the way.
        </p>
        <p>
          We believe in building lasting relationships with our clients, founded on trust, integrity, and shared success. Our mission is to be a trusted partner, providing solutions that empower our customers to achieve their goals with confidence.
        </p>
        <a href="/learn-more" className="cta-btn">
          <FaInfoCircle style={{ marginRight: "10px" }} /> Learn More
        </a>
      </div>
    </div>
  );
};

export default About;
