import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UserSignUp from "./Components/UserSignUp";
import UserSignIn from "./Components/UserSignIn";
import UserSignOut from "./Components/UserSignOut";
import PrivateRoute from "./Components/PrivateRoute";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import DeleteCourse from "./Components/DeleteCourse";
import NotFound from "./Components/NotFound";
import Forbidden from "./Components/Forbidden";
import UnhandledError from "./Components/UnhandledError";

const App = () => {
  return (
    <Router forceRefresh={true}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>
        <PrivateRoute path="/courses/create">
          <CreateCourse />
        </PrivateRoute>
        <PrivateRoute path="/courses/:id/update">
          <UpdateCourse />
        </PrivateRoute>
        <PrivateRoute path="/courses/:id/delete">
          <DeleteCourse />
        </PrivateRoute>
        <Route path="/courses/:id">
          <CourseDetail />
        </Route>
        <Route path="/signup">
          <UserSignUp />
        </Route>
        <Route path="/signin">
          <UserSignIn />
        </Route>
        <Route path="/signout">
          <UserSignOut />
        </Route>
        <Route path="/error">
          <UnhandledError />
        </Route>
        <Route path="/notfound">
          <NotFound />
        </Route>
        <Route path="/forbidden">
          <Forbidden />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;