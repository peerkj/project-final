import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Fade as Hamburger } from "hamburger-react";
import "../css/menu.css";

@inject((stores) => ({
  visible: stores.menu.visible,
  togglemenu: stores.menu.togglemenu,
}))
@observer
class header extends Component {
  render() {
    const { visible, togglemenu } = this.props;
    console.log(visible);
    return (
      <div>
        <Hamburger
          onToggle={(toggled) => {
            if (toggled) {
              return togglemenu();
            } else {
              return togglemenu();
            }
          }}
        />
        <div id="flyoutMenu" className={visible} onClick={togglemenu}>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>/<Link to="/join">JOIN</Link>
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
