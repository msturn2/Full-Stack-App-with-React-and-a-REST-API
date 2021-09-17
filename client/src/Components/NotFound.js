import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <div className="form--centered">
        <h2>Not Found</h2>
        <p>
          Sorry, the requested page was not found. Return to {" "}
          <Link 
            className="button button-secondary" 
            to="/"
          >
            Return to Course List
          </Link>
        </p>
      </div>
    </main>
  );
};