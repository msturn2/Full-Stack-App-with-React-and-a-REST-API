import React, { useState } from "react";
import Data from "../Data/Data";
// import Cookies from "js-cookie";
import Cookies from "universal-cookie";
const cookies = new Cookies();
/**
 * This file sets up the Context to allow data to pass
 * through the app component tree.
 */
export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  // const cookies = Cookies.get("authenticatedUser");
  const [ authenticatedUser, setAuthUser ] = useState(
    cookies.get("authenticatedUser") || null
  );
  const [ userPassword, setUserPassword ] = useState(
    cookies.get("credentials") || null
  );

  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(
      emailAddress, 
      password
    );
    
    if (user !== null) {
      console.log(user);
      setAuthUser(user);
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
  };

  const signOut = () => {
    setAuthUser(null);
    setUserPassword(null);
    cookies.remove(
      "authenticatedUser",
      { path: "/" }
    );
    cookies.remove(
      "credentials",
      { path: "/" }
    )
  };

  return (
    <Context.Provider value={{ 
      authenticatedUser,
      userPassword,
      data,
      actions: { 
        signIn, 
        signOut 
      }
    }}>
      {props.children}
    </Context.Provider>
  );
}