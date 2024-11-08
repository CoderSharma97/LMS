import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../../context/UserContext";

const Verify = () => {
  const { btnLoading, verifyOtp } = userData();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Account Verification</h2>
        <p>Enter the OTP sent to your email to verify your account.</p>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="number"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP here"
            required
          />

          <button type="submit" disabled={btnLoading} className="common-btn">
            {btnLoading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="redirect">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Verify;
