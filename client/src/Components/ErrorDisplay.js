import React from "react";

export default function ErrorDisplay({ errors }) {
  return (
    <div>
      <h3>Validation Errors</h3>
      <ul>
        {errors.map((error, index) => (
          <li
            key={index}
          >
            { error }
          </li>
        ))}
      </ul>
    </div>
  );
};