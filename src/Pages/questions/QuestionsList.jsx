import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../../App";
import {  Link, useNavigate } from "react-router-dom";
import QuestionAndAnswerHeader from "../../Components/header/QuestionAndAnswerHeader";
import axiosInstance from "../../BaseURL/BaseURL";
import { FaUserGraduate } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import questionListStyle from './question.module.css'
const QuestionsList = () => {
  const { user } = useContext(dataContext);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getQuestionsList = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axiosInstance.get("/questions/questionsList", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //http://localhost:2024/api/questions/questionsList
        setQuestions(data);
      } catch (error) {
        setError(error.response?.data?.error);
      }
    };
    getQuestionsList();
  }, []);
  return (
    <>
      <QuestionAndAnswerHeader />
      <div className="d-flex justify-content-between container  my-4">
        <button
          onClick={() => navigate("/askQuestion")}
          className="btn-primary border-0  p-2 "
        >
          Ask question
        </button>
        <h3>Welcome: {user?.user_name}</h3>
      </div>
      <div className="container">
        <hr />
        {error && <p className="text-danger">{error}</p>}
        {questions.length === 0 && !error ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question) => (
            <>
              <Link to={`/question'sAnswer/${question.question_id}`}
                key={question.question_id}
                className={`${questionListStyle.question} d-flex  align-items-center text-decoration-none p-3`}
              >
                <div className=" d-flex flex-column pe-5">
                  <FaUserGraduate size={50} color="#000" />
                  <small>{question.user_name}</small>
                </div>
                <div className=" d-flex flex-fill justify-content-between">
                  <p
                    className=" text-primary text-decoration-none fs-4"
                    to={"/"}
                  >
                    {question.title}
                  </p>
                  <MdArrowForwardIos className={questionListStyle.arrowIcon} />
                </div>
              </Link>
              <hr />
            </>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionsList;
