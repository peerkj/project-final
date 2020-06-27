import { observable, action, computed } from "mobx";
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
  @observable list_count = -1;
  //검색
  @observable search = "";

  //분류
  @observable cate_list = [['All', '구이', '국/탕/찌개', '디저트'], ['면', '무침', '밥/죽/떡', '볶음'], ['양념/소스', '조림/찜', '튀김/부침', '기타']];
  @observable cate_index = 0;

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  //분류
  @action
  cateR = () => {
    if (this.cate_index >= 2) {
      this.cate_index = 0;
    } else {
      this.cate_index++;

    }
  };
  @action
  cateL = () => {
    if (this.cate_index === 0) {
      this.cate_index = 2;
    } else {
      this.cate_index--;
    }
  };

  //검색
  @action
  onchangeSearch = (e) => {
    this.search = e.target.value;
  };
  @action
  handleEnter = (e) => {
    if (e.key === "Enter") {
      //getList 초기화 후 얻기
      if (this.search === "") this.search = null;
      this.reset();
    }
  };



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
    this.scroll = 0;
    this.check_j = [];
    this.check_s = [];
    this.list_count = -1;
  };
  @action
  resetRecipe = () => {
    this.list = [];
    this.state = { itemCount: 0, isLoading: false };
    this.view = { num: -1, idx: -1 };
    this.scroll = 0;
    this.anchorEl = [];
    this.check_j = [];
    this.check_s = [];
    this.comment_count = [];
    this.list_count = -1;
    this.search = "";
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
    let size = this.list.length - 3;
    if (size < 0) size = 0;
    for (let i = size; i < this.list.length; i++) {
      this.anchorEl[i] = null;
      this.updateCount(this.list[i].rec_num, i);
      this.checkJoayo(this.list[i].rec_num, i);
      this.checkScrap(this.list[i].rec_num, i);
      this.getComment(this.list[i].rec_num, i);
      console.log(size, "~", this.list.length);
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


  @computed
  get checkList() {

    return this.list_count === this.list.length;

  }
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
    let url = "http://localhost:9000/acorn/recipe/list";
    if (this.search === "") this.search = null;
    if (this.list.length === this.list_count) return;

    axios({
      method: "get",
      url: url,
      params: {
        scroll: this.scroll,
        search: this.search,
      },
    })
      .then((res) => {
        this.scroll++;

        if (this.scroll === 1) {
          this.list = res.data.list;
        } else {
          this.list = [...this.list, ...res.data.list];
        }
        this.setList();
        this.list_count = res.data.count;
        console.log("리스트 길이", this.list.length);
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
      .catch((err) => { });
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
      .catch((err) => { });
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
      .catch((err) => { });
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
      .catch((err) => { });
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
      .catch((err) => { });
  };
}
