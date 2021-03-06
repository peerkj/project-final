import { observable, action } from "mobx";
import axios from "axios";

export default class CounterStore {
  @observable comment_list = [];

  //댓글쓰기
  @observable modal_open = false;
  @observable content = "";
  @observable commentp = null; //실제 서버로 보내는
  @observable imgBase64 = ""; //미리보기

  @observable com_num = 0;
  @observable regroup = 0;
  @observable restep = 0;
  @observable relevel = 0;

  @observable delete_open = false;

  @observable err = false;

  @action
  setValue = (com_num = 0, regroup = 0, restep = 0, relevel = 0) => {
    this.com_num = com_num;
    this.regroup = regroup;
    this.restep = restep;
    this.relevel = relevel;
  };

  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  modalReset = () => {
    this.comment_open = !this.comment_open;
    window.scrollTo(0, 0);
  };

  @action
  handleEnter = (e, history) => {
    if (e.key === "Enter") this.handleSubmit();
  };

  @action
  handleReset = () => {
    this.content = "";
    this.commentp = null;
    this.imgBase64 = "";
  };

  @action
  handleRemoveRe = () => {
    this.imgBase64 = "";
    this.commentp = null;
  };

  //리스트
  @action
  getList = (i) => {
    let url = "http://18.221.230.63:8080/acorn/comment/list";

    axios({
      method: "get",
      url: url,

      params: {
        rec_num: this.root.detail.rec_num,
      },
    })
      .then((res) => {
        this.comment_list = res.data;
        if (this.comment_list.length === 0) this.err = true;
        else this.err = false;
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  @action
  handleOpen = () => {
    this.modal_open = !this.modal_open;
    this.handleReset();
  };

  @action
  deleteOpen = (com_num) => {
    this.com_num = com_num;
    this.delete_open = !this.delete_open;
  };

  @action
  handleCommentChange = (e) => {
    this.content = e.target.value;
  };

  //댓글사진
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
        this.commentp = e.target.files[0]; // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      }
    }
  };

  @action
  handleSubmit = () => {
    let url = "http://18.221.230.63:8080/acorn/comment/regist";
    let submit = new FormData();
    submit.append("email", this.root.info.userEmail);
    submit.append("content", this.content);
    submit.append("imagefile", this.commentp);
    submit.append("rec_num", this.root.detail.rec_num);
    submit.append("com_num", this.com_num);
    submit.append("regroup", this.regroup);
    submit.append("restep", this.restep);
    submit.append("relevel", this.relevel);

    axios({
      method: "post",
      url: url,
      data: submit,
    })
      .then((res) => {
        this.modal_open = !this.modal_open;
        this.handleReset();
        this.getList();
        this.root.detail.getComment();
      })
      .catch((err) => {
        console.log("댓글등록오류:" + err);
      });
  };

  @action
  deleteComment = () => {
    let url = "http://18.221.230.63:8080/acorn/comment/delete";

    axios({
      method: "get",
      url: url,
      params: { com_num: this.com_num },
    })
      .then((res) => {
        this.getList();
        this.delete_open = !this.delete_open;
      })
      .catch((err) => {
        console.log("댓글삭제오류:" + err);
      });
  };
}
