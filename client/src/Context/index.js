import React, { useState } from "react";
import Cookies from "js-cookie";
import Data from "../Data/Data";

export const Context = React.createContext(); 
export const Consumer = Context.Consumer;
export const Provider = (props) => {
  const { data } = new Data();

  const [ authenticatedUser, setAuthenticatedUser ] =
    useState(
      Cookies.get("authenticatedUser") || null
    );
  const [ userPassword, setUserPassword ] = 
    useState(
      Cookies.get("credentials") || null
    );
  
  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(
      emailAddress,
      password
    );

    if (user !== null) {
      setAuthenticatedUser(user);
      setUserPassword(password);
    }

    Cookies.set(
      "authenticatedUser",
      user,
      { path: "/" }
    );
    Cookies.set(
      "credentials",
      password,
      { path: "/" }
    );

    return user;
  }

  const signOut = () => {
    setAuthenticatedUser(null);
    setUserPassword(null);
    
    Cookies.remove(
      "authenticatedUser",
      { path: "/" }
    );
    Cookies.remove(
      "credentials",
      { path: "/" }
    );
  }

  const value = {
    authenticatedUser,
    userPassword,
    data,
    actions: {
      signIn,
      signOut
    }
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};