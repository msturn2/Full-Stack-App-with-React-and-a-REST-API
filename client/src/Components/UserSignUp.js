import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

export default function UserSignUp() {
  const { data, actions } = useContext(Context);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ emailAddress, setEmailAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();

  const handleValueChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
    
  const handleSubmit = () => {
    const user = { 
      firstName, 
      lastName, 
      emailAddress, 
      password 
    };

    data.createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(
            `${emailAddress} is signed up and Authenticated`
          );
          actions.signIn(emailAddress, password)
            .then(() => history.push("/"));
        }
      })
      .catch((error) => {
          console.log("Error with sign up", error);
          history.push("/error");
      });
  };

  const handleCancel = () => {
    history.push("/");
  };
  
  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <Form
          errors={errors}
          cancel={handleCancel}
          submit={handleSubmit}
          submitButtonText="Sign Up"
          elements={() => (
            <>
              <label 
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName" 
                name="firstName" 
                onChange={handleValueChange} 
              />
              <label 
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName" 
                name="lastName" 
                onChange={handleValueChange}
              />
              <label 
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress" 
                name="emailAddress" 
                onChange={handleValueChange}
              />
              <label 
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password" 
                name="password" 
                onChange={handleValueChange}
              />
            </>
          )} 
        />
        <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
      </div>
    </main>
  );
};