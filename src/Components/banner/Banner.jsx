import React from "react";
import bannerStyle from "./banner.module.css";
import { useNavigate } from "react-router-dom";
import useCountUp from "../useCountUp/useCountUp";

const Banner = () => {
  const registeredMembers = useCountUp(31000, 2000); // 2 seconds
  const scholarshipWinners = useCountUp(1500, 2000); // 2 seconds
  const activeStudents = useCountUp(2500, 2000);
  const navigate = useNavigate();
  return (
    <>
      <section className={bannerStyle.bannerContainer}>
        <div>
          <h1>
            Bypass The Industrial,<span>Dive Into The Digital!</span>{" "}
          </h1>
          <h4>
            Before us is a golden opportunity, demanding us to take a bold step
            forward and
            <span>join the new digital era.</span>
          </h4>
          <div className={bannerStyle.buttonContainer}>
            <button type="button" onClick={() => navigate("/signup")}>
              create account
            </button>
            <button type="button" onClick={() => navigate("/login")}>
              sign in
            </button>
          </div>
        </div>
      </section>
      <section className={`${bannerStyle.lowerBanner} container`}>
        <div className={bannerStyle.stats}>
          <div className={bannerStyle.stat}>
            <h2>{registeredMembers}+</h2>
            <p>Registered Members</p>
            <p className="col-description">
              These are the individuals who have faith in the vision and became
              part of the movement.
            </p>
          </div>
          <div className={bannerStyle.stat}>
            <h2>{scholarshipWinners}+</h2>
            <p>Scholarship Winners</p>
            <p className="col-description">
              We are only as strong as our weakest link. We try to include
              everyone in the journey.
            </p>
          </div>
          <div className={bannerStyle.stat}>
            <h2>{activeStudents}+</h2>
            <p>Active Students</p>
            <p className="col-description">
              These are students trying to acquire the necessary digital skills
              to compete globally.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
