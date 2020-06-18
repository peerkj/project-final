import { observable, action, computed } from "mobx";

export default class WriteStore {
  //주 재료

  @observable main_ingre = [{ main_ingre: "", main_quantity: "" }];
  @observable sub_ingre = [{ sub_ingre: "", sub_quantity: "" }];
  @observable step = [{ profile: null, imgBase64: "" }];

  @observable profile = null;
  @observable imgBase64 = "";
  constructor(root) {
    this.root = root;
  }
  //주 재료 추가
  @action
  handelAddMain = () => {
    this.main_ingre.push({ main_ingre: "", main_quantity: "" });
  };
  @action
  handelAddSub = () => {
    this.sub_ingre.push({ sub_ingre: "", sub_quantity: "" });
  };
  @action
  handelAddStep = () => {
    this.step.push({ profile: null, imgBase64: "" });
  };
  //재료 입력
  @action
  handleChange_main_i = (e, idx) => {
    this.main_ingre[idx].main_ingre = e.target.value;
  };
  @action
  handleChange_sub_i = (e, idx) => {
    this.sub_ingre[idx].sub_ingre = e.target.value;
  };
  //용량 입력
  @action
  handleChange_main_q = (e, idx) => {
    this.main_ingre[idx].main_quantity = e.target.value;
  };
  @action
  handleChange_sub_q = (e, idx) => {
    this.sub_ingre[idx].sub_quantity = e.target.value;
  };
  //삭제
  handelDelete_ingre = (idx) => {
    this.main_ingre.splice(idx, 1);
  };
  handelDelete_ingre_sub = (idx) => {
    this.sub_ingre.splice(idx, 1);
  };
  handelDelete_step = (idx) => {
    this.step.splice(idx, 1);
  };
  @action
  handleChangeImg = (e) => {
    let reader = new FileReader();
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    console.log("변경");
    if (!fileForm.test(e.target.value.toLowerCase())) {
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
}
