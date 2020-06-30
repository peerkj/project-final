import React from "react";
import { Switch, Route } from "react-router-dom";

//컴포넌트
import Login from "./login";
import Home from "./home";
import Join from "./join";
import FindId from "./findid";
import FindPass from "./findpass";
import Myinfo from "./myinfo";
import Chefupdate from "./chefupdate2";
import Withdraw from "./withdraw";
import Recipe from "./r2";
import Write from "./write";
import Detail from "./detail";
import Comment from "./comment";
import Mypage from "./mypage";
import Ranking from "./ranking";
import Recipeupdate from "./recipeupdate";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/join" component={Join} />
    <Route exact path="/recipe" component={Recipe} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/findid" component={FindId} />
    <Route exact path="/findpass" component={FindPass} />
    <Route exact path="/myinfo" component={Myinfo} />
    <Route exact path="/chefupdate" component={Chefupdate} />
    <Route exact path="/withdraw" component={Withdraw} />
    <Route exact path="/findid" component={FindId} />
    <Route exact path="/write" component={Write} />
    <Route exact path="/recipe/detail" component={Detail} />
    <Route exact path="/comment" component={Comment} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/ranking" component={Ranking} />
    <Route exact path="/update" component={Recipeupdate} />
  </Switch>
);
