import { observable, action, computed } from "mobx";

export default class DragStore {
  @observable count = 0;
  @observable pot_ = [
    "/img/pot/pot1.png",
    "/img/pot/pot2.png",
    "/img/pot/pot3.png",
  ];
  @observable pot = "/img/pot/pot1.png";
  @observable open = false;
  @observable pot_timer = null;

  constructor(root) {
    this.root = root;
  }

  @action
  clickPot = () => {
    this.open = !this.open;
  };

  @action
  openPot = () => {
    this.pot = "/img/pot/openpot.png";
    setTimeout(() => {
      this.pot = this.pot_[2];
    }, 1000);
  };

  @action
  changePot = () => {
    let i = 1;
    this.pot_timer = setInterval(() => {
      this.pot = this.pot_[i];
      i++;
      if (i === 3) i = 0;
    }, 500);
  };

  @action
  stopPot = () => {
    clearInterval(this.pot_timer);
  };

  @action
  addCount = () => {
    this.count++;
  };
  @action
  resetCount = () => {
    this.count = 0;
  };
}
