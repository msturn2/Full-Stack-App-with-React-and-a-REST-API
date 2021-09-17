import React, { 
  useContext, 
  useState, 
  useEffect 
} from "react";
import { 
  Redirect, 
  useLocation,
  useParams,
  useHistory
} from "react-router-dom";
import { Context } from "../Context";

export default function DeleteCourse() {
  const { 
    data, 
    authenticatedUser, 
    userPassword 
  } = useContext(Context);
  const [ course, setCourse ] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { courseUserId } = location.state || 0;

  useEffect(() => {
    data.getCourse(id)
      .then((course) => {
        setCourse(course)
      })
      .catch((error) => {
        console.log("Error fetching course", error);
        history.push("/error");
      })
  }, [ data, id, history ]);

  if (course === null) {
    return <Redirect to="/notfound" />
  } else if (authenticatedUser.id !== courseUserId) {
    return <Redirect to="/forbidden" />
  } else {
    let confirmDelete = window.confirm(
      `This will permanently delete Course; "${course.title}". Are you sure you wish to continue.`
    );

    if (confirmDelete) {
      data.deleteCourse(
        id, 
        authenticatedUser[0].emailAddress, 
        userPassword
      )
        .then(() => {
          console.log(
            `Course "${course.title}" was successfully deleted`
          );
          history.push("/");
        })
        .catch((error) => {
          console.log("Error deleting course", error);
          history.push("/error");
        })
      return (
        <Redirect to="/" />
      );
    }
  }
};