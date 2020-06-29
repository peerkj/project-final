import CounterStore from "./counters";
import MenuStore from "./menu";
import JoinStore from "./join";
import LoginStore from "./login";
import FindIdStore from "./findid";
import FindPassStore from "./findpass";
import WithdrawStore from "./withdraw";
import ChefupdateStore from "./chefupdate";
import DragStore from "./drag";

import InfoStore from "./info";
import WriteStore from "./write";
import DetailStore from "./detail";
import RecipeStore from "./recipe";
import CU from "./cu";
import Comment from "./comment";
import Mypage from "./mypage";
import RankingStore from "./ranking";
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
    this.info = new InfoStore(this);
    this.write = new WriteStore(this);
    this.detail = new DetailStore(this);
    this.recipe = new RecipeStore(this);
    this.cu = new CU(this);
    this.comment = new Comment(this);
    this.mypage = new Mypage(this);
    this.ranking = new RankingStore(this);
  }
}

export default RootStore;
