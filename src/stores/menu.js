import { observable, action, computed } from "mobx";

export default class CounterStore {
  @observable visible = "hide";

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action togglemenu = () => {
    if (this.visible === "hide") {
      this.visible = "show";
    } else {
      this.visible = "hide";
    }
  };
}
