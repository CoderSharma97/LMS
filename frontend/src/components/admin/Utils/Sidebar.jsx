import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import './common.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? ">" : "<"} {/* Simple toggle sign */}
      </div>
      <ul>
        <li className="active">
          <Link to={"/admin/dashboard"}>
            <div className="icon">
              <AiFillHome />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/admin/course"}>
            <div className="icon">
              <FaBook />
              <span>Courses</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/admin/users"}>
            <div className="icon">
              <FaUserAlt />
              <span>Users</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/account"}>
            <div className="icon">
              <AiOutlineLogout />
              <span>Logout</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
