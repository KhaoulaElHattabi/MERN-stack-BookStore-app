import React, { Component } from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Cmpnt, allowedRoles) => {
  const Auth = (props) => {
    const role = JSON.parse(localStorage.getItem("user"))?.data.role;

    if (!role || !allowedRoles.includes(role)) {
      localStorage.clear()
      return <Navigate to="/login" />;
    }

    return <Cmpnt {...props} />;
  };

  return Auth;
};

export default withAuth;
