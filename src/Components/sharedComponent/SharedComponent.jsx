import React from "react";
import Header from "../header/HomePageHeader";
import Fotter from "../fotter/Fotter";
import { Outlet } from "react-router-dom";

const SharedComponent = () => {
  return (
    <>
      <Outlet />
      <Fotter />
    </>
  );
};

export default SharedComponent;
