import React, { useState } from "react";
import Cookies from "js-cookie";
import Data from "../Data/Data";

export const Context = React.createContext(); 
export const Consumer = Context.Consumer;
export const Provider = (props) => {
  const { data } = new Data();
  const cookie = new Cookie();
  const [ authenticatedUser, setAuthenticatedUser ] =
    useState(
      cookies.get("authenticatedUser") || null
    );
  const [ userPassword, setUserPassword ] = 
    useState(
      cookies.get("credentials") || null
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

    cookies.set(
      "authenticatedUser",
      user,
      { path: "/" }
    );
    cookies.set(
      "credentials",
      password,
      { path: "/" }
    );

    return user;
  }

  const signOut = () => {
    setAuthenticatedUser(null);
    setUserPassword(null);
    
    cookies.remove(
      "authenticatedUser",
      { path: "/" }
    );
    cookies.remove(
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