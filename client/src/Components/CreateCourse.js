import React, { 
  useContext, 
  useState
} from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

export default function CreateCourse() {
  const { 
    data, 
    authenticatedUser,
    userPassword
  } = useContext(Context);
  const authUser = authenticatedUser[0];
  const {
    emailAddress,
    firstName,
    lastName
  } = authUser;
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ estimatedTime, setEstimatedTime ] = useState("");
  const [ materialsNeeded, setMaterials ] = useState("");
  const [ errors, setErrors ] = useState([]);
  let history = useHistory();

  const handleValueChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "courseTitle") {
      setTitle(value);
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterials(value);
    }
  };

  const handleSubmit = () => {
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    course.userId = authenticatedUser.id
    data.createCourse(
      course, 
      emailAddress, 
      userPassword
    )
      .then((errors) => {
        if (errors.length) {
          console.log(errors);
          setErrors(errors);
        } else {
          console.log(`Course "${title}" successfully created`);
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        history.push("/error");
      });
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="wrap">
        <div>
          <h2
            style={{display: "inline-block"}}
          >
            Create Course
          </h2>
          <p style={{
            float: "right",
          }}>
            By {firstName} {lastName}
          </p>
        </div>
        <p></p>
        <Form
          errors={errors}
          cancel={handleCancel}
          submit={handleSubmit}
          submitButtonText="Create Course"
          elements={ () => (
            <div className="main--flex">
              <div>
                <label 
                  htmlFor="title"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  id="title" 
                  name="title" 
                  onChange={handleValueChange} 
                />
                <label 
                  htmlFor="description"
                >
                  Course Description
                </label>
                <textarea 
                  id="description" 
                  name="description"
                  onChange={handleValueChange} 
                />
              </div>
              <div>
                <label 
                  htmlFor="estimatedTime"
                >
                  Estimated Time
                </label>
                <input
                  type="text"
                  id="estimatedTime" 
                  name="estimatedTime"
                  onChange={handleValueChange} 
                />
                <label 
                  htmlFor="materialsNeeded"
                >
                  Materials Needed
                </label>
                <textarea 
                  id="materialsNeeded" 
                  name="materialsNeeded"
                  onChange={handleValueChange}
                />
              </div>
            </div>
          )} 
        />
      </div>
    </main>
  );
};