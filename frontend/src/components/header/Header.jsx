import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ isAuth }) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <header>
      <div className="logo" onClick={handleScrollToTop}>
        EduNexus
      </div>

      <div className="link">
        <Link to="/" onClick={handleScrollToTop}>
          Home
        </Link>
        <Link to="/courses" onClick={handleScrollToTop}>
          Courses
        </Link>
        <Link to="/about" onClick={handleScrollToTop}>
          About
        </Link>
        {isAuth ? (
          <Link to="/account" className="auth-link" onClick={handleScrollToTop}>
            Account
          </Link>
        ) : (
          <Link to="/login" className="auth-link" onClick={handleScrollToTop}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
