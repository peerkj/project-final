import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Example from "../test/example";
//test

@inject((stores) => ({
  number: stores.counter.number,
  getInfo: stores.test.getInfo,
}))
@observer
class home extends Component {
  render() {
    return (
      <div>
        <Example />
      </div>
    );
  }
}

export default home;
