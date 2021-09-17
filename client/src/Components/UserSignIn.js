import React, { useContext, useState } from "react";
import { 
  Link, 
  useHistory,
  useLocation
} from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

export default function UserSignIn() {
  const { actions } = useContext(Context);
  const [ emailAddress, setEmailAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }

  const handleValueChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    
    if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(
            "Sign-in was unsuccessful", 
            errors
          );
        } else {
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
          history.push(from);
        }
      })
      .catch((error) => {
        console.log(error);
        history.push("/error");
      });
  };

  const handleCancel = () => {
    history.push('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <Form
          errors={errors}
          cancel={handleCancel}
          submit={handleSubmit}
          submitButtonText="Sign In"
          elements={() => (
            <>
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
        <p>
          Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};