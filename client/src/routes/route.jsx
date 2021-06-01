import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// const currentUser = localStorage.getItem("token");
// const role = localStorage.getItem("role");

export const AuthRoute = ({ component: Component, ...rest }) => {
  const role = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  //   const { authenticated } = useSelector((state) => state.auth);
  // const currentUser = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === false) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props}></Component>;
        }
      }}
    />
  );
};

export const UserRoute = ({ component: Component, ...rest }) => {
  const role = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const currentUser = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  console.log('IsAuthenticated ',isAuthenticated)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === false) {
          return <Redirect to="/" />;
        } else {
          if (role === "DE") {
            return <Redirect to="/deliverypage" />;
          } else {
            return <Component {...props}></Component>;
          }
        }
      }}
    />
  );
};

export const DeliveryExecutiveRoute = ({ component: Component, ...rest }) => {
  const role = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const currentUser = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === false) {
          return <Redirect to="/" />;
        } else {
          if (role === "NU") {
            return <Redirect to="/" />;
          } else {
            return <Component {...props}></Component>;
          }
        }
      }}
    />
  );
};
