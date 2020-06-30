import { observable, action, computed } from "mobx";
import axios from "axios";

export default class JoinStore {
  @observable email = "";
  @observable password = "";
  @observable password_re = "";
  @observable name = "";
  @observable nickname = "";
  @observable hp = "010";

  @observable profile = null;
  @observable imgBase64 = "";
  @observable email_check = false;
  @observable nickname_check = false;
  @observable error = "";

  //회원정보수정
  @observable info = {};

  constructor(root) {
    this.root = root;
  }
  //input
  @action
  handleEmailChange = (e) => {
    this.email = e.target.value;
  };
  @action
  handlePassChange = (e) => {
    this.password = e.target.value;
  };
  @action
  handlePassCheckChange = (e) => {
    this.password_re = e.target.value;
  };
  @action
  handleNameChange = (e) => {
    this.name = e.target.value;
  };
  @action
  handleNicknameChange = (e) => {
    this.nickname = e.target.value;
  };
  @action
  handleHpChange = (e) => {
    this.hp = e.target.value;
  };

  @action
  handelReset = () => {
    this.email = "";
    this.password = "";
    this.password_re = "";
    this.name = "";
    this.nickname = "";
    this.hp = "010";

    this.profile = null;
    this.imgBase64 = "";
    this.email_check = false;
    this.nickname_check = false;
    this.error = "";
  };

  //유효성검사
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
  @computed
  get available_pass_re() {
    return this.password_re === this.password;
  }
  @computed
  get available_name() {
    var regExp = /^[가-힣]{2,5}$/;
    return regExp.test(this.name);
  }
  @computed
  get available_hp() {
    var regExp = /^[0-9]{11,12}$/;
    return regExp.test(this.hp);
  }

  @computed
  get available_nickname() {
    var regExp = /^[가-힣]{2,8}$/;
    return regExp.test(this.nickname);
  }

  @action
  handleChangeImg = (e) => {
    let reader = new FileReader();
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    console.log("변경");
    if (!fileForm.test(e.target.value.toLowerCase()) && e.target.value !== "") {
      alert("이미지 파일만 업로드하세요!!!!!");
      e.target.value = "";
    } else {
      reader.onloadend = (e) => {
        // 2. 읽기가 완료되면 아래코드가 실행
        const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
        if (base64) {
          this.imgBase64 = base64.toString(); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        this.profile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };

  @action
  handleRemove = () => {
    this.imgBase64 = "";
    this.profile = null;
  };

  //중복체크
  @computed
  get checkEmail() {
    let url = "http://localhost:9000/acorn/chef/checkid";
    let email = new FormData();
    email.append("email", this.email);
    if (this.available_email) {
      axios({
        method: "post",
        url: url,
        data: email,
        //headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          if (res.data === 1) {
            this.email_check = true;
          } else {
            this.email_check = false;
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
    return this.email_check;
  }
  @computed
  get checkNickname() {
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
          }
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
    return this.nickname_check;
  }

  @action
  handleSubmit = () => {
    let url = "http://localhost:9000/acorn/chef/regist";
    let submit = new FormData();
    submit.append("name", this.name);
    submit.append("email", this.email);
    submit.append("pass", this.password);
    submit.append("hp", this.hp);
    //이미지 파일 dto 명
    submit.append("profileimage", this.profile);
    submit.append("nickname", this.nickname);
    //유효성 처리
    if (this.email === "") {
      this.error = "이메일을 입력하세요";
    } else if (!this.available_email) {
      this.error = "이메일 형식을 지켜주세요";
    } else if (!this.email_check) {
      this.error = "이미 가입된 이메일입니다.";
    } else if (this.password === "") {
      this.error = "비밀번호를 입력하세요";
    } else if (!this.available_password) {
      this.error = "비밀번호 형식을 지켜주세요";
    } else if (this.password_re === "" || !this.available_pass_re) {
      this.error = "비밀번호가 일치하지 않습니다";
    } else if (this.name === "") {
      this.error = "이름을 입력하세요";
    } else if (!this.available_name) {
      this.error = "이름 형식을 지켜주세요";
    } else if (this.nickname === "") {
      this.error = "닉네임을 입력하세요";
    } else if (!this.available_nickname) {
      this.error = "닉네임 형식을 지켜주세요";
    } else if (!this.nickname_check) {
      this.error = "이미 가입된 닉네임입니다.";
    } else if (this.hp === "") {
      this.error = "전화번호를 입력하세요";
    } else if (!this.available_hp) {
      this.error = "전화번호 형식을 지켜주세요";
    } else {
      axios({
        method: "post",
        url: url,
        data: submit,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          alert("가입을 축하합니다!!");
          window.location.push("/login");
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
  };
}
