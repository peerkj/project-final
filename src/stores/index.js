import CounterStore from "./counters";
import MenuStore from "./menu";
import JoinStore from "./join";

class RootStore {
  constructor() {
    this.counter = new CounterStore(this);
    this.menu = new MenuStore(this);
    this.join = new JoinStore(this);
  }
}

export default RootStore;
