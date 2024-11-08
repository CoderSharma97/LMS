import React, { useState } from "react";
import { FaBook, FaTrash } from "react-icons/fa"; // Importing React Icons
import { server } from "../../main";
import "./courseCard.css";
import { userData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchCourses } = CourseData();
  const { user, isAuth } = userData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        setLoading(true);
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        await fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="Course" className="course-image" />
      <h3>{course.title}</h3>
      <p><strong>Instructor:</strong> {course.createdBy}</p>
      <p><strong>Duration:</strong> {course.duration} hours</p>
      <p><strong>Price:</strong> 💲{course.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                >
                  <FaBook /> Study
                </button>
              ) : (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              className="common-btn"
              onClick={() => navigate(`/course/study/${course._id}`)}
            >
              <FaBook /> Study
            </button>
          )}
        </>
      ) : (
        <button className="common-btn" onClick={() => navigate(`/login`)}>
          Get Started
        </button>
      )}
      <br />
      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="delete-btn"
          disabled={loading}
        >
          {loading ? "Deleting..." : <><FaTrash /> Delete</>}
        </button>
      )}
    </div>
  );
};

export default CourseCard;
