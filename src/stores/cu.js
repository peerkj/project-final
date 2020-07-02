import { observable, action, computed } from "mobx";
import axios from "axios";

export default class CU {
  //회원정보 수정
  @observable email = this.root.info.userEmail;
  @observable name = this.root.info.name;
  @observable nickname = this.root.info.nickname;
  @observable menu_nick = this.root.info.nickname;
  @observable hp = this.root.info.hp;
  @observable error = "";
  @observable profile = null;
  @observable
  imgBase64 = `http://localhost:9000/acorn/image/profile/${this.root.info.profile_name}`;
  @observable
  menu_profile = `http://localhost:9000/acorn/image/profile/${
    this.root.info.profile_name === "basic_user.png"
      ? "basic_user2.png"
      : this.root.info.profile_name
  }`;
  @observable nickname_check = false;

  constructor(root) {
    this.root = root;
  }

  @action
  reLoadState = () => {
    this.email = this.root.info.userEmail;
    this.name = this.root.info.name;
    this.nickname = this.root.info.nickname;
    this.menu_nick = this.root.info.nickname;
    this.hp = this.root.info.hp;
    this.imgBase64 = `http://localhost:9000/acorn/image/profile/${this.root.info.profile_name}`;
    if (this.root.info.profile_name === "basic_user.png") {
      this.menu_profile = `http://localhost:9000/acorn/image/profile/basic_user2.png`;
    } else
      this.menu_profile = `http://localhost:9000/acorn/image/profile/${this.root.info.profile_name}`;
  };

  @action
  checkImg = () => {
    if (this.root.info.profile_name === "basic_user.png") {
      this.imgBase64 = "";
    }
  };
  @action
  reloadimg = () => {
    this.imgBase64 = `http://localhost:9000/acorn/image/profile/${this.root.info.profile_name}`;
    this.checkImg();
  };

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
  @action
  handleChangeImg = (e) => {
    let reader = new FileReader();
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;

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
  @action
  handleSubmit = (history) => {
    let url = "http://localhost:9000/acorn/chef/mod";
    let submit = new FormData();
    submit.append("name", this.name);
    submit.append("email", this.email);
    submit.append("hp", this.hp);
    submit.append("nickname", this.nickname);

    //이미지 파일 dto 명
    //사진이 변경 안됐거나 삭제되면 null
    submit.append("profileimage", this.profile);
    let change = 0;
    if (this.profile !== null || this.imgBase64 === "") change = 1;

    submit.append("change", change);

    //유효성 처리
    if (this.name === "") {
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
          this.root.info.getInfo();

          history.push("/myinfo");
        })
        .catch((err) => {
          console.log("업로드 오류:" + err);
        });
    }
  };
}
