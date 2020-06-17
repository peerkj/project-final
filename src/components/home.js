import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  number: stores.counter.number,
  getInfo: stores.test.getInfo,
}))
@observer
class home extends Component {
  render() {
    const { getInfo } = this.props;

    return (
      <div>
        <h1>HOME</h1>
        <button onClick={getInfo}>정보</button>
      </div>
    );
  }
}

export default home;
