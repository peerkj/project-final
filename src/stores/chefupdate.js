import { observable, action, computed } from "mobx";
import axios from "axios";

export default class loginStore {
  @observable password = "";
  @observable modal_open = false;
  @observable pass_open = false;
  @observable error = "";
  @observable pass_check = false;
  @observable idx = "";
  @observable new_password = "";
  @observable new_password_re = "";
  constructor(root) {
    this.root = root;
  }


  @action
  handleEnter = (e, history) => {
    if (e.key === "Enter") this.handleUpdate(history);
  };

  @action
  handleEnter2 = (e) => {
    if (e.key === "Enter") this.handlePassUpdate();
  };

  @action
  handleOpen = (idx) => {
    this.idx = idx;
    this.password = "";
    this.modal_open = !this.modal_open;
  };
  @action
  handleOpen2 = () => {
    this.new_password = "";
    this.new_password_re = "";
    this.pass_open = !this.pass_open;
  };
  @action
  handlePassChange = (e) => {
    this.password = e.target.value;
  };

  @action
  handleNewPassChange = (e) => {
    this.new_password = e.target.value;
  };
  @action
  handleNewPassReChange = (e) => {
    this.new_password_re = e.target.value;
  };

  @action
  handleReset = () => {
    this.password = "";
    this.modal_open = false;
    this.pass_check = false;

    this.idx = "";
    this.error = "";
    this.pass_open = false;
  };
  //유효성검사
  @computed
  get available_pass_re() {
    return this.new_password_re === this.new_password;
  }
  @computed
  get available_password() {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    return regExp.test(this.password);
  }
  @computed
  get available_newpassword() {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    return regExp.test(this.new_password);
  }
  @action
  handleUpdate = (history) => {
    let url = "http://localhost:9000/acorn/chef/login";
    let update = new FormData();
    update.append("email", this.root.info.userEmail);
    update.append("pass", this.password);

    //유효성 검사
    if (this.password === "") {
      this.error = "비밀번호를 입력하세요";
    } else if (!this.available_password) {
      this.error = "비밀번호 형식을 지켜주세요";
    } else {
      axios({
        method: "post",
        url: url,
        data: update,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          if (res.data === 1) {
            //성공
            this.pass_check = true;
            if (this.idx === 1) {
              this.root.info.getInfo();
              history.push("/chefupdate");
            } else if (this.idx === 3) {
              history.push("/withdraw");
            } else if (this.idx === 2) {
              this.modal_open = false;
              this.pass_check = false;

              this.idx = "";
              this.error = "";
              this.pass_open = true;
              alert("비밀번호가 변경되었습니다");
            }
          } else {
            //실패
            this.error = "회원정보와 일치하지 않습니다.";
            this.pass_check = false;
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
  };
  @action
  handlePassUpdate = () => {
    let url = "http://localhost:9000/acorn/chef/modpass";
    let update = new FormData();
    update.append("email", this.root.info.userEmail);
    update.append("pass", this.password);
    update.append("newpass", this.new_password);

    //유효성 검사
    if (this.new_password === "") {
    } else if (!this.available_newpassword) {
    } else if (this.new_password_re === "" || !this.available_pass_re) {
    } else {
      axios({
        method: "post",
        url: url,
        data: update,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          this.handleReset();
          this.password = "";
          this.handleOpen2();
          this.pass_open = false;
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
  };
}