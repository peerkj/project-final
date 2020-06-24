import { observable, action } from "mobx";
import axios from "axios";

export default class CounterStore {
  @observable list = [];
  @observable state = { itemCount: 0, isLoading: false };
  @observable view = { num: -1, idx: -1 };
  @observable scroll = 0;
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  setView = (num, idx) => {
    this.view.num = num;
    this.view.idx = idx;
  };
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

  @action
  setList = () => {
    for (let i = 0; i < this.list.length; i++) {
      this.updateCount(this.list[i].rec_num, i);
    }
  };
  @action
  updateList = () => {
    if (this.view.num > -1) this.updateCount(this.view.num, this.view.idx);
  };
  //정보 얻기

  //카운트 업데이트
  @action
  updateCount = (rec_num, idx) => {
    let url = "http://localhost:9000/acorn/recipe/count?rec_num=" + rec_num;
    //유효성 검사
    axios({
      method: "get",
      url: url,
      //headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        this.list[idx].readcount = res.data.readcount;
        this.list[idx] = {
          ...this.list[idx],
          joayo: res.data.joayo,
          scrap: res.data.scrap,
        };
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
      });
  };
  //리스트
  @action
  getList = () => {
    let url =
      "http://localhost:9000/acorn/recipe/list?scroll=" + this.scroll;
    this.scroll++;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
        if (this.scroll === 1) {
          this.list = res.data;
        } else {
          this.list = [...this.list, ...res.data];
        }
        this.setList();
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };
}