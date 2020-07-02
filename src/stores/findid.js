import { observable, action, computed } from "mobx";
import axios from "axios";

export default class JoinStore {
  @observable name = "";
  @observable hp = "010";
  @observable result = "";
  @observable result_state = false;
  @observable error = "";

  constructor(root) {
    this.root = root;
  }
  //input
  @action
  handleNameChange = (e) => {
    this.name = e.target.value;
  };
  @action
  handleHpChange = (e) => {
    this.hp = e.target.value;
  };

  @action
  handleReset = () => {
    this.name = "";
    this.hp = "010";
    this.result = "";
    this.result_state = false;
    this.error = "";
  };

  @action
  handleEnter = (e, history) => {
    if (e.key === "Enter") this.handleSubmit(history);
  };

  //유효성검사
  @computed
  get available_name() {
    var regExp = /^[가-힣]{2,5}|[a-zA-Z]{2,12}\s[a-zA-Z]{2,12}$/;
    return regExp.test(this.name);
  }
  @computed
  get available_hp() {
    var regExp = /^[0-9]{11,12}$/;

    return regExp.test(this.hp);
  }

  @action
  handleSubmit = () => {
    //유효성 검증
    if (this.name === "") {
      this.error = "이름을 입력하세요";
    } else if (!this.available_name) {
      this.error = "이름 형식을 지켜주세요";
    } else if (this.hp === "") {
      this.error = "전화번호를 입력하세요";
    } else if (!this.available_hp) {
      this.error = "전화번호 형식을 지켜주세요";
    } else {
      let url = "http://localhost:9000/acorn/chef/findid";
      let findId = new FormData();
      findId.append("name", this.name);
      findId.append("hp", this.hp);
      axios({
        method: "post",
        url: url,
        data: findId,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          //없으면 공백
          if (res.data === "") {
            this.result = "일치하는 회원정보가 없습니다.";
            this.result_state = false;
          } else {
            this.result = `${this.name}님의 이메일 주소는  ${res.data}입니다`;
            this.result_state = true;
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
      setTimeout(() => {
        this.root.findPass.handleOpen();
      }, 2500);
    }
  };
}
