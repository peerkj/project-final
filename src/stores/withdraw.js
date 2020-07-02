import { observable, action, computed } from "mobx";
import axios from "axios";

export default class WithdrawStore {
  //회원탈퇴
  @observable reason = "reason1";

  constructor(root) {
    this.root = root;
  }

  @action
  handleWithdraw = () => {
    let url = "http://localhost:9000/acorn/chef/withdraw";
    let withdraw = new FormData();

    withdraw.append("email", this.root.login.email);
    withdraw.append("reason", this.reason);

    axios({
      method: "post",
      url: url,
      data: withdraw,
    })
      .then((res) => {
        this.root.login.handleLogout();
      })
      .catch((err) => {
        console.log("틸퇴오류:" + err);
      });
  };
}
