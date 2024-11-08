import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../../context/CourseContext";
import { server } from "../../../main";
import "./courseDescription.css";
import { userData } from "../../../context/UserContext";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import axios from "axios";
import PaymentGateway from "../../payment gateway/payment gateway/PaymentGateway";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  const navigate = useNavigate();
  const { fetchUser } = userData();

  const[showPayment, setShowPayment] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const data = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      console.log(data.data.razorpay_payment_id);

      await fetchUser();
      await fetchCourses();
      await fetchMyCourse();
      toast.success("payment successfull");
      setLoading(false);
      navigate(`/payment-success/${data.data.razorpay_payment_id}`);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <> {showPayment && (<PaymentGateway checkoutHandler = {checkoutHandler} setShowPayment = {setShowPayment}/>)}
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>instructor : {course.createdBy}</p>
                  <p>Duration : {course.duration} hours</p>
                </div>
              </div>
              <p>{course.description}</p>

              <p>Lets get started with course @{course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                >
                  Study
                </button>
              ) : (
                <button className="common-btn" onClick={()=>setShowPayment(true)}>
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
