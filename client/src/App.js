import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from "./Components/Header";
import Courses from "./Components/Courses";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;