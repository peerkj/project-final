import { observable, action, computed } from "mobx";
import axios from "axios";

export default class CounterStore {
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  //리스트
  @action
  getList = () => {
    let url = "http://localhost:9000/acorn/recipe/list";

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };
}
