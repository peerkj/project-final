import React from "react";
import { Switch, Route } from "react-router-dom";

//컴포넌트
import Login from "./login";
import Home from "./home";
import Counter from "./Counter";
import Join from "./join";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/join" component={Join} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/counter" component={Counter} />
  </Switch>
);
