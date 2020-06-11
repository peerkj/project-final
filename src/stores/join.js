import { observable, action, computed } from "mobx";

export default class CounterStore {
  @observable email = "";
  //@observable email_check = ""; //유효성 검사
  @observable password = "";
  @observable password_check = "";
  @observable name = "";
  @observable nickname = "";
  @observable birth = "";
  @observable profile = null;
  @observable imgBase64 = "";

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  handleChange = (e) => {
    this.email = e.target.value;
  };
  //유효성검사-이메일
  @computed
  get emailCheck() {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    return regExp.test(this.email);
  }
  @action
  handleChangeImg = (e) => {
    let reader = new FileReader();
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    console.log("변경");
    if (!fileForm.test(e.target.value)) {
      alert("이미지 파일만 업로드하세요");
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
}
