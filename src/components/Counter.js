import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
  total: stores.counter.total,
  number: stores.counter.number,
  increase: stores.counter.increase,
  decrease: stores.counter.decrease,
}))
@observer
class Counter extends Component {
  render() {
    const { total, number, increase, decrease } = this.props;

    return (
      <div>
        <h1>제곱:{total}</h1>
        <h1>{number}</h1>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
