import React, { 
  useContext,
  useState, 
  useEffect 
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

export default function UpdateCourse() {
  const { 
    data, 
    authenticatedUser,
    userPassword
  } = useContext(Context);
  const { emailAddress } = authenticatedUser[0]
  const authUserId = authenticatedUser[0].id;
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ estimatedTime, setEstimatedTime ] = useState("");
  const [ materialsNeeded, setMaterials ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);
  const [ userInfo, setUserInfo ] = useState({});
  const [ errors, setErrors ] = useState([]);
  // const [ course, setCourse ] = useState([]);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    data.getCourse(id)
        .then((response) => {
          if (response) {
            if (response.userId === authUserId) {
              setTitle(response.title);
              setDescription(response.description);
              setEstimatedTime(response.estimatedTime);
              setMaterials(response.materialsNeeded);
              setUserInfo(response.userInfo);
              setIsLoading(false);
            } else {
              history.push("/forbidden");
            } 
          } else {
            history.push("/notfound");
          }
        })
        .catch((error) => {
          console.log("Error fetching course", error);
          history.push("/error");
        });
  }, [ data, id, history, authUserId ]);

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

    data.updateCourse(
      id, 
      course, 
      emailAddress,
      userPassword
    )
      .then((errors) => {
        if (errors.length) {
          console.log(errors);
          setErrors(errors);
        } else {
          console.log(`Course "${title}" has been updated`);
          history.push(`/courses/${id}`);
        }
      })
      .catch((error) => {
        console.log("There was an error updating the course", error);
        history.push("/error");
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
        : <>
            <div>
              <h2
                style={{ display: "inline-block" }}
              >
                Update Course
              </h2>
              <p style={{
                float: "right",
              }}>
                {`By ${userInfo.firstName} ${userInfo.lastName}`}
              </p>
            </div>
            <p></p>
            <Form
              errors={errors}
              cancel={handleCancel}
              submit={handleSubmit}
              submitButtonText="Update Course"
              elements={() => (
                <div className="main--flex">
                  <div>
                    <label
                      htmlFor="title"
                    >
                      Course Title
                    </label>
                    <input
                      type="text"
                      id="courseTitle"
                      name="courseTitle"
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
              )} 
            />
          </>
      }
      </div>
    </main>
  );
};