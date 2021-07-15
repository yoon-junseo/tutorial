import React from "react";
import { Switch, Route } from "react-router";
import Login from "../google_oauth/Login";
import Home from "../Home";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Home} />
    </Switch>
  );
};

export default Router;
