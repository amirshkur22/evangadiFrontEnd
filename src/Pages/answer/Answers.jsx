import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import QuestionAndAnswerHeader from "../../Components/header/QuestionAndAnswerHeader";
import { useNavigate, useParams } from "react-router-dom";
import { dataContext } from "../../App";
import axiosInstance from "../../BaseURL/BaseURL";
import answerStyle from "./answer.module.css";
import { FaUserGraduate } from "react-icons/fa6";

const Answers = () => {
  const { user } = useContext(dataContext);
  const [question, setQuestion] = useState({});
  const [questionWithAnswers, setquestionWithAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const answer = useRef(null);
  const { question_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestionDetailsAndAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axiosInstance.get(
          `answers/question'sAnswer/${question_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
         //http://localhost:2024/api/answers//question'sAnswer/:question_id
        const { title, description, askedBy } = data[0];
        setQuestion({ title, description, askedBy });
        setquestionWithAnswer(data);
      } catch (error) {
        console.error(
          "Error fetching question details and answers:",
          error.response?.data?.msg
        );
        setError(error.response?.data?.msg);
      }
    };

    getQuestionDetailsAndAnswers();
  }, [question_id]);

  const handlAnswer = async (e) => {
    e.preventDefault();
    setError("");
    const answerValue = answer.current.value.trim();
    const token = localStorage.getItem("token");
    if ([answerValue, question_id, user?.user_id].some((value) => !value)) {
      setError("Please provide an answer for the question.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        "/answers/answer",
        {
          user_id: user?.user_id,
          question_id: question_id,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //http://localhost:2024/api/answers/answer
      const newAnswer = {
        ...data.answer,
        answeredBy: user.user_name, 
        answer_text: answerValue, 
        posted_at: new Date().toISOString(), 
      };
      setquestionWithAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
      answer.current.value = "";
    } catch (error) {
      console.error("Error while posting answer:", error.response?.data?.msg);
      setError(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <QuestionAndAnswerHeader />
      <div className="container">
        <div>
          <div className=" d-flex justify-content-between align-items-center mt-2">
            <h1>Questions</h1>
            <h3 className=" text-info">Asked by: {question.askedBy}</h3>
          </div>
          {error && <small>{error}</small>}
          <div className=" d-flex align-items-center">
            <FaArrowCircleRight size={25} />
            <div>
              <h2>{question?.title}?</h2>
              <span className={answerStyle.line1}></span>
            </div>
          </div>
          <p className="ps-4">{question?.description}</p>
        </div>
        <hr />
        <h1>Answer from the community</h1>
        <span className={answerStyle.line1}></span>
        <div className="border border-primary mt-3">
          {questionWithAnswers.length > 0 ? (
            questionWithAnswers.map((answer, index) => (
              <div key={index} className="p-3">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column align-items-center">
                   {answer.answer_text&& <FaUserGraduate size={70} color="#000" />}
                    <p className="text-primary">{answer?.answeredBy}</p>
                  </div>
                  <p>{answer?.answer_text}</p>
                </div>
                <div className="d-flex justify-content-between">
                  {answer?.posted_at && (
                    <small>
                      Posted on: {new Date(answer?.posted_at).toLocaleString()}
                    </small>
                  )}
                </div>
                <hr />
              </div>
            ))
          ) : !loading ? (
            <small className="pb-5 text-capitalize d-flex justify-content-center text-warning fw-bold">
              No answers found for this question!!
            </small>
          ) : null}
        </div>

        <form onSubmit={handlAnswer}>
          <textarea
            ref={answer}
            rows="6"
            cols="50"
            placeholder="post your answer"
          ></textarea>
          <button type="submit" disabled={loading} className={answerStyle.btn}>
            {loading ? "Posting..." : "Post Answer"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Answers;
