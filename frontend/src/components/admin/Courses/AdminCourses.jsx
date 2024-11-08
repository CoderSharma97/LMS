import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../../context/CourseContext";
import CourseCard from "../../coursecard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../../main";
import "./adminCourses.css";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const { courses, fetchCourses } = CourseData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "Artificial Intelligence",
  ];

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myform = new FormData();

    myform.append("title", title);
    myform.append("description", description);
    myform.append("category", category);
    myform.append("price", price);
    myform.append("createdBy", createdBy);
    myform.append("duration", duration);
    myform.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myform, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCategory("");
      setPrice("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => <CourseCard key={e._id} course={e} />)
            ) : (
              <p>No Courses yet. Please add some.</p>
            )}
          </div>
        </div>

        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add Course</h2>
              <form onSubmit={submitHandler}>
                <label htmlFor="title">Course Title</label>
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="createdBy">Created By</label>
                <input
                  type="text"
                  id="createdBy"
                  required
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                />
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label htmlFor="duration">Duration (in hours)</label>
                <input
                  type="number"
                  id="duration"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <label htmlFor="image">Course Image</label>
                <input
                  type="file"
                  id="image"
                  required
                  onChange={changeImageHandler}
                />
                {imagePrev && <img src={imagePrev} alt="Preview" width={300} />}
                <button type="submit" className="common-btn" disabled={btnLoading}>
                  {btnLoading ? "Adding..." : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
