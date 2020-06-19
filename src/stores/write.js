import { observable, action, computed } from "mobx";
import axios from "axios";
export default class WriteStore {
  //주 재료

  @observable main_ingre = [{ sort: "주재료", ingre_name: "", quantity: "" }];
  @observable sub_ingre = [{ sub_ingre: "", sub_quantity: "" }];
  @observable step = [{ ex: "", profile: null, imgBase64: "" }];
  @observable done = [{ profile: null, imgBase64: "" }];

  constructor(root) {
    this.root = root;
  }
  //순서바꾸기
  @action
  changeStep = (idx, move) => {
    let temp = this.step[idx];
    this.step[idx] = this.step[move];
    this.step[move] = temp;
  };

  //완성 사진 순서 바꾸기
  @action
  changeDone = (idx, move) => {
    let size = this.done.length - 1;
    if (idx === size) {
    } else if (move === size) {
    } else {
      let temp = this.done[idx];
      this.done[idx] = this.done[move];
      this.done[move] = temp;
    }
  };

  //완성 사진 추가
  @action
  handelAddDone = () => {
    this.done.push({ profile: null, imgBase64: "" });
  };
  //완성 사진 삭제
  handelDelete_done = (idx) => {
    if (!(idx === this.done.length - 1)) this.done.splice(idx, 1);
  };
  //완성 사진 넣기
  @action
  handleChangeDone = (e, idx) => {
    let reader = new FileReader();
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;

    if (!fileForm.test(e.target.value.toLowerCase()) && e.target.value !== "") {
      alert("이미지 파일만 업로드하세요!");
      e.target.value = "";
    } else if (e.target.value === "") {
    } else {
      reader.onloadend = (e) => {
        // 2. 읽기가 완료되면 아래코드가 실행
        const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
        if (base64) {
          this.done[idx].imgBase64 = base64.toString(); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        this.done[idx].profile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
      this.handelAddDone();
    }
  };
  @action
  handleRemoveDone = (idx) => {
    this.done[idx].imgBase64 = "";
    this.done[idx].profile = null;
  };

  //주 재료 추가
  @action
  handelAddMain = () => {
    this.main_ingre.push({ sort: "주재료", ingre_name: "", quantity: "" });
  };
  @action
  handelAddSub = () => {
    this.sub_ingre.push({ sub_ingre: "", sub_quantity: "" });
  };
  @action
  handelAddStep = () => {
    this.step.push({ ex: "", profile: null, imgBase64: "" });
  };
  //재료 입력
  @action
  handleChange_main_i = (e, idx) => {
    this.main_ingre[idx].ingre_name = e.target.value;
  };
  @action
  handleChange_sub_i = (e, idx) => {
    this.sub_ingre[idx].sub_ingre = e.target.value;
  };
  //용량 입력
  @action
  handleChange_main_q = (e, idx) => {
    this.main_ingre[idx].quantity = e.target.value;
  };
  @action
  handleChange_sub_q = (e, idx) => {
    this.sub_ingre[idx].sub_quantity = e.target.value;
  };
  @action
  onChangeStep = (e, idx) => {
    this.step[idx].ex = e.target.value;
  };
  //삭제
  handelDelete_ingre = (idx) => {
    if (!(this.main_ingre.length === 1)) this.main_ingre.splice(idx, 1);
  };
  handelDelete_ingre_sub = (idx) => {
    if (!(this.sub_ingre.length === 1)) this.sub_ingre.splice(idx, 1);
  };
  handelDelete_step = (idx) => {
    if (!(this.step.length === 1)) this.step.splice(idx, 1);
  };
  @action
  handleChangeImg = (e, idx) => {
    let reader = new FileReader();
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;

    if (!fileForm.test(e.target.value.toLowerCase()) && e.target.value !== "") {
      alert("이미지 파일만 업로드하세요!");
      e.target.value = "";
    } else {
      reader.onloadend = (e) => {
        // 2. 읽기가 완료되면 아래코드가 실행
        const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
        if (base64) {
          this.step[idx].imgBase64 = base64.toString(); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        this.step[idx].profile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };
  @action
  handleRemove = (idx) => {
    this.step[idx].imgBase64 = "";
    this.step[idx].profile = null;
  };

  @action
  insertRecipe = () => {
    let url = "http://localhost:9000/acorn/recipe/regist";
    let submit = new FormData();
    //submit.append("repre_photofile",);  //대표사진(썸네일)
    // submit.append("subject", this.subject);
    // submit.append("summary", this.summary);
    // submit.append("food_cate", this.foodcatevalue);
    // submit.append("portion", this.portionvalue);
    // submit.append("time", this.timevalue);
    // submit.append("difficult", this.difftvalue);
    // submit.append("tip", this.tip);
    // submit.append("ingreList", this.main_ingre);

    submit.append("ingreList", this.main_ingre[0]); //주재료인지 부재료인지

    for (var value of submit.entries()) {
      console.log(value[0]);
    }
    // //순서
    // for (let i = 0; i < e.step.length; i++) {
    //     submit.append("orderList[" + i + "].order_num", i + 1); //순서
    //     submit.append("orderList[" + i + "].content",e.step[i].value);    //설명
    //     submit.append("orderList[" + i + "].photofile",);  //사진
    // }
    // //완성사진
    // for (let i = 0; i < ; i++) {
    //     submit.append("comp_photoList[" + i + "]",);
    // }
    axios({
      method: "post",
      url: url,
      data: submit,
    })
      .then((res) => {})
      .catch((err) => {
        console.log("레시피 업로드 오류:" + err);
      });
  };
}