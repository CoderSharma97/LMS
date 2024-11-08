import React, { useEffect, useState } from "react";
import { CourseData } from "../../../context/CourseContext";
import CourseCard from "../../coursecard/CourseCard";
import "./courses.css";

const Courses = () => {
  const { courses, fetchCourses } = CourseData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourses();
      setLoading(false);
    };
    fetchData();
  }, [fetchCourses]);

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="course-container">
          {courses && courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course._id} course={course} />)
          ) : (
            <p>No courses available yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
