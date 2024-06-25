import React, { useContext, useRef, useState } from "react";
import { dataContext } from "../../App";
import askStyle from "./question.module.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import QuestionAndAnswerHeader from "../../Components/header/QuestionAndAnswerHeader";
import axiosInstance from "../../BaseURL/BaseURL";
const AskQuestions = () => {
  const { user } = useContext(dataContext);
  const [title, description] = [useRef(null), useRef(null)];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleQuestionAsk = async (e) => {
    e.preventDefault();
    setError("");
    const titleValue = title.current.value.trim();
    const descriptionValue = description.current.value.trim();
    const token = localStorage.getItem("token");
    if ([titleValue, descriptionValue, user.user_id].some((value) => !value)) {
      setError("Please provide title, description.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        "/questions/askQuestion",
        {
          user_id: user?.user_id,
          title: titleValue,
          description: descriptionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // http://localhost:2024/api/questions/askQuestion
      navigate("/questionsList");
    } catch (error) {
      console.error(
        "Error while posting question:",
        error.response?.data?.msg || error.message
      );
      setError(error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <QuestionAndAnswerHeader />
      <div className="container my-5">
        <div className="position-relative">
          <h1>Steps To Write A Good Questions.</h1>
          <span className={askStyle.line1}></span>
        </div>
        <div>
          {[
            "Summarize your problem in a one-line title.",
            "Describe your problem in more detail.",
            "Describe what you tried and what you expected to happen.",
            "Review your question and post it here.",
          ].map((tip, index) => (
            <div className="d-flex ms-4" key={index}>
              <FaArrowCircleRight />
              <p>{tip}</p>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-center">Post Your Question</h1>
          <form action="" onSubmit={handleQuestionAsk}>
            <input type="text" placeholder="Question Title" ref={title} />
            <textarea
              ref={description}
              rows="6"
              cols="50"
              placeholder="Question detail..................."
            ></textarea>
            {error && <small className=" text-danger">{error}</small>}
            <button
              type="submit"
              className=" mt-3  w-25  mx-auto "
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Question"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AskQuestions;
