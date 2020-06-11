import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  number: stores.counter.number,
}))
@observer
class home extends Component {
  render() {
    const { number } = this.props;
    return (
      <div>
        {number}
        <h1>HOME</h1>
      </div>
    );
  }
}

export default home;
