import React, { Component } from "react";
import { inject, observer } from "mobx-react";

//test
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

@inject((stores) => ({
  number: stores.counter.number,
  getInfo: stores.test.getInfo,
}))
@observer
class home extends Component {
  dropped(e) {
    e.containerElem.style.visibility = "hidden";
  }

  render() {
    return (
      <div>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <hr />
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <hr />
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <DragDropContainer targetKey="foo">
          <img src="/img/orange.png" alt="" />
        </DragDropContainer>
        <hr />
        <br />

        <DropTarget targetKey="foo" onHit={this.dropped}>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/img/pot.png"
            alt=""
          />
        </DropTarget>
      </div>
    );
  }
}

export default home;
