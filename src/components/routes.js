import React from "react";
import { Switch, Route } from "react-router-dom";

//컴포넌트
import Login from "./login";
import Home from "./home";

import Join from "./join";

import FindId from "./findid";
import FindPass from "./findpass";
import Mypage from "./mypage";
import Chefupdate from "./chefupdate2";
import Withdraw from "./withdraw";
import PassUpdate from "./passupdate";
import Recipe from "./r2";
import Write from "./write";
import Detail from "./detail";
import Comment from "./comment";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/join" component={Join} />
    <Route exact path="/recipe" component={Recipe} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/findid" component={FindId} />
    <Route exact path="/findpass" component={FindPass} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/chefupdate" component={Chefupdate} />
    <Route exact path="/withdraw" component={Withdraw} />
    <Route exact path="/findid" component={FindId} />
    <Route exact path="/findpass" component={FindPass} />
    <Route exact path="/passupdate" component={PassUpdate} />
    <Route exact path="/write" component={Write} />
    <Route exact path="/detail" component={Detail} />
    <Route exact path="/comment" component={Comment} />
  </Switch>
);
