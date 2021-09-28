import React from "react";
import { Link } from "react-router-dom";

export default function UnhandledError() {
  return (
    <main>
      <div className="form--centered">
        <h2>Error</h2>
        <p>Sorry, there was an internal error.</p>
        <Link 
          className="button button-secondary" 
          to="/"
        >
          Return to Course List
        </Link>
      </div>
    </main>
  );
};