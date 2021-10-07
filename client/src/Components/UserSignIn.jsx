import { useContext, useState } from "react";
import { 
  Link, 
  useHistory,
  useLocation 
} from "react-router-dom";
import { Context } from "../Context";

export default function UserSignIn() {
  const { actions } = useContext(Context);
  const [ emailAddress, setEmailAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // Validates form fields before signing in.  
  // Returns user to previous or intended page (if 
  // rerouted to sign in)
  const handleSubmit = () => {
    if (!emailAddress && !password) {
      setErrors("Please Sign In");
    } else if (!emailAddress) {
      setErrors("Please enter your email address");
    } else if (!password) {
      setErrors("Please enter your password");
    } else {
      actions.signIn(
        emailAddress,
        password
      )
        .then((user) => {
          if (user === null) {
            setErrors("Sign In was unsuccessful");
          } else {
            history.push(from);
            console.log(`SUCCESS! ${emailAddress} is now signed in.`)
            return null;
          }
        })
        .catch((error) => {
          history.push("/error");
          console.log(error);
        });
    }
  };

  const handleCancel = () => {
    history.push("/");
  }

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        {
          errors.length 
          ? <div className='validation--errors'>
              <h3>Validation Errors</h3>
              <ul>
                <li>{ errors }</li>
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
              htmlFor="emailAddress"
          >
            Email Address
          </label>
          <input 
            type="email"
            id="emailAddress" 
            name="emailAddress"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button 
            className="button" 
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};