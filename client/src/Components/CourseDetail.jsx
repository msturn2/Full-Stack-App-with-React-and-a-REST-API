import React, { 
  useContext, 
  useEffect,
  useState,
  Redirect 
} from "react";
import { 
  Link, 
  useParams, 
  useHistory 
} from "react-router-dom";
import { Context } from "../Context";
import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const { 
    data,
    authenticatedUser, 
    userPassword 
  } = useContext(Context);

  const [ course, setCourse ] = useState([]);
  const [ user, setUser ] = useState({});
  const { id } = useParams();
  const history = useHistory();
  let getID = window.location.pathname.replace("/courses/","");

  // sets authorized user
  useEffect(() => {
    //gets course detail
    fetch(`http://localhost:5000/api/courses/${getID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCourse(data);
        } else {
          history.push("/notfound");
        }
      })
      .catch((error) => {
        history.push("/error");
        console.log(error);
      });
  }, [
    getID, 
    history
  ]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${getID}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.userInfo) {
          history.push("/notfound");
        } else {
          setUser(data.userInfo);
        }
      })
      .catch((error) => {
        history.push("/error");
        console.log(error);
      });
  }, [ 
    getID,
    history 
  ]);

  // handle course deletion
  const handleDeleteCourse = () => {
    data.deleteCourse(
      id, 
      authenticatedUser[0].emailAddress, 
      userPassword
    )
      .then(() => {
        history.push("/");
        console.log(`Course: ${course.title} was deleted successfully`);
      })
      .catch((error) => {
        history.push("/error");
        console.log(error);
      });
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/* if user is the owner of course, render 
          buttons for deleting and updating*/}
          {
            authenticatedUser 
            && authenticatedUser[0].id 
            === course.userId
            ? <>
                <Link 
                  className="button" 
                  to={`/courses/${id}/update`}
                >
                  Update Course
                </Link>
                <Link
                  className="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteCourse();
                  }}
                  to="/"
                >
                  Delete Course
                </Link>
              </>
            : null
          }
          <Link 
            className="button button-secondary" 
            to="/"
          >
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>

        <form>
          <div className="main--flex">
            <div>
              <h3 
                className="course--detail--title"
              >
                Course
              </h3>
              <h4 className="course--name">
                {course.title}
              </h4>
              <p>
                By {user.firstName} {user.lastName}
              </p>

              <ReactMarkdown>
                {course.description}
              </ReactMarkdown>
            </div>
            <div>
              {
                course.estimatedTime 
                ? <>
                    <h3 
                      className="course--detail--title"
                    >
                      Estimated Time
                    </h3>
                    <p>
                      {course.estimatedTime}
                    </p>{" "}
                  </>
                : null
              }

              {
                course.materialsNeeded 
                ? <>
                    <h3 
                      className="course--detail--title"
                    >
                      Materials Needed
                    </h3>
                    <ReactMarkdown 
                      className="course--detail--list"
                    >
                      {course.materialsNeeded}
                    </ReactMarkdown>
                </>
                : null
              }
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};