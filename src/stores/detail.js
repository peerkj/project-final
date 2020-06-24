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
  constructor(root) {
    this.root = root;
  }

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
  handleShare = () => {
    this.modal_open = !this.modal_open;
  };

  @action
  onCopy = () => {
    this.copied = true;
  };

  //댓글모달
  @action
  handleComment = () => {
    this.comment_open = !this.comment_open;
  };

  //
  @action
  getRecipe = (rec_num) => {
    this.rec_num = rec_num;
    let url = "http://localhost:9000/acorn/recipe/select?rec_num=" + rec_num;
    axios({
      url: url,
      method: "get",
    })
      .then((res) => {
        this.all = res.data;
        console.log(res.data);
        this.comp_list = this.all.comp_photo.split(",");
        this.comp_img = this.comp_list[0];

        this.ing_list = res.data.ingreList;
        this.step_list = res.data.orderList;

        this.checkJoayo();
        this.checkScrap();
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  @action
  changeComp = () => {
    this.comp_pause = setInterval(() => {
      this.comp_img = this.comp_list[this.comp_index];
      this.comp_index++;
      if (this.comp_index === this.comp_list.length) this.comp_index = 0;
    }, 2000);
  };

  // >버튼
  @action
  sliderR = () => {
    if (this.comp_index === this.comp_list.length - 1)
      this.comp_img = this.comp_list[0];
    else this.comp_img = this.comp_list[this.comp_index++];
  };

  // <버튼
  @action
  sliderL = () => {
    if (this.comp_index === 0)
      this.comp_img = this.comp_list[this.comp_list.length - 1];
    else this.comp_img = this.comp_list[this.comp_index--];
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
  };

  //좋아요체크
  @action
  checkJoayo = () => {
    let url = "http://localhost:9000/acorn/connect/joayocheck";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: this.rec_num },
    })
      .then((res) => {
        this.checkjoa = res.data;
      })
      .catch((err) => {});
  };

  //좋아요
  @action
  Joayo = () => {
    let url = "http://localhost:9000/acorn/connect/joayo";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: this.rec_num },
    })
      .then((res) => {
        this.checkJoayo();
      })
      .catch((err) => {});
  };

  //스크랩체크
  @action
  checkScrap = () => {
    let url = "http://localhost:9000/acorn/connect/scrapcheck";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: this.rec_num },
    })
      .then((res) => {
        this.checkscr = res.data;
      })
      .catch((err) => {});
  };

  //스크랩
  @action
  Scrap = () => {
    let url = "http://localhost:9000/acorn/connect/scrap";

    axios({
      method: "get",
      url: url,
      params: { email: this.root.info.userEmail, rec_num: this.rec_num },
    })
      .then((res) => {
        this.checkScrap();
      })
      .catch((err) => {});
  };
}
