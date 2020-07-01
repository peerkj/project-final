import { observable, action, computed } from "mobx";
import axios from "axios";

export default class JoinStore {
  @observable userEmail = localStorage.getItem("userEmail");
  @observable auth = localStorage.getItem("auth");
  @observable name = localStorage.getItem("name");
  @observable nickname = localStorage.getItem("nickname");
  @observable hp = localStorage.getItem("hp");
  @observable profile_name = localStorage.getItem("profile_name");

  constructor(root) {
    this.root = root;
  }

  @action
  getInfo = () => {
    let url =
      "http://13.124.83.195:8080/Team5Spring/chef/modform?email=" +
      this.root.info.userEmail;

    //유효성 검사
    axios({
      method: "get",
      url: url,

      //headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("hp", res.data.hp);
        localStorage.setItem("profile_name", res.data.profile);

        this.name = res.data.name;
        this.nickname = res.data.nickname;
        this.hp = res.data.hp;
        this.profile_name = res.data.profile;
        this.root.cu.reLoadState();
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
      });
  };
  @computed
  get login_state() {
    return this.userEmail !== null && this.auth;
  }
}
