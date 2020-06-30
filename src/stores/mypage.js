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
  @observable sw = 0;
  @observable mypage = {};

  @observable nick = "";

  //소식받기
  @observable checkn = "";

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  setNickname = (nick, history) => {
    this.nick = nick;

    let url = "http://localhost:9000/acorn/chef/mypage";
    //유효성 검사
    axios({
      method: "get",
      url: url,
      params: {
        nick: nick,
      },
      //headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === "") {
          alert("사용자가 없습니다");
          history.push("/");
        } else {
          this.mypage = res.data;
          this.checkNews();
        }
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
      });
  };

  @action
  fakeFetch = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

  @action
  fetchItems = async () => {
    this.changeState();
    if (this.sw === 0) {
      this.getList();
    } else {
      this.getList_scrap();
    }
    await this.fakeFetch();
    this.addState();
  };

  @action
  setSw = (e) => {
    // 0->내글 / 1->스크랩
    console.log("스크랩", e);
    this.sw = e;
    this.resetRecipe();
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
    this.sw = 0;
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
    this.state.itemCount += 5;
    this.state.isLoading = false;
  };

  @action
  setList = () => {
    let size = this.list.length - 5;
    if (size < 0) size = 0;
    for (let i = size; i < this.list.length; i++) {
      this.anchorEl[i] = null;
      this.updateCount(this.list[i].rec_num, i);
      if (this.root.info.login_state) {
        this.checkJoayo(this.list[i].rec_num, i);
        this.checkScrap(this.list[i].rec_num, i);
      }
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
    console.log("리스트");
    if (this.list.length === this.list_count) return;
    let url = "http://localhost:9000/acorn/mypage/recipe";
    axios({
      method: "get",
      url: url,
      params: {
        scroll: this.scroll,
        email: this.mypage.email,
      },
    })
      .then((res) => {
        this.scroll++;
        console.log(res.data);
        if (this.scroll === 1) {
          this.list = res.data.list;
        } else {
          this.list = [...this.list, ...res.data.list];
        }
        this.setList();
        this.list_count = res.data.count;
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  @action
  getList_scrap = () => {
    console.log("스크랩리스트");
    if (this.list.length === this.list_count) return;
    let url = "http://localhost:9000/acorn/mypage/scrap";
    axios({
      method: "get",
      url: url,
      params: {
        scroll: this.scroll,
        email: this.mypage.email,
      },
    })
      .then((res) => {
        this.scroll++;
        console.log(res.data);
        if (this.scroll === 1) {
          this.list = res.data.list;
        } else {
          this.list = [...this.list, ...res.data.list];
        }
        this.setList();
        this.list_count = res.data.count;
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
        email: this.mypage.email,
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
    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { email: this.mypage.email, rec_num: num },
      })
        .then((res) => {
          this.updateCheck(num, idx);
        })
        .catch((err) => {});
    }
  };

  @computed
  get checkList() {
    return this.list_count === this.list.length;
  }

  //스크랩체크
  @action
  checkScrap = (num, idx) => {
    let url = "http://localhost:9000/acorn/connect/scrapcheck";

    axios({
      method: "get",
      url: url,
      params: {
        email: this.mypage.email,
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
    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { email: this.mypage.email, rec_num: num },
      })
        .then((res) => {
          this.updateCheck(num, idx);
        })
        .catch((err) => {});
    }
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

  //소식받기체크
  @action
  checkNews = () => {
    let url = "http://localhost:9000/acorn/connect/newscheck";

    axios({
      method: "get",
      url: url,
      params: {
        provider: this.mypage.email,
        receiver: this.root.info.userEmail,
      },
    })
      .then((res) => {
        this.checkn = res.data;
        console.log(this.checkn);
      })
      .catch((err) => {
        console.log("소식받기체크오류:" + err);
      });
  };

  //소식받기
  @action
  onNews = () => {
    let url = "http://localhost:9000/acorn/connect/onnews";

    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: {
          provider: this.mypage.email,
          receiver: this.root.info.userEmail,
        },
      })
        .then((res) => {
          this.checkNews();
        })
        .catch((err) => {
          console.log("소식받기오류:" + err);
        });
    }
  };

  //소식받기취소
  @action
  offNews = () => {
    let url = "http://localhost:9000/acorn/connect/offnews";

    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: {
          provider: this.mypage.email,
          receiver: this.root.info.userEmail,
        },
      })
        .then((res) => {
          this.checkNews();
        })
        .catch((err) => {
          console.log("소식받기취소오류:" + err);
        });
    }
  };
}
