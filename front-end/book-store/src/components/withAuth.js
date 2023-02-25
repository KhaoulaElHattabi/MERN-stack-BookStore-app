import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent, allowedRoles) => {
  const Auth = (props) => {
    const role = JSON.parse(localStorage.getItem("user"))?.data.role;

    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
