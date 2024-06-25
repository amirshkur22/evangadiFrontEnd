// Login.jsx
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseURL/BaseURL";
import loginStyle from "./login.module.css";
import QuestionAndAnswerHeader from "../../Components/header/QuestionAndAnswerHeader";
import SignUp from "../signup/SignUp";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [logInEmail, logInPassword] = [useRef(null), useRef(null)];
  const [loading, setLoading] = useState(false);
  const [logInError, setLogInError] = useState("");
  const [change, setChange] = useState(false);
console.log(logInEmail)
  const handleChange = () => {
    setChange(!change);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLogInError("");
    setLoading(true);

    if ([logInEmail.current.value, logInPassword.current.value].some((value) => !value)) {
      setLoading(false);
      setLogInError("Please provide all required information");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/users/login", {
        email: logInEmail.current.value,
        password: logInPassword.current.value,
      });
      setLoading(false);
      localStorage.setItem("token", data.token);
      navigate(state?.redirect || "/questionsList");
    } catch (error) {
      setLogInError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <QuestionAndAnswerHeader />
      <section className={loginStyle.outerContainer}>
        <div className="container ">
          <div className="row">
            {!change ? (
              <div className={`${loginStyle.firstChild} col me-2 mt-5`}>
                <div>
                  {state?.msg && (
                    <small style={{ color: "red" }}>{state?.msg}</small>
                  )}
                  <h3>Log in to your account</h3>
                  <p>
                    Don't have an account?
                    <Link to="" onClick={handleChange}>
                      Create a new account
                    </Link>
                  </p>
                </div>
                <div className={loginStyle.formContainer}>
                  <form action="" onSubmit={handleLogIn}>
                    <div>
                      <input
                        type="email"
                        ref={logInEmail}
                        placeholder="Enter valid  email"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        ref={logInPassword}
                        placeholder="Enter correct pasword"
                      />
                    </div>
                    {logInError && <p style={{ color: "red" }}>{logInError}</p>}
                    <button type="submit">
                      {loading ? "Loading..." : "Log in"}
                    </button>
                    <Link to={""} onClick={handleChange}>
                      create an account
                    </Link>
                  </form>
                </div>
              </div>
            ) : (
              <SignUp change={change} handleChange={handleChange} />
            )}
            <div className={`${loginStyle.secondChild} col me-2`}>
              <p>About</p>
              <h2>Evangadi Networks</h2>
              <p>
                No matter what stage of life you are in, whether you’re just
                starting elementary school or being promoted to CEO of a Fortune
                500 company, you have much to offer to those who are trying to
                follow in your footsteps.
              </p>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
              <button type="button" className={loginStyle.btn}>
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
