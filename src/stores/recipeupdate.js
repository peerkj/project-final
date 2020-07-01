import { observable, action, computed } from "mobx";
import axios from "axios";

export default class RecipeupdateStore {
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
  @observable delete_done = [];
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  resetuUpdate = () => {
    this.recipe = {
      food_cate: "구이",
      portion: "1인분",
      time: "15분 이내",
      difficult: "아무나",
    };

    this.main_ingre = [];
    this.sub_ingre = [];
    this.step = [];

    this.done = [];
    this.delete_done = [];
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

  //완성 사진 추가
  @action
  handelAddDone = () => {
    this.done.push({ comp_photoList: null, comp_photo: "" });
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
    if (!(idx === this.done.length - 1)) {
      if (this.done[idx].comp_photoList === null) {
        this.delete_done.push(this.done[idx].comp_photo);
      }
      this.done.splice(idx, 1);
    }
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
          this.done[idx].comp_photo = base64.toString(); // 파일 base64 상태 업데이트
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
  updateform = (num, history) => {

    this.resetuUpdate();
    let url = "http://3.128.62.155:8080/Team5Spring/recipe/updateform?rec_num=" + num;

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        this.recipe = res.data;
        this.recipe.repre_photo = `http://3.128.62.155:8080/Team5Spring/image/recipe/${this.recipe.repre_photo}`;

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
          if (this.step[i].photo !== null && this.step[i].photo !== "null") {
            this.step[
              i
            ].photo = `http://3.128.62.155:8080/Team5Spring/image/recipe/${this.step[i].photo}`;
          } else {
            this.step[i].photo = null;
          }
        }
        let done_list = this.recipe.comp_photo.split(",");
        for (let i = 0; i < done_list.length; i++) {
          this.done.push({
            comp_photoList: null,
            comp_photo: done_list[i],
          });
        }
        this.handelAddDone();
        history.push("/update");
      })

      .catch((err) => {
        console.log("수정폼오류:" + err);
      });
  };

  @action
  checkIngre = () => {
    const ingre = [...this.main_ingre, ...this.sub_ingre];
    let check = false;
    for (let i = 0; i < ingre.length - 1; i++) {
      for (let j = i + 1; j < ingre.length; j++) {
        if (ingre[i].ingre_name === ingre[j].ingre_name) {
          check = true;
          break;
        }
      }
    }

    return check;
  };
  //글쓰기
  @action
  insertRecipe = (history) => {
    let url = "http://3.128.62.155:8080/Team5Spring/recipe/update";
    let submit = new FormData();
    submit.append("rec_num", this.recipe.rec_num);
    submit.append("repre_photofile", this.recipe.repre_photofile); //대표사진(썸네일)
    submit.append("subject", this.recipe.subject);
    submit.append("summary", this.recipe.summary);
    submit.append("food_cate", this.recipe.food_cate);
    submit.append("portion", this.recipe.portion);
    submit.append("time", this.recipe.time);
    submit.append("difficult", this.recipe.difficult);
    submit.append("tip", this.recipe.tip);
    submit.append("email", this.root.info.userEmail);

    let check_main = false; //주재료
    let check_sub = false; //부재료
    let check_step = false; //요리순서
    let check_done = false; //완성사진
    //주재료
    for (let i = 0; i < this.main_ingre.length; i++) {
      if (
        this.main_ingre[i].ingre_name === "" ||
        this.main_ingre[i].quantity === ""
      ) {
        check_main = true;
        break;
      }
      submit.append("ingreList[" + i + "].sort", "주재료"); //주재료인지 부재료인지
      submit.append(
        "ingreList[" + i + "].ingre_name",
        this.main_ingre[i].ingre_name
      ); //재료명
      submit.append(
        "ingreList[" + i + "].quantity",
        this.main_ingre[i].quantity
      ); //용량
    }
    //부재료
    let j = 0;
    for (
      let i = this.main_ingre.length;
      i < this.main_ingre.length + this.sub_ingre.length;
      i++
    ) {
      if (
        this.sub_ingre[j].ingre_name === "" ||
        this.sub_ingre[j].quantity === ""
      ) {
        check_sub = true;
        break;
      }

      submit.append("ingreList[" + i + "].sort", "부재료"); //주재료인지 부재료인지
      submit.append(
        "ingreList[" + i + "].ingre_name",
        this.sub_ingre[j].ingre_name
      ); //재료명
      submit.append(
        "ingreList[" + i + "].quantity",
        this.sub_ingre[j].quantity
      ); //용량
      j++;
    }

    //순서
    for (let i = 0; i < this.step.length; i++) {
      if (this.step[i].content === "") {
        check_step = true;
        break;
      }

      submit.append("orderList[" + i + "].order_num", i + 1); //순서
      submit.append("orderList[" + i + "].content", this.step[i].content); //설명
      submit.append("orderList[" + i + "].photofile", this.step[i].photofile); //사진
      if (this.step[i].photofile === null && this.step[i].photo !== null) {
        submit.append(
          "orderList[" + i + "].photo",
          this.step[i].photo.split("/").reverse()[0]
        ); //파일명
      }
    }
    //완성사진
    let p = this.done.length;
    if (p > 1) p--;
    let k = 0;
    for (let i = 0; i < p; i++) {
      if (
        this.done[i].comp_photoList === null &&
        this.done[i].comp_photo === null
      ) {
        check_done = true;
        break;
      }
      if (this.done[i].comp_photoList !== null) {
        submit.append("comp_photoList[" + k + "]", this.done[i].comp_photoList);
        k++;
      }
    }

    if (this.delete_done.length > 0) {
      for (let i = 0; i < this.delete_done.length; i++) {
        submit.append("delcomp", this.delete_done[i]);
      }
    }

    if (this.recipe.repre_photo === null) {
      alert("대표사진을 등록해주세요");
    } else if (this.recipe.subject === "") {
      alert("제목을 입력해주세요");
    } else if (this.recipe.summary === "") {
      alert("내용을 입력해주세요");
    } else if (this.recipe.foodcatevalue === "") {
      alert("카테고리를 선택해주세요");
    } else if (
      this.recipe.portionvalue === "" ||
      this.recipe.timevalue === "" ||
      this.recipe.difftvalue === ""
    ) {
      alert("요리정보를 선택해주세요");
    } else if (check_main) {
      alert("주재료 정보를 입력해주세요");
    } else if (check_sub) {
      alert("부재료 정보를 입력해주세요");
    } else if (this.checkIngre()) {
      alert("중복된 재료가 있습니다");
    } else if (check_step) {
      alert("요리순서 정보를 입력해주세요");
    } else if (check_done) {
      alert("완성사진을 한 개 이상 등록해주세요");
    } else if (this.recipe.tip === "") {
      alert("요리 Tip을 입력해주세요");
    } else {
      axios({
        method: "post",
        url: url,
        data: submit,
      })
        .then((res) => {
          history.replace(`/recipe/detail?recipe=${this.recipe.rec_num}`);
        })
        .catch((err) => {
          console.log("레시피 업로드 오류:" + err);
        });
    }
  };
}
