import React, { useRef, useState } from "react";
import axiosInstance from "../../BaseURL/BaseURL";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sighUpStyle from "./signup.module.css";
const SignUp = ({ change, handleChange }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, firstName, lastName, email, password] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      [
        userName.current.value,
        firstName.current.value,
        lastName.current.value,
        email.current.value,
        password.current.value,
      ].some((value) => !value)
    ) {
      setErrorMessage("Please provide all required information");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/users/register", {
        userName: userName.current.value,
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      navigate(state?.redirect || "/questionsList");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className={`${sighUpStyle.firstChild} col me-2 mt-5`}>
      <h4 style={{ color: "#344798" }}>Join the network</h4>
      <p>
        Already have an account?{" "}
        <Link to="" onClick={handleChange}>
          Sign in
        </Link>
      </p>
      <form action="" onSubmit={handleSignUp}>
        <div>
          <input type="text" ref={userName} placeholder="Enter user name" />
        </div>

        <div>
          <div>
            <input type="text" ref={firstName} placeholder="Enter First name" />
          </div>
          <div>
            <input type="text" ref={lastName} placeholder="Enter Last name" />
          </div>
        </div>
        <div>
          <input type="email" ref={email} placeholder="Enter valid  email" />
        </div>
        <div>
          <input
            type="password"
            ref={password}
            placeholder="Enter correct pasword"
          />
        </div>
        <p>
          I agree to <Link to="privacy">privacy policy</Link>and{" "}
          <Link to="/term">terms of service</Link>
        </p>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">agree and join</button>
        <Link to="" onClick={handleChange}>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
