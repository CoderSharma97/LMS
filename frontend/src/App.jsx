import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Header from "./components/header/Header";
import Verify from "./components/pages/auth/Verify";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Footer from "./components/footer/Footer";
import About from "./components/pages/about/About";
import Account from "./components/pages/account/Account";
import { userData } from "./context/UserContext";
import Loading from "./components/Loading/Loading";
import Courses from "./components/pages/courses/Courses";
import CourseDescription from "./components/pages/courseDescription/CourseDescription";
import PaymentSuccess from "./components/pages/paymentsuccess/PaymentSuccess";
import Dashboard from "./components/pages/dashboard/Dashboard";
import CourseStudy from "./components/pages/coursestudy/CourseStudy";
import Lecture from "./components/pages/lecture/Lecture";
import AdminDashboard from "./components/admin/Dashboard/AdminDashboard";
import AdminCourses from "./components/admin/Courses/AdminCourses";
import AdminUsers from "./components/admin/Users/AdminUsers";

const App = () => {
  const { isAuth, user, loading } = userData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/login"
              element={isAuth ? <Home /> : <Login />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/course/:id" element={isAuth ? <CourseDescription user ={user} /> :<Login />}></Route>
            <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user ={user} /> :<Login />}></Route>
            <Route path="/:id/dashboard" element={isAuth ? <Dashboard user ={user} /> :<Login />}></Route>
            <Route path="/course/study/:id" element={isAuth ? <CourseStudy user ={user} /> :<Login />}></Route>
            <Route path="/lectures/:id" element={isAuth ? <Lecture user ={user} /> :<Login />}></Route>
            <Route path="/admin/dashboard" element={isAuth ? <AdminDashboard user ={user} /> :<Login />}></Route>
            <Route path="/admin/course" element={isAuth ? <AdminCourses user ={user} /> :<Login />}></Route>
            <Route path="/admin/users" element={isAuth ? <AdminUsers user ={user} /> :<Login />}></Route>


          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
