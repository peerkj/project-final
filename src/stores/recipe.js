import { observable, action, computed } from "mobx";
import axios from "axios";

export default class CounterStore {
  @observable list = [];
  @observable state = { itemCount: 0, isLoading: false };

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }
  //상태변화
  @action
  changeState = () => {
    if (this.list.length !== 0) this.state.isLoading = true;
  };
  //카운트 증가
  @action
  addState = () => {
    this.state.itemCount += 3;
    this.state.isLoading = false;
  };

  //리스트
  @action
  getList = () => {
    let scroll = 0;
    if (this.list.length > 0) scroll = 1;
    let url = "http://localhost:9000/acorn/recipe/list?scroll=" + scroll;

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
        if (scroll === 0) {
          this.list = res.data;
        } else {
          this.list = [...this.list, ...res.data];
        }
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };
}
