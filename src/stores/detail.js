import { observable, action } from "mobx";
import axios from "axios";

export default class DetailStore {
  @observable all = {};
  @observable comp_list = [];
  @observable ing_list = [];
  @observable step_list = [];

  @observable rec_num = "";
  @observable checkjoa = "";
  @observable checkscr = "";

  @observable comp_img = "";
  @observable comp_index = 0;
  @observable comp_pause = null;

  //공유모달

  @observable modal_open = false;
  @observable url = window.location.href;
  @observable copied = "false";

  //댓글모달
  @observable comment_open = false;

  //step 상태
  @observable step_state = 0;
  @observable step_slide = 0;

  @observable c_count = 0;

  constructor(root) {
    this.root = root;
  }

  @action
  setRec_num = (num) => {
    this.rec_num = num;
  };

  //버튼 누르면 step 변경
  @action
  changeStep = (i) => {
    //0 기본
    //1 글만
    //2 슬라이더
    this.step_state = i;
  };

  //공유모달
  @action
  handleShare = (v = 0) => {
    this.url = window.location.href;
    let u = this.url.split(":");
    this.url = u[0] + ":" + u[1] + ":3000/recipe/detail?recipe=" + v;

    this.modal_open = !this.modal_open;
  };

  @action
  onCopy = () => {
    this.copied = true;
  };

  //댓글모달
  @action
  handleComment = () => {
    this.root.comment.comment_list = [];
    this.root.comment.scroll = 0;
    this.comment_open = !this.comment_open;
    this.root.recipe.getComment(
      this.root.recipe.view.num,
      this.root.recipe.view.idx
    );
  };
  @action
  modalReset = () => {
    this.comment_open = false;
    this.root.mypage.resetRecipe();
    window.scrollTo(0, 0);
  };
  //
  @action
  getRecipe = (rec_num) => {
    this.rec_num = rec_num;
    let url = "http://3.128.62.155:8080/Team5Spring/recipe/select?rec_num=" + rec_num;
    axios({
      url: url,
      method: "get",
    })
      .then((res) => {
        this.all = res.data;
        this.comp_list = this.all.comp_photo.split(",");
        this.comp_img = this.comp_list[0];

        this.ing_list = res.data.ingreList;
        this.step_list = res.data.orderList;

        if (this.root.info.login_state) {
          this.checkJoayo();
          this.checkScrap();
        }
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  @action
  changeComp = () => {
    if (this.comp_pause === null) {
      this.comp_pause = setInterval(() => {
        this.comp_index++;
        if (this.comp_index === this.comp_list.length) this.comp_index = 0;
        this.comp_img = this.comp_list[this.comp_index];
      }, 2000);
    }
  };

  // >버튼
  @action
  sliderR = () => {
    this.sliderP();
    if (this.comp_index >= this.comp_list.length - 1) {
      this.comp_index = 0;
      this.comp_img = this.comp_list[this.comp_index];
    } else {
      this.comp_index++;

      this.comp_img = this.comp_list[this.comp_index];
    }
    this.changeComp();
  };

  // <버튼
  @action
  sliderL = () => {
    this.sliderP();
    if (this.comp_index === 0) {
      this.comp_index = this.comp_list.length - 1;
      this.comp_img = this.comp_list[this.comp_index];
    } else {
      this.comp_index--;
      this.comp_img = this.comp_list[this.comp_index];
    }
    this.changeComp();
  };

  // >버튼
  @action
  stepR = () => {
    if (this.step_slide === this.step_list.length - 1) this.step_slide = 0;
    else this.step_slide++;
  };

  // <버튼
  @action
  stepL = () => {
    if (this.step_slide === 0) this.step_slide = this.step_list.length - 1;
    else this.step_slide--;
  };

  //일시정지
  @action
  sliderP = () => {
    clearInterval(this.comp_pause);
    this.comp_pause = null;
  };

  //좋아요체크
  @action
  checkJoayo = () => {
    let url = "http://3.128.62.155:8080/Team5Spring/connect/joayocheck";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: this.rec_num },
    })
      .then((res) => {
        this.checkjoa = res.data;
      })
      .catch((err) => { });
  };

  //좋아요
  @action
  Joayo = () => {
    let url = "http://3.128.62.155:8080/Team5Spring/connect/joayo";
    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { email: this.root.info.userEmail, rec_num: this.rec_num },
      })
        .then((res) => {
          this.checkJoayo();
        })
        .catch((err) => { });
    }
  };

  //스크랩체크
  @action
  checkScrap = () => {
    let url = "http://3.128.62.155:8080/Team5Spring/connect/scrapcheck";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: this.rec_num },
    })
      .then((res) => {
        this.checkscr = res.data;
      })
      .catch((err) => { });
  };

  //스크랩
  @action
  Scrap = () => {
    let url = "http://3.128.62.155:8080/Team5Spring/connect/scrap";
    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { email: this.root.info.userEmail, rec_num: this.rec_num },
      })
        .then((res) => {
          this.checkScrap();
        })
        .catch((err) => { });
    }
  };

  @action
  getComment = () => {
    let url = "http://3.128.62.155:8080/Team5Spring/comment/count";

    axios({
      method: "get",
      url: url,
      params: { rec_num: this.rec_num },
    })
      .then((res) => {
        this.c_count = res.data;
      })
      .catch((err) => { });
  };
}
