import React, { useState, useEffect } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../../main";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const myform = new FormData();
    myform.append("title", title);
    myform.append("description", description);
    myform.append("file", video);

    try {
      const data = await axios.post(
        `${server}/api/course/${params.id}`,
        myform,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        await fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecLoading ? (
              <Loading />
            ) : lecture.video ? (
              <>
                <video
                  src={`${server}/${lecture.video}`}
                  width={"100%"}
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  autoPlay
                ></video>
                <h1>{lecture.title}</h1>
                <h3>{lecture.description}</h3>
              </>
            ) : (
              <h1>Please select a lecture</h1>
            )}
          </div>
          <div className="right">
            {user && user.role === "admin" && (
              <button
                className="common-btn"
                onClick={() => setShow(!show)}
                disabled={btnLoading}
              >
                {btnLoading ? "Please Wait..." : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title">Title</label>
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
                  <input
                    type="file"
                    required
                    placeholder="Choose video"
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video src={videoPrev} alt="" width={300} controls />
                  )}
                  <button type="submit" className="common-btn">
                    {btnLoading ? "Uploading..." : "Add Lecture"}
                  </button>
                </form>
              </div>
            )}

            {lectures && lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div key={i}>
                  <div
                    className={`lecture-number ${
                      lecture._id === e._id ? "active" : ""
                    }`}
                    onClick={() => fetchLecture(e._id)}
                  >
                    {e.title}
                  </div>
                  {user && user.role === "admin" && (
                    <button
                      onClick={() => deleteHandler(e._id)}
                      className="common-btn delete-btn"
                    >
                      Delete {e.title}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No lectures yet</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
