/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from '../Data/Data';

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  
  //state variables.
  let [ authenticatedUser, setAuthenticatedUser ] = useState(
    Cookies.get("authenticatedUser") || null
  );

  let [ userPassword, setUserPassword ] = useState(
    Cookies.get("userPassword") || null
  );

  //signin function
  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(emailAddress, password);
    //test log user
    // console.log(user);
    if (user !== null) {
      setAuthenticatedUser(user);
      setUserPassword(password);

      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('userPassword', JSON.stringify(password), { expires: 1 });
    }
    return user;
  };

  //sign out function
  const signOut = () => {
    setAuthenticatedUser(null);
    setUserPassword(null);
    Cookies.remove('authenticatedUser');
    Cookies.remove('userPassword');
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
