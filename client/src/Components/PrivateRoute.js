import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../Context";

export default function PrivateRoute({
  children, ...rest
}) {
  const { authenticatedUser } = useContext(Context);
  return (
    <Route
      { ...rest }
      render={({ location }) => 
        authenticatedUser 
        ? children
        : <Redirect 
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
      }
    />
  );
};