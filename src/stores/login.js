import { observable, action, computed } from "mobx";
import axios from "axios";

export default class loginStore {
  @observable email = "";
  @observable password = "";
  @observable error = "";
  constructor(root) {
    this.root = root;
  }

  @action
  handleEnter = (e, history) => {
    if (e.key === "Enter") this.handleLogin(history);
  };

  @action
  handleReset = () => {
    this.email = "";
    this.password = "";
    this.error = "";
  };

  @action
  fakeFetch = (delay = 1500) => new Promise((res) => setTimeout(res, delay));

  @action
  handleLogin = (history) => {
    let url = "http://localhost:9000/acorn/chef/login";
    let login = new FormData();

    login.append("email", this.email);
    login.append("pass", this.password);

    //유효성 검사
    if (this.email === "") {
      this.error = "이메일을 입력하세요";
    } else if (!this.available_email) {
      this.error = "이메일 형식을 지켜주세요";
    } else if (this.password === "") {
      this.error = "비밀번호를 입력하세요";
    } else if (!this.available_email) {
      this.error = "비밀번호 형식을 지켜주세요";
    } else {
      axios({
        method: "post",
        url: url,
        data: login,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then(async (res) => {
          if (res.data === 1) {
            //성공 or 실패
            localStorage.setItem("userEmail", this.email);
            localStorage.setItem("auth", true);

            this.root.info.userEmail = this.email;
            this.root.info.auth = true;
            await this.fakeFetch(200);
            await this.root.info.getInfo();
            //await this.fakeFetch(500);
            this.root.findPass.modal_open = false;
            history.go(-1);
          } else {
            //실패
            this.error = "회원정보와 일치하지 않습니다.";
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }

    setTimeout(() => {
      this.root.findPass.handleOpen();
    }, 350);
  };

  @action
  handleEmailChange = (e) => {
    this.email = e.target.value;
  };
  @action
  handlePassChange = (e) => {
    this.password = e.target.value;
    var regExp = /^.{0,10}$/;
    if (!regExp.test(this.password)) {
      this.password = this.password.substring(0, 9);
    }
  };

  @action
  handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("auth");
    localStorage.removeItem("name");
    localStorage.removeItem("nickname");
    localStorage.removeItem("hp");
    localStorage.removeItem("profile_name");
    this.root.join.userEmail = null;
    this.root.join.auth = null;
    this.root.join.name = null;
    this.root.join.nickname = null;
    this.root.join.hp = null;
    this.root.join.profile_name = null;

    window.location.replace("/");
  };

  @computed
  get available_email() {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){3,}@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(this.email);
  }
  @computed
  get available_password() {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    return regExp.test(this.password);
  }
}
