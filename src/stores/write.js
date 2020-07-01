import { observable, action } from "mobx";
import axios from "axios";

export default class WriteStore {
  //주 재료
  @observable subject = ""; //레시피제목
  @observable summary = ""; //요리소개
  @observable foodcatevalue = ""; //카테고리셀렉트value
  @observable portionvalue = ""; //인원셀렉트value
  @observable timevalue = ""; //시간셀렉트value
  @observable difftvalue = ""; //난이도셀렉트value
  @observable tip = ""; //요리팁

  @observable main_ingre = [{ sort: "주재료", ingre_name: "", quantity: "" }];
  @observable sub_ingre = [{ sort: "부재료", ingre_name: "", quantity: "" }];
  @observable step = [{ content: "", photofile: null, imgBase64: "" }];
  @observable done = [{ comp_photoList: null, imgBase64: "" }];
  @observable represent = { repre_photofile: null, imgBase64: "" }; //대표사진

  constructor(root) {
    this.root = root;
  }

  //input
  @action
  handleSubjectChange = (e) => {
    this.subject = e.target.value;
  };

  @action
  handleSummaryChange = (e) => {
    this.summary = e.target.value;
  };

  @action
  handleFoodcateChange = (e) => {
    this.foodcatevalue = e.target.value;
  };

  @action
  handlePortionChange = (e) => {
    this.portionvalue = e.target.value;
  };

  @action
  handleTimeChange = (e) => {
    this.timevalue = e.target.value;
  };

  @action
  handleDiffChange = (e) => {
    this.difftvalue = e.target.value;
  };

  @action
  handleTipChange = (e) => {
    this.tip = e.target.value;
  };

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
    this.done.push({ comp_photoList: null, imgBase64: "" });
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

  //주 재료 추가
  @action
  handelAddMain = () => {
    if (this.main_ingre.length < 20)
      this.main_ingre.push({ sort: "주재료", ingre_name: "", quantity: "" });
    else alert("주재료 추가는 최대 20개까지 가능합니다.");
  };
  @action
  handelAddSub = () => {
    if (this.sub_ingre.length < 20)
      this.sub_ingre.push({ sort: "부재료", ingre_name: "", quantity: "" });
    else alert("부재료 추가는 최대 20개까지 가능합니다.");
  };
  @action
  handelAddStep = () => {
    if (this.step.length < 30)
      this.step.push({ content: "", photofile: null, imgBase64: "" });
    else alert("순서 추가는 최대 30개까지 가능합니다.");
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
  handelDelete_ingre = (idx) => {
    if (!(this.main_ingre.length === 1)) this.main_ingre.splice(idx, 1);
  };
  handelDelete_ingre_sub = (idx) => {
    if (!(this.sub_ingre.length === 1)) this.sub_ingre.splice(idx, 1);
  };

  @action
  onChangeStep = (e, idx) => {
    this.step[idx].content = e.target.value;
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
        this.step[idx].photofile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };

  @action
  handleRemove = (idx) => {
    this.step[idx].imgBase64 = "";
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
          this.represent.imgBase64 = base64.toString(); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        this.represent.repre_photofile = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };

  @action
  handleRemoveRe = () => {
    this.represent.imgBase64 = "";
    this.represent.repre_photofile = null;
  };

  //글쓰기
  @action
  insertRecipe = (history) => {
    let url = "http://13.124.83.195:8080/acorn/recipe/regist";
    let submit = new FormData();
    submit.append("repre_photofile", this.represent.repre_photofile); //대표사진(썸네일)
    submit.append("subject", this.subject);
    submit.append("summary", this.summary);
    submit.append("food_cate", this.foodcatevalue);
    submit.append("portion", this.portionvalue);
    submit.append("time", this.timevalue);
    submit.append("difficult", this.difftvalue);
    submit.append("tip", this.tip);
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
      submit.append("ingreList[" + i + "].sort", this.main_ingre[i].sort); //주재료인지 부재료인지
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

      submit.append("ingreList[" + i + "].sort", this.sub_ingre[j].sort); //주재료인지 부재료인지
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
    }
    //완성사진
    let p = this.done.length;
    if (p > 1) p--;
    for (let i = 0; i < p; i++) {
      if (this.done[i].comp_photoList === null) {
        check_done = true;
        break;
      }

      submit.append("comp_photoList[" + i + "]", this.done[i].comp_photoList);
    }

    if (this.represent.repre_photofile === null) {
      alert("대표사진을 등록해주세요");
    } else if (this.subject === "") {
      alert("제목을 입력해주세요");
    } else if (this.summary === "") {
      alert("내용을 입력해주세요");
    } else if (this.foodcatevalue === "") {
      alert("카테고리를 선택해주세요");
    } else if (
      this.portionvalue === "" ||
      this.timevalue === "" ||
      this.difftvalue === ""
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
    } else if (this.tip === "") {
      alert("요리 Tip을 입력해주세요");
    } else {
      console.log("글쓰기 시작!?");
      axios({
        method: "post",
        url: url,
        data: submit,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log("글쓰기 성공!?");
          history.push(`/recipe/detail?recipe=${res.data}`);
        })
        .catch((err) => {
          console.log("레시피 업로드 오류:" + err);
        });
    }
  };

  //유효성
  @action
  handleReset = () => {
    this.subject = "";
    this.summary = "";
    this.foodcatevalue = "";
    this.portionvalue = "";
    this.timevalue = "";
    this.difftvalue = "";
    this.tip = "";

    this.main_ingre = [{ sort: "주재료", ingre_name: "", quantity: "" }];
    this.sub_ingre = [{ sort: "부재료", ingre_name: "", quantity: "" }];
    this.step = [{ content: "", photofile: null, imgBase64: "" }];
    this.done = [{ comp_photoList: null, imgBase64: "" }];
    this.represent = { repre_photofile: null, imgBase64: "" };
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
}
