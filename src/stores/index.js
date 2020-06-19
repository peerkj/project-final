import CounterStore from "./counters";
import MenuStore from "./menu";
import JoinStore from "./join";
import LoginStore from "./login";
import FindIdStore from "./findid";
import FindPassStore from "./findpass";
import WithdrawStore from "./withdraw";
import ChefupdateStore from "./chefupdate";
import DragStore from "./drag";

import TestStore from "./test";
import InfoStore from "./info";
import WriteStore from "./write";
import RecipeStore from "./recipe";
class RootStore {
  constructor() {
    this.counter = new CounterStore(this);
    this.menu = new MenuStore(this);
    this.join = new JoinStore(this);
    this.login = new LoginStore(this);
    this.findId = new FindIdStore(this);
    this.findPass = new FindPassStore(this);
    this.withdraw = new WithdrawStore(this);
    this.chefupdate = new ChefupdateStore(this);
    this.drag = new DragStore(this);
    this.write = new WriteStore(this);
    this.test = new TestStore(this);
    this.info = new InfoStore(this);
    this.recipe = new RecipeStore(this);
  }
}

export default RootStore;
