import { observable, action, computed } from "mobx";
import axios from "axios";

export default class JoinStore {
  @observable name = "";
  @observable email = "";
  @observable result = "";
  @observable result_state = false;
  @observable modal_open = false;
  @observable error = "";

  constructor(root) {
    this.root = root;
  }

  @action
  handleEnter = (e, history) => {
    if (e.key === "Enter") this.handleSubmit(history);
  };

  @action
  handleReset = () => {
    this.name = "";
    this.email = "";
    this.result = "";
    this.result_state = false;
    this.modal_open = false;
    this.error = "";
  };

  @action
  handleOpen = () => {
    this.modal_open = !this.modal_open;
  };

  //input
  @action
  handleNameChange = (e) => {
    this.name = e.target.value;
  };
  @action
  handleEmailChange = (e) => {
    this.email = e.target.value;
  };
  //유효성검사
  @computed
  get available_name() {
    var regExp = /^[가-힣]{2,5}|[a-zA-Z]{2,12}\s[a-zA-Z]{2,12}$/;
    return regExp.test(this.name);
  }
  @computed
  get available_email() {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){3,}@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(this.email);
  }

  @action
  handleSubmit = () => {
    //유효성 검증
    if (this.name === "") {
      this.error = "이름을 입력하세요";
    } else if (!this.available_name) {
      this.error = "이름 형식을 지켜주세요";
    } else if (this.email === "") {
      this.error = "이메일 입력하세요";
    } else if (!this.available_email) {
      this.error = "이메일 형식을 지켜주세요";
    } else {
      let url = "http://13.124.83.195:8080/Team5Spring/chef/findpass";
      let findPass = new FormData();
      findPass.append("name", this.name);
      findPass.append("email", this.email);
      axios({
        method: "post",
        url: url,
        data: findPass,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          //없으면 공백
          if (res.data === 0) {
            this.result = "일치하는 회원정보가 없습니다.";
          } else {
            this.result = `이메일로 임시 비밀번호가 전송되었습니다.`;
            this.result_state = true;
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
      setTimeout(() => {
        this.modal_open = true;
      }, 650);
    }
  };
}
