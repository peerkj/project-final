import { observable, action, computed } from "mobx";
import axios from "axios";

export default class DetailStore {
  @observable all = {};
  @observable comp_list = [];
  @observable ing_list = [];
  @observable step_list = [];

  @observable nickname = "";
  @observable profile = "";

  @observable comp_img = "";

  @observable comp_index = 0;

  @observable comp_pause = null;

  constructor(root) {
    this.root = root;
  }

  @action
  getRecipe = (rec_num) => {
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
        this.getInfo(this.all.email);
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  @action
  getInfo = (email) => {
    let url = "http://localhost:9000/acorn/chef/modform?email=" + email;

    //유효성 검사
    axios({
      method: "get",
      url: url,

      //headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        this.nickname = res.data.nickname;
        this.profile = res.data.profile;
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
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

  //일시정지
  @action
  sliderP = () => {
    clearInterval(this.comp_pause);
  };
}
