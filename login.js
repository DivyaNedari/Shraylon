/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import "./login.css";

function Login() {
  const [phoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(null);
  const [resendEnabled, setResendEnabled] = useState(false);

  // const handlePhoneNumberChange = (value) => {
  //   setPhoneNumber(value);
  // };

  const handleCountryCodeChange = (value) => {
    setCountryCode(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validPhoneNumber = isPhoneNumberValid();
    if (validPhoneNumber) {
      console.log("Phone number submitted:", countryCode + phoneNumber);
      setStep(2);
      startTimer();
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  const handleResendClick = () => {
    setTimer(60);
    setResendEnabled(false);
    startTimer();
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted");
    clearInterval(intervalId);
    setTimer(60);
    e.target.reset();
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(id);
          setResendEnabled(true);
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalId);
      setResendEnabled(true);
    }
  }, [timer, intervalId]);

  const isPhoneNumberValid = () => {
    switch (countryCode) {
      case "+91":
        return phoneNumber.length === 10;
      default:
        return true;
    }
  };

  return (
    <div className="login-container">
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2
              className="login"
              style={{
                textAlign: "center",
              }}
            >
              Login
            </h2>
            <label htmlFor="countryCode">Mobile Number</label>
            <PhoneInput
              value={countryCode}
              onChange={handleCountryCodeChange}
              containerStyle={{ width: "100%" }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {step === 2 && (
        <div>
          <form onSubmit={handleOTPSubmit}>
            <div className="form-group">
              <h2
                style={{
                  textAlign: "center",
                }}
              >
                Enter OTP
              </h2>
              <label htmlFor="otpInput">OTP:</label>
              <input
                type="text"
                id="otpInput"
                placeholder="Enter OTP"
                required
              />
            </div>
            {timer === 0 && (
              <p>
                Resend OTP:{" "}
                <a
                  href="#"
                  onClick={handleResendClick}
                  disabled={!resendEnabled}
                  style={{
                    pointerEvents: resendEnabled ? "auto" : "none",
                    color: resendEnabled ? "inherit" : "#ccc",
                  }}
                >
                  Resend
                </a>
              </p>
            )}
            {timer > 0 && <h6>Resend OTP after {timer} seconds</h6>}
            <button type="submit">Verify OTP</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;