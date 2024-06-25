import React, { useContext } from "react";
import logInHeaderStyle from "./header.module.css";
import { Link } from "react-router-dom";
import evangadiLogoB from "../../assets/images/evangadiLogoB.png";
import { dataContext } from "../../App";

const QuestionAndAnswerHeader = () => {
  const { user, handleLogout } = useContext(dataContext);
  // console.log(user);
  return (
    <>
      <header className={`${logInHeaderStyle.headerContainer}`}>
        <div>
          <Link to="/">
            <img src={evangadiLogoB} alt="logo" />
          </Link>
        </div>
        <div className={logInHeaderStyle.linkContainer}>
          <Link to="/">Home</Link>
          <Link to="/how">How it works</Link>
          {!user ? (
            <Link to="/login">
              <button type="button">Sign up</button>
            </Link>
          ) : (
            <button onClick={handleLogout}>Log out</button>
          )}
        </div>
      </header>
    </>
  );
};

export default QuestionAndAnswerHeader;
