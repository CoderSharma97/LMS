import React, { useEffect } from 'react';
import './courseStudy.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../../context/CourseContext';
import { server } from '../../../main';

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  // Redirect if user is not subscribed
  if (user && user.role !== 'admin' && !user.subscription.includes(params.id)) {
    return navigate('/');
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <div className="course-study-wrapper">
      {course && (
        <div className="course-study-container">
          <div className="course-study-header">
            <div className="course-image-container">
              <img src={`${server}/${course.image}`} alt={course.title} />
            </div>
            <div className="course-info">
              <h2>{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <div className="course-meta">
                <h5>Instructor: {course.createdBy}</h5>
                <h5>Duration: {course.duration}</h5>
              </div>
            </div>
          </div>
          <div className="course-actions">
            <Link to={`/lectures/${course._id}`} className="lectures-link">
              <span>Start Lectures</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseStudy;
