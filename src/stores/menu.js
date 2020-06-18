import { observable, action, computed } from "mobx";

export default class MenuStore {
  @observable hamto = false;

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action change_ham = () => {
    this.hamto = !this.hamto;
  };

  @computed
  get togglemenu() {
    if (this.hamto) {
      return "show";
    } else {
      return "hide";
    }
  }
}
