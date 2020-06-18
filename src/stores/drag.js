import { observable, action, computed } from "mobx";
import axios from "axios";

export default class DragStore {
  @observable count = 0;
  @observable pot_ = [
    "/img/pot/pot1.png",
    "/img/pot/pot2.png",
    "/img/pot/pot3.png",
  ];
  @observable pot = "/img/pot/pot1.png";
  @observable open = false;
  @observable pot_timer = null;
  @observable e_store = [];
  @observable addopen = false;
  @observable addFood = "";
  @observable mylist = [];
  @observable pot_food = [];

  constructor(root) {
    this.root = root;
  }

  @action
  addPotFood = (idx) => {
    this.pot_food.push(this.mylist[idx].food);
  };

  @action
  e_add = (e) => {
    this.e_store.push(e);
  };
  @action
  select_delete = (e) => {
    for (let i = 0; i < this.e_store.length; i++) {
      if (e === this.e_store[i]) {
        this.e_store.splice(i, 1);
        this.count--;
        break;
      }
    }
    e.containerElem.style.visibility = "visible";
  };
  //비우기
  @action
  deleteList = () => {
    for (let i = 0; i < this.e_store.length; i++) {
      this.e_store[i].containerElem.style.visibility = "visible";
    }
    this.pot_food = [];
    this.e_store = [];
    this.count = 0;
  };

  @action
  clickPot = () => {
    this.open = !this.open;
  };

  @action
  openPot = () => {
    this.stopPot();
    this.pot = "/img/pot/openpot.png";
    setTimeout(() => {
      this.pot = this.pot_[2];
    }, 350);
    this.changePot();
  };

  @action
  changePot = () => {
    let i = 1;
    this.pot_timer = setInterval(() => {
      this.pot = this.pot_[i];
      i++;
      if (i === 3) i = 0;
    }, 500);
  };

  @action
  stopPot = () => {
    clearInterval(this.pot_timer);
  };

  @action
  addCount = () => {
    this.count++;
  };
  @action
  resetCount = () => {
    this.count = 0;
  };

  //재료 추가
  @action
  handleAddFood = () => {
    let url = "http://localhost:9000/acorn/refri/put";
    let put = new FormData();
    put.append("email", this.root.info.userEmail);
    put.append("refrig_name", this.addFood);
    //유효성검사
    if (this.available_addfood === "") {
      this.error = "재료를 입력해주세요";
    } else if (!this.available_addfood) {
      this.error = "한글 1-10자로 입력해주세요";
    } else {
      axios({
        method: "post",
        url: url,
        data: put,
      })
        .then((res) => {
          this.handleListFood();
        })
        .catch((err) => {
          console.log("업로드오류:" + err);
        });
    }

    this.handleAddOpen();
  };

  //리스트
  @action
  handleListFood = () => {
    let url =
      "http://localhost:9000/acorn/refri/list?email=" +
      this.root.info.userEmail;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        this.mylist = res.data;
      })
      .catch((err) => {
        console.log("업로드오류:" + err);
      });
  };

  @action
  handleAddOpen = () => {
    this.addFood = "";
    this.addopen = !this.addopen;
  };
  @computed
  get available_addfood() {
    var regExp = /^[가-힣]{1,10}$/;
    return regExp.test(this.addFood);
  }
  @action
  onChangeFood = (e) => {
    this.addFood = e.target.value;
  };
  @action
  handleEnter = (e) => {
    if (e.key === "Enter") this.handleAddFood();
  };
  //재료삭제
  @action
  refri_delete = (num) => {
    let url = "http://localhost:9000/acorn/refri/delete?refrig_num=" + num;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        this.handleListFood();
      })
      .catch((err) => {
        console.log("재료삭제오류:" + err);
      });
  };

  @action
  handleCook = () => {
    let url = "http://localhost:9000/acorn/refri/search";
  };
}
