import React from "react";
import { Switch, Route } from "react-router-dom";

//컴포넌트
import Login from "./login";
import Home from "./home";
import Counter from "./Counter";
import Join from "./join";

import FindId from "./findid";
import FindPass from "./findpass";
import Mypage from "./mypage";
import Chefupdate from "./chefupdate";
import Withdraw from "./withdraw";
import PassUpdate from "./passupdate";
import Write from "./write";
import Recipe from "./recipe";
import RecipeDetail from "./recipedetail";
export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/join" component={Join} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/counter" component={Counter} />
    <Route exact path="/findid" component={FindId} />
    <Route exact path="/findpass" component={FindPass} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/chefupdate" component={Chefupdate} />
    <Route exact path="/withdraw" component={Withdraw} />
    <Route exact path="/findid" component={FindId} />
    <Route exact path="/findpass" component={FindPass} />
    <Route exact path="/passupdate" component={PassUpdate} />
    <Route exact path="/write" component={Write} />
    <Route exact path="/recipe" component={Recipe} />
    <Route exact path="/recipedetail" component={RecipeDetail} />
  </Switch>
);
