import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from "../Context";

export default function UserSignUp() {
  const { data, actions } = useContext(Context);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ emailAddress, setEmailAddress ] = useState("");
  const [ password, setPass ] = useState("");
  const [ confirmPassword, setConfirmPass ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();


  // state handler
  const handleValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPass(value);
    } else if (name === "confirmPassword") {
      setConfirmPass(value);
    }
  };
  
  // handler to be called on form submission
  const handleSubmit = () => {
    const user = { 
      firstName, 
      lastName, 
      emailAddress, 
      password,
      confirmPassword 
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
            .then(() => history.goBack());
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
        {
          errors.length 
          ? <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{ error }</li>
                ))}
              </ul>
            </div>
          : null
        }
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label 
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName" 
            name="firstName" 
            value={firstName}
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
            value={lastName}
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
            value={emailAddress}
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
            value={password}
            onChange={handleValueChange}
          />
          <label 
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleValueChange}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
        <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
      </div>
    </main>
  );
};