import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { userData } from "../../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = userData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name - {user.name}</strong>
            </p>
            <p>
              <strong>Email - {user.email}</strong>
            </p>
            <button
              className="common-btn"
              onClick={() => navigate(`/${user._id}/dashboard`)}
            >
              <MdDashboard />
              Dashboard
            </button>
            <br />
            {user.role === "admin" && (
              <button
                className="common-btn"
                onClick={() => navigate(`/admin/dashboard`)}
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}
            <br />
            <button
              onClick={logoutHandler}
              className="common-btn logout"
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
