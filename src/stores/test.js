import { observable, action, computed } from "mobx";
import axios from "axios";

export default class MenuStore {
  @observable info = {};

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  getInfo = () => {
    let url =
      "http://localhost:9000/acorn/chef/modform?email=" +
      this.root.login.userEmail;

    //유효성 검사
    axios({
      method: "get",
      url: url,

      //headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        this.info = res.data;
        console.log(this.info.email);
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
      });
  };
}
