import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/login/Login";
import SignUp from "./Pages/signup/SignUp";
import PageNotFound from "./Pages/PageNotFound";
import axiosInstance from "./BaseURL/BaseURL";
import SharedComponent from "./Components/sharedComponent/SharedComponent";
import Home from "./Pages/home/Home";
import AskQuestions from "./Pages/questions/AskQuestions";
import RouteProtector from "./Components/routeProtector/RouteProtector";
import QuestionsList from "./Pages/questions/QuestionsList";
import Answers from "./Pages/answer/Answers";

export const dataContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axiosInstance.get("/users/check", {
          headers: { authorization: "Bearer " + token },
        });
        setUser(data);
      } catch (error) {
        console.log(error?.response?.data?.error);
        setUser(null); // Explicitly set user to null if check fails
        navigate("/login");
      }
    };
    if (token) {
      checkUser();
    } else {
      setUser(null); // Explicitly set user to null if no token
    }
  }, [token]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // console.log("App user:", user);

  return (
    <dataContext.Provider value={{ user, setUser, handleLogout }}>
      <Routes>
        <Route path="/" element={<SharedComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/questionsList"
            element={
              <RouteProtector
                msg="You must be logged in to view questions"
                redirect="/questionsList"
              >
                <QuestionsList />
              </RouteProtector>
            }
          />
          <Route
            path="/askQuestion"
            element={
              <RouteProtector
                msg="You must be logged in to ask questions"
                redirect="/askQuestion"
              >
                <AskQuestions />
              </RouteProtector>
            }
          />
          <Route
            path="/question'sAnswer/:question_id"
            element={
              <RouteProtector
                msg="You must be logged in to answer"
                redirect="/question'sAnswer/:question_id"
              >
                <Answers />
              </RouteProtector>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </dataContext.Provider>
  );
}

export default App;
