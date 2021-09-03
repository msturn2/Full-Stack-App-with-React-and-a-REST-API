import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

const Header = () => {
  const { authenticatedUser } = useContext(Context);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">
            Courses
          </Link>
        </h1>
        <nav>
          {authenticatedUser ? (
            <React.Fragment>
              <span>
                Welcome, {authenticatedUser[0].firstName}!
              </span>
              {" "}
              <Link to="/signout">
                Sign Out
              </Link>
              {" "}
            </React.Fragment>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/signin">
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;