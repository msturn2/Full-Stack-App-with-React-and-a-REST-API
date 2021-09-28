import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Context";
import Modal from "./Modal";

export default function CreateCourse() {
  const { 
    data, 
    authenticatedUser,
    userPassword
  } = useContext(Context);
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ estimatedTime, setTime ] = useState("");
  const [ materialsNeeded, setMaterials ] = useState("");
  const [ userId ] = useState(authenticatedUser[0].id);
  const [ user ] = useState(authenticatedUser[0].emailAddress);
  const [ pass ] = useState(userPassword);
  const [ validationErrors, setValidationErrors ] = useState([]);
  const [ newCourseId, setNewCourseId ] = useState();
  const [ showModal, setShowModal ] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const history = useHistory();

  const handleValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setTime(value);
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
      userId
    }

    let newId

    data.createCourse(
      course, 
      user, 
      pass
    )
      .then((response) => {
        if (response) {
          setValidationErrors(response.errors);
        } else {
          data.getCourses()
            .then((courses) => {
              newId = courses.slice(-1)[0].id;
              setNewCourseId(newId);
              toggleModal();
            });
        };
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
            {`By ${authenticatedUser[0].firstName} ${authenticatedUser[0].lastName}`}{" "}
          </p>
          {
            validationErrors.length
            ? <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  {validationErrors.map((error) => (
                    <li>{ error }</li>
                  ))}
                </ul>
              </div>
            : null
          }
        </div>
        <p></p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >  
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
                value={title}
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
                value={description}
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
                value={estimatedTime}
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
                value={materialsNeeded}
                onChange={handleValueChange}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button
            className="button button-secondary" 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
      {/* modal provides routing for the new course */}
      {
        showModal 
        ? <Modal>
            <h1>Congratulations on creating your New Course!</h1>
            <button onClick={() => {
              history.push(`/courses/${newCourseId}`)
            }}>
              Check it out
            </button>
          </Modal>
        : null
      }
    </main>
  );
};