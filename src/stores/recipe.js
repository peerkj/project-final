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
  @observable food_cate = "";
  @observable sort = "";

  //삭제 데이터 저장
  @observable rd = false;
  @observable delete_set = { rec_num: "" };

  //분류
  @observable cate_list = [
    ["All", "밥/죽/떡", "면", "국/탕/찌개"],
    ["튀김/부침", "무침", "볶음", "구이"],
    ["조림/찜", "양념/소스", "디저트", "기타"],
  ];
  @observable cate_index = 0;

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  //삭제
  @action
  deleteRecipe = (rec_num, history) => {
    let url = "http://3.128.62.155:8080/Team5Spring/recipe/delete?rec_num=" + rec_num;

    axios({
      method: "get",
      url: url,
    }).then((res) => {
      history.push("/recipe");
    }).catch((err) => {
      console.log("레시피삭제오루:" + err);
    })
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
  handleEnter = (e, history = null) => {
    if (e.key === "Enter") {
      //getList 초기화 후 얻기
      this.food_cate = "";
      this.sort = "";
      if (this.search === "") this.search = null;
      if (history !== null) history.push("/recipe");
      this.reset();
    }
  };

  @action
  setFood_cate = (food) => {
    this.sort = "";
    this.food_cate = food;
    if (food !== "All") this.reset();
    else this.resetRecipe();
  };

  @action
  setSort = (sort) => {
    this.sort = sort;
    this.reset();
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
  updateform = (rec_num, history) => {
    let url =
      "http://3.128.62.155:8080/Team5Spring/recipe/updateform?rec_num=" + rec_num;

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        this.root.recipeupdate.recipe = res.data;
        history.push("/update");
      })
      .catch((err) => {
        console.log("수정폼오류:" + err);
      });
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
    this.food_cate = "";
    this.sort = "";
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

  @computed
  get checkList() {
    return this.list_count === this.list.length;
  }
  //카운트 업데이트
  @action
  updateCount = (rec_num, idx) => {
    let url = "http://3.128.62.155:8080/Team5Spring/recipe/count?rec_num=" + rec_num;

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
    let url = "http://3.128.62.155:8080/Team5Spring/recipe/list";
    let sort = this.sort;
    if (this.search === "") this.search = null;
    if (this.food_cate === "") this.food_cate = null;
    if (sort === "") sort = null;
    if (this.list.length === this.list_count) return;

    axios({
      method: "get",
      url: url,
      params: {
        scroll: this.scroll,
        search: this.search,
        food_cate: this.food_cate,
        sort: sort,
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
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  //좋아요체크
  @action
  checkJoayo = (num, idx) => {
    let url = "http://3.128.62.155:8080/Team5Spring/connect/joayocheck";

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
    let url = "http://3.128.62.155:8080/Team5Spring/connect/joayo";
    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { email: this.root.info.userEmail, rec_num: num },
      })
        .then((res) => {
          this.updateCheck(num, idx);
        })
        .catch((err) => { });
    }
  };

  //스크랩체크
  @action
  checkScrap = (num, idx) => {
    let url = "http://3.128.62.155:8080/Team5Spring/connect/scrapcheck";

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
    let url = "http://3.128.62.155:8080/Team5Spring/connect/scrap";
    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { email: this.root.info.userEmail, rec_num: num },
      })
        .then((res) => {
          this.updateCheck(num, idx);
        })
        .catch((err) => { });
    }
  };
  //댓글 count
  @action
  getComment = (num, idx) => {
    let url = "http://3.128.62.155:8080/Team5Spring/comment/count";

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

  @action
  rdo = (num) => {
    this.delete_set.rec_num = num;

    this.rd = !this.rd;
  };

  //삭제
  @action
  deleteRecipe = () => {
    let url =
      "http://3.128.62.155:8080/Team5Spring/recipe/delete?rec_num=" +
      this.delete_set.rec_num;

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        this.rd = false;
        this.reset();
      })
      .catch((err) => {
        console.log("레시피삭제오루:" + err);
      });
  };
}
