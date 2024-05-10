import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [login, setLogin] = useState(false);
  let get = localStorage.getItem("access");
  let token = localStorage.getItem("token");
  const check = () => {
    if (get === "denied") {
      localStorage.removeItem("token");
      localStorage.removeItem("access");
      localStorage.removeItem("user");
      localStorage.removeItem("rights");
      setLogin(true);
    } else if (token == undefined || token?.length == 0) {
      setLogin(true);
      localStorage.removeItem("token");
      localStorage.removeItem("access");
      localStorage.removeItem("user");
      localStorage.removeItem("rights");
    } else {
      setLogin(false);
    }
  };
  useEffect(() => {
    check();
  }, [get, token]);

  console.log(login);
  return !login ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
