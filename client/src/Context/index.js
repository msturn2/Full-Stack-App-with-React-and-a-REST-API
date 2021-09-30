import React, { useState } from "react";
import Cookies from "universal-cookie";
import Data from "../Data/Data";

const cookies = new Cookies();

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  
  //state variables.
  const [ authenticatedUser, setAuthenticatedUser ] = useState(
    cookies.get("authenticatedUser") || null
  );

  const [ userPassword, setUserPassword ] = useState(
    cookies.get("userPassword") || null
  );

  //signin function
  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(emailAddress, password);

    if (user !== null) {
      setAuthenticatedUser(user);
      setUserPassword(password);
    }

    cookies.set("authenticatedUser", user, { path: "/" });
    cookies.set("userPassword", password, { path: "/" });
    return user;
  };

  //sign out function
  const signOut = () => {
    setAuthenticatedUser(null);
    setUserPassword(null);
    cookies.remove("authenticatedUser", { path: "/" });
    cookies.remove("userPassword", { path: "/" });
  };

  //passing state and functions for use through context
  const value = {
    authenticatedUser,
    data,
    userPassword,
    actions: {
      signIn: signIn,
      signOut: signOut,
    },
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

export default { withContext, Context };