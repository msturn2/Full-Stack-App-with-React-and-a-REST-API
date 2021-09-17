import {
  useContext,
  useState, 
  useEffect
} from "react";
import { 
  Link,
  Redirect,
  useParams, 
  useHistory 
} from "react-router-dom";
import { Context } from "../Context";
import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const { data, authenticatedUser } = useContext(Context);
  const [ course, setCourse ] = useState([]);
  const [ user, setUser ] = useState({});
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    data.getCourse(id)
      .then((response) => {
        if (response) {
          setCourse(response);
          setUser(response.userInfo);
        } else {
          history.push("/notfound");
        }
      })
      .catch((error) => {
        console.log("Error fetching the requested course", error);
        history.push("/error");
      })
  }, [ data, id, history ]);
        
  if (course == null) {
    return <Redirect to="/notfound" />
  } else {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {
              authenticatedUser 
              && authenticatedUser[0].id 
              === course.userId 
              ? <>
                  <Link 
                    className="button" 
                    to={{
                      pathname:
                        `/courses/${course.id}/update`,
                      state: {
                        courseUserID: course.userId
                      }
                    }}
                  >
                    Update Course
                  </Link>
                  <Link 
                    className="button" 
                    to={{
                      pathname: 
                        `/courses/${course.id}/delete`,
                      state: {
                        courseUserID: course.userId
                      }
                    }}
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
                  <h4 
                    className="course--name"
                  >
                    {course.title}
                  </h4>
                  <p>
                    {
                      user 
                      ? `By ${user.firstName} ${user.lastName}`
                      : null
                    }
                  </p>
                  <ReactMarkdown>
                    {course.description}
                  </ReactMarkdown>              
                </div>
                <div>
                  <h3 
                    className="course--detail--title"
                  >
                    Estimated Time
                  </h3>
                  <p>{course.estimatedTime}</p>
                  <h3 
                    className="course--detail--title"
                  >
                    Materials Needed
                  </h3>
                  <ul 
                    className="course--detail--list"
                  >
                    <ReactMarkdown>
                      {course.materialsNeeded}
                    </ReactMarkdown>
                  </ul>
                </div>
              </div>
            </form>
        </div>
      </main>
    );
  }
};