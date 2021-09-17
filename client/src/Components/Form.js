import React from "react";
import ErrorDisplay from "./ErrorDisplay";

export default function Form(props) {
  const {
    errors,
    cancel,
    submit,
    submitButtonText,
    elements
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    cancel();
  };

  return (
    <div>
      {
        errors  
        ? errors.length
          ? <ErrorDisplay errors={errors} />
          : null
        : null
      }
      <form onSubmit={handleSubmit}>
        {elements()}
        <button 
          className="button" 
          type="submit"
        >
          {submitButtonText}
        </button>
        <button 
          className="button button-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};