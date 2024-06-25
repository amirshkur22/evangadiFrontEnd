import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../App";

const RouteProtector = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { user } = useContext(dataContext);

  useEffect(() => {
    if (user === undefined) {
      return; 
    }
    if (user === null) {
      navigate("/login", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  return user !== undefined ? children : null; 
};

export default RouteProtector;
