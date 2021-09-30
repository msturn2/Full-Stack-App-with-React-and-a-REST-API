import React, { 
  useContext,
  useState, 
  useEffect 
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../Context";

export default function UpdateCourse() {
  const { 
    data, 
    authenticatedUser,
    userPassword 
  } = useContext(Context);
  const [ course, setCourse ] = useState({});
  const [ authUser, setAuthUser ] = useState({});
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ estimatedTime, setTime ] = useState("");
  const [ materialsNeeded, setMaterials ] = useState("");
  const [ userId ] = useState(authenticatedUser[0].id);
  const [ user ] = useState(authenticatedUser[0].emailAddress);
  const [ pass ] = useState(userPassword);
  const [ validationErrors, setErrors ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    data.getCourse(id)
      .then((response) => {
        if (response) {
          if (response.userId === userId) {
            setIsLoading(false);
            setCourse(response);
            setTitle(response.title);
            setDescription(response.description);
            setTime(response.estimatedTime);
            setMaterials(response.materialsNeeded);
            setAuthUser(response.userInfo);
          } else {
            history.push("/forbidden");
          }
        } else {
          history.push("/notfound");
        }
      })
      .catch(() => history.push("/error"));
  }, [ data, id, history, authUser.id, userId ]);

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
      userId,
    };

    data.updateCourse(
      id,
      course,
      user,
      pass
    )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          console.log(errors);
        } else if (!errors.length) {
          history.push(`/courses/${id}`);
          console.log(`Course "${course.title}" has been updated`);
        }
      })
      .catch((error) => {
        history.push("/error");
        console.log("There was an error updating the course", error);
      });
  };

  const handleCancel = () => {
    history.push(`/courses/${id}`);
  };

  return (
    <main>
      <div className="wrap">
      {
        isLoading
        ? <div>
            <h2>Loading...</h2>
          </div>
        : <React.Fragment>
            <div>
              <h2
                style={{ display: "inline-block" }}
              >
                Update Course
              </h2>
              <p style={{
                float: "right",
              }}>
                {`By ${authUser.firstName} ${authUser.lastName}`}
              </p>
              {
                validationErrors.length
                ? <div 
                    className="validation--errors"
                  >
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
              <button 
                className="button" 
                type="submit"
              >
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </React.Fragment>
      }
      </div>
    </main>
  );
};