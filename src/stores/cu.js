import { observable, action, computed } from "mobx";
import axios from "axios";

export default class CU {
  //회원정보 수정
  @observable email = this.root.info.userEmail;
  @observable name = this.root.info.name;
  @observable nickname = this.root.info.nickname;
  @observable hp = this.root.info.hp;

  @observable nickname_check = false;

  constructor(root) {
    this.root = root;
  }

  //input
  @action
  handleNameChange = (e) => {
    this.name = e.target.value;
  };
  @action
  handleNicknameChange = (e) => {
    this.nickname = e.target.value;
    this.checkNickname();
  };
  @action
  handleHpChange = (e) => {
    this.hp = e.target.value;
  };

  //유효성
  @computed
  get available_name() {
    var regExp = /^[가-힣]{2,5}$/;
    return regExp.test(this.name);
  }
  @computed
  get available_nickname() {
    var regExp = /^[가-힣]{2,8}$/;
    return regExp.test(this.nickname);
  }
  @computed
  get available_hp() {
    var regExp = /^[0-9]{11,12}$/;
    return regExp.test(this.hp);
  }

  @action
  checkNickname = () => {
    let url = "http://localhost:9000/acorn/chef/checknick";
    let nickname = new FormData();
    nickname.append("nickname", this.nickname);
    if (this.available_nickname) {
      axios({
        method: "post",
        url: url,
        data: nickname,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          if (res.data === 1) {
            this.nickname_check = true;
          } else {
            this.nickname_check = false;
            if (this.nickname === this.root.info.nickname)
              this.nickname_check = true;
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
  };
}
