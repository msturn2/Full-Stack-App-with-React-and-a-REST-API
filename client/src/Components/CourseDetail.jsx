import React, { 
  useContext, 
  useEffect, 
  useState 
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

  const [ course, setCourse ] = useState({});
  const [ user, setUser ] = useState({});
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ userId ] = useState();
  const { id } = useParams();
  const history = useHistory();

  // sets authorized user
  useEffect(() => {
    if (authenticatedUser) {
      setIsSignedIn(true);
    }

    //gets course detail
    data.getCourse(id)
      .then((response) => {
        if (response) {
          setCourse(response);
          setUser(response.userInfo);
        } else {
          history.push("/notfound");
        }
      })
      .catch(() => history.push("/error"));
  }, [
    data, 
    id, 
    history, 
    authenticatedUser, 
    isSignedIn,
    user.id
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

  console.log(user.id);
  console.log(course.userId);
  console.log(isSignedIn);
  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/* if user is the owner of course, render 
          buttons for deleting and updating*/}
          {
            isSignedIn && course.userId === user.id 
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