import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProjectPage from "./Project";
import EditorMap from "./Map/EditorMap";
import PublishingMap from "./Map/PublishingMap";
const LoggedInPage = () => {
  return (
    <Router>
      <Switch>
        <Route path="/map/publish" component={PublishingMap} />
        <Route path="/map/editor" component={EditorMap} />
        <Route path="/project" component={ProjectPage} />
        <Redirect to="/project" />
      </Switch>
    </Router>
  );
};

export default LoggedInPage;
