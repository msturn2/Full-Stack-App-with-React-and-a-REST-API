import React, { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from "react-router-dom";

import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UserSignUp from "./Components/UserSignUp";
import UserSignIn from "./Components/UserSignIn";
import UserSignOut from "./Components/UserSignOut";
import NotFound from "./Components/NotFound";
import Forbidden from "./Components/Forbidden";
import UnhandledError from "./Components/UnhandledError";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route 
            exact path="/" 
            component={Courses} 
          />
          <PrivateRoute 
            path="/courses/:id/update" 
            component={UpdateCourse}
          />
          <PrivateRoute 
            path="/courses/create" 
            component={CreateCourse}
          />
          <Route 
            path="/courses/:id" 
            component={CourseDetail}
          />
          <Route
            path="/signin" 
            component={UserSignIn}
          />
          <Route 
            path="/signup" 
            component={UserSignUp}
          />
          <Route 
            path="/signout" 
            component={UserSignOut}
          />
          <Route 
            path="/error" 
            component={UnhandledError}
          />
          <Route 
            path="/forbidden" 
            component={Forbidden}
          />
          <Route 
            path="/notfound" 
            component={NotFound}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
