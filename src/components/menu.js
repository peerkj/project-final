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
}))
@observer
class header extends Component {
  render() {
    const {
      hamto,
      togglemenu,
      change_ham,
      handleLogout,
      login_state,
    } = this.props;

    return (
      <div>
        <div id="headgroup">
          <Link to="/">
            <img
              style={{ marginLeft: "107.5px", width: "140px" }}
              src="/img/logo1.png"
              alt=""
            />
          </Link>
          <Hamburger toggled={hamto} toggle={change_ham} />
        </div>
        <div id="flyoutMenu" className={togglemenu} onClick={change_ham}>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              {login_state ? (
                <b onClick={handleLogout}>LOGOUT</b>
              ) : (
                  <Link to="/login">LOGIN</Link>
                )}
              /
              {login_state ? (
                <Link to="/mypage">MYPAGE</Link>
              ) : (
                  <Link to="/join">JOIN</Link>
                )}
            </li>
            <li>
              <Link to="/counter">RECIPE</Link>
            </li>
            <li>
              <Link to="/counter">CHEF</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default header;
