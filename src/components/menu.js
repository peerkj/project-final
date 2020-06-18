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
  nickname: stores.withdraw.nickname,
  imgBase64: stores.withdraw.imgBase64,
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
      nickname,
      imgBase64,
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
          <center>
            <div>
              {imgBase64 !== "" ? (
                <img src={imgBase64}
                  alt=""
                  style={{ height: "150px", marginTop: "30px", marginBottom: "20px" }}
                />
              ) : (
                  <img
                    src="img/basic_user.png"
                    alt=""
                    style={{ width: "200px", marginLeft: "13px" }}
                  />
                )}
            </div>
            {nickname ? (
              <span style={{ fontWeight: "400", fontSize: "12pt" }}>{nickname} 님</span>
            ) : (
                <span></span>
              )}
            <br />
            {login_state ? (
              <Link to="/mypage">MYPAGE</Link>
            ) : (
                <Link to="/login">LOGIN</Link>
              )}
            &ensp;
            {login_state ? (
              <span onClick={handleLogout}>LOGOUT</span>
            ) : (
                <Link to="/join">JOIN</Link>
              )}
          </center>
          <br />
          <hr />
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/recipe">RECIPE</Link>
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
