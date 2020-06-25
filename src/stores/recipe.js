import { observable, action } from "mobx";
import axios from "axios";

export default class CounterStore {
  @observable list = [];
  @observable state = { itemCount: 0, isLoading: false };
  @observable view = { num: -1, idx: -1 };
  @observable scroll = 0;
  @observable anchorEl = [];
  @observable check_j = [];
  @observable check_s = [];
  @observable comment_count = [];
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  dothandleClick = (event, idx) => {
    this.anchorEl[idx] = event.currentTarget;
  };
  @action
  dothandleClose = (idx) => {
    this.anchorEl[idx] = null;
  };

  @action
  reset = () => {
    this.state = { itemCount: 0, isLoading: false };
    this.list = [];
  };

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
      this.anchorEl[i] = null;
      this.updateCount(this.list[i].rec_num, i);
      this.checkJoayo(this.list[i].rec_num, i);
      this.checkScrap(this.list[i].rec_num, i);
      this.getComment(this.list[i].rec_num, i);
    }
  };
  @action
  updateList = () => {
    if (this.view.num > -1) {
      this.updateCount(this.view.num, this.view.idx);
      this.checkJoayo(this.view.num, this.view.idx);
      this.checkScrap(this.view.num, this.view.idx);
    }
  };
  //정보 얻기
  @action
  updateCheck = (num, idx) => {
    this.updateCount(num, idx);
    this.checkJoayo(num, idx);
    this.checkScrap(num, idx);
  };

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
    let url = "http://localhost:9000/acorn/recipe/list?scroll=" + this.scroll;
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

  //좋아요체크
  @action
  checkJoayo = (num, idx) => {
    let url = "http://localhost:9000/acorn/connect/joayocheck";

    axios({
      method: "get",
      url: url,
      params: {
        email: this.root.info.userEmail,
        rec_num: num,
      },
    })
      .then((res) => {
        this.check_j[idx] = res.data;
      })
      .catch((err) => {});
  };

  //좋아요
  @action
  Joayo = (num, idx) => {
    let url = "http://localhost:9000/acorn/connect/joayo";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: num },
    })
      .then((res) => {
        this.updateCheck(num, idx);
      })
      .catch((err) => {});
  };

  //스크랩체크
  @action
  checkScrap = (num, idx) => {
    let url = "http://localhost:9000/acorn/connect/scrapcheck";

    axios({
      method: "get",
      url: url,
      params: {
        email: this.root.info.userEmail,
        rec_num: num,
      },
    })
      .then((res) => {
        this.check_s[idx] = res.data;
      })
      .catch((err) => {});
  };

  //스크랩
  @action
  Scrap = (num, idx) => {
    let url = "http://localhost:9000/acorn/connect/scrap";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: num },
    })
      .then((res) => {
        this.updateCheck(num, idx);
      })
      .catch((err) => {});
  };
  //댓글 count
  @action
  getComment = (num, idx) => {
    let url = "http://localhost:9000/acorn/comment/count";

    axios({
      method: "get",
      url: url,
      params: { rec_num: num },
    })
      .then((res) => {
        this.comment_count[idx] = res.data;
      })
      .catch((err) => {});
  };
}
