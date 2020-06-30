import { observable, action, computed } from "mobx";
import axios from "axios";

export default class RecipeupdateStore {
  @observable rec_num = 25;
  @observable recipe = {
    food_cate: "구이",
    portion: "1인분",
    time: "15분 이내",
    difficult: "아무나",
  };

  @observable main_ingre = [];
  @observable sub_ingre = [];
  @observable step = [];
  @observable done = [];
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  //input
  @action
  handleSubjectChange = (e) => {
    this.recipe.subject = e.target.value;
  };

  @action
  handleSummaryChange = (e) => {
    this.recipe.summary = e.target.value;
  };

  @action
  handleFoodcateChange = (e) => {
    console.log(e.target.value);
    this.recipe.food_cate = e.target.value;
  };

  @action
  handlePortionChange = (e) => {
    this.recipe.portion = e.target.value;
  };

  @action
  handleTimeChange = (e) => {
    this.recipe.time = e.target.value;
  };

  @action
  handleDiffChange = (e) => {
    this.recipe.difficult = e.target.value;
  };

  @action
  handleTipChange = (e) => {
    this.recipe.tip = e.target.value;
  };
  //주 재료 추가
  @action
  handelAddMain = () => {
    if (this.main_ingre.length < 20)
      this.main_ingre.push({ ingre_name: "", quantity: "" });
    else alert("주재료 추가는 최대 20개까지 가능합니다.");
  };
  @action
  handelAddSub = () => {
    if (this.sub_ingre.length < 20)
      this.sub_ingre.push({ ingre_name: "", quantity: "" });
    else alert("부재료 추가는 최대 20개까지 가능합니다.");
  };
  //재료 입력
  @action
  handleChange_main_i = (e, idx) => {
    this.main_ingre[idx].ingre_name = e.target.value;
  };
  @action
  handleChange_sub_i = (e, idx) => {
    this.sub_ingre[idx].ingre_name = e.target.value;
  };
  //용량 입력
  @action
  handleChange_main_q = (e, idx) => {
    this.main_ingre[idx].quantity = e.target.value;
  };
  @action
  handleChange_sub_q = (e, idx) => {
    this.sub_ingre[idx].quantity = e.target.value;
  };

  //삭제
  @action
  handelDelete_ingre = (idx) => {
    if (!(this.main_ingre.length === 1)) this.main_ingre.splice(idx, 1);
  };
  @action
  handelDelete_ingre_sub = (idx) => {
    if (!(this.sub_ingre.length === 1)) this.sub_ingre.splice(idx, 1);
  };

  @action
  handelAddStep = () => {
    if (this.step.length < 30)
      this.step.push({ content: "", photofile: null, photo: null });
    else alert("순서 추가는 최대 30개까지 가능합니다.");
  };
  @action
  onChangeStep = (e, idx) => {
    this.step[idx].content = e.target.value;
  };
  @action
  handelDelete_step = (idx) => {
    if (!(this.step.length === 1)) this.step.splice(idx, 1);
  };
  //순서바꾸기
  @action
  changeStep = (idx, move) => {
    let temp = this.step[idx];
    this.step[idx] = this.step[move];
    this.step[move] = temp;
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
          this.step[idx].photo = base64.toString(); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        this.step[idx].photofile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };
  @action
  handleRemove = (idx) => {
    this.step[idx].photo = null;
    this.step[idx].photofile = null;
  };

  //대표사진
  @action
  handleChangeRe = (e) => {
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
          this.recipe.repre_photo = base64.toString(); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        this.recipe.repre_photofile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };
  @action
  handleRemoveRe = () => {
    this.recipe.repre_photo = "";
    this.recipe.repre_photofile = null;
  };

  //완성 사진 추가
  @action
  handelAddDone = () => {
    this.done.push({ comp_photoList: null, imgBase64: "" });
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
        this.done[idx].comp_photoList = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
      this.handelAddDone();
    }
  };
  @action
  handleRemoveDone = (idx) => {
    this.done[idx].imgBase64 = "";
    this.done[idx].comp_photoList = null;
  };

  @action
  updateform = () => {
    let url = "http://localhost:9000/acorn/recipe/updateform?rec_num=" + 24;

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
        this.recipe = res.data;
        this.recipe.repre_photo = `http://localhost:9000/acorn/image/recipe/${this.recipe.repre_photo}`;

        //주재료 , 부재료 분류
        for (let i = 0; i < this.recipe.ingreList.length; i++) {
          if (this.recipe.ingreList[i].sort === "주재료") {
            this.main_ingre.push({
              ingre_name: this.recipe.ingreList[i].ingre_name,
              quantity: this.recipe.ingreList[i].quantity,
            });
          } else {
            this.sub_ingre.push({
              ingre_name: this.recipe.ingreList[i].ingre_name,
              quantity: this.recipe.ingreList[i].quantity,
            });
          }
        }
        this.step = this.recipe.orderList;
        for (let i = 0; i < this.step.length; i++) {
          console.log(this.step[i].photo);
          if (this.step[i].photo !== null) {
            this.step[
              i
            ].photo = `http://localhost:9000/acorn/image/recipe/${this.step[i].photo}`;
          }
        }
        //this.done=this.recipe.
      })
      .catch((err) => {
        console.log("수정폼오류:" + err);
      });
  };
}
