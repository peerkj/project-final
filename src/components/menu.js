import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Fade as Hamburger } from "hamburger-react";
import "../css/menu.css";

@inject((stores) => ({
  hamto: stores.menu.hamto,
  togglemenu: stores.menu.togglemenu,
  change_ham: stores.menu.change_ham,
  handleLogout: stores.login.handleLogout,
  login_state: stores.info.login_state,
  profile_name: stores.info.profile_name,
  menu_profile: stores.cu.menu_profile,
  menu_nick: stores.cu.menu_nick,
  resetRecipe: stores.recipe.resetRecipe,
}))
@observer
class header extends Component {
  render() {
    const {
      menu_nick,
      menu_profile,
      hamto,
      togglemenu,
      change_ham,
      handleLogout,
      login_state,
      profile_name,
      resetRecipe,
    } = this.props;

    return (
      <div>
        <div id="headgroup">
          <center>
            <a href="/">
              <img
                style={{ width: "140px", marginLeft: "55px" }}
                src="/img/logo1.png"
                alt=""
              />
            </a>
            <div style={{ float: "right" }}>
              <Hamburger toggled={hamto} toggle={change_ham} />
            </div>
          </center>
        </div>
        <div id="flyoutMenu" className={togglemenu} onClick={change_ham}>
          <center>
            <div className="menuProfileWrapper">
              <div className="menuProfileCenter">
                <div className="centered">
                  {profile_name ? (
                    <img
                      src={menu_profile}
                      alt=""
                      className="menuProfileCenterImg"
                    />
                  ) : (
                      <img src="/img/basic_user2.png" alt="" className="menuProfileCenterImg" />
                    )}
                </div>
              </div>
            </div>
            {menu_nick ? (
              <span style={{ fontWeight: "400", fontSize: "15pt", color: "#ffffff" }}>
                {menu_nick} 님
              </span>
            ) : (
                <span></span>
              )}
            <br />
            {login_state ? (
              <Link to="/myinfo">
                <span className="menuTextColor">MYINFO</span></Link>
            ) : (
                <Link to="/login">
                  <span className="menuTextColor">LOGIN</span>
                </Link>
              )}
            &ensp;
            {login_state ? (
              <span onClick={handleLogout} className="menuTextColor">
                LOGOUT
              </span>
            ) : (
                <Link to="/join">
                  <span className="menuTextColor">JOIN</span>
                </Link>
              )}
          </center>
          <br />
          <br />
          <br />
          <hr id="menuline" />
          <ul>
            <li>
              <Link to="/recipe" onClick={resetRecipe}>
                RECIPE
              </Link>
            </li>
            <li>
              <Link to="/ranking">CHEF</Link>
            </li>
            <li>
              <Link to="/following">FOLLOWING</Link>
            </li>
            <li>
              <Link to={`/mypage?nick=${menu_nick}`}>MYPAGE</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default header;
