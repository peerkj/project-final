import { observable, action, computed } from "mobx";
import axios from "axios";

export default class DragStore {
  @observable count = 0;
  @observable pot = "img/pot/potgif.gif";
  @observable open = false;
  @observable pot_timer = null;
  @observable e_store = [];
  @observable addopen = false;
  @observable addFood = "";
  @observable mylist = [];
  @observable pot_food = [];
  @observable refir = "";
  @observable handle_style = "close"; // 냄비,버튼,...
  @observable refir_style = "refclose";
  @observable binpot = false;
  @observable error = "";

  constructor(root) {
    this.root = root;
  }

  @action
  handleKeyPress = (e) => {
    if (e.key === "Enter") this.handleSearchRecipe();
  };

  // @action
  // handleSearchRecipe=()={
  // };

  //모달 open
  @action
  r_open = () => {
    this.refir = "/img/refgif2.gif";
    setTimeout(() => {
      this.refir_style = "refopen";
      this.handle_style = "open";
    }, 2000);

  }
  //모달 close
  @action
  r_close = () => {
    this.refir = "";
    this.handle_style = "close";
    this.refir_style = "refclose";
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
    this.binpot = !this.binpot;
  };

  @action
  openPot = () => {
    this.stopPot();
    this.pot = "/img/pot/openpot.png";
    setTimeout(() => {
      this.pot = "img/pot/potgif.gif";
    }, 350);

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

  @computed
  get checkFood() {
    let check = true;
    for (let i = 0; i < this.mylist.length; i++) {
      if (this.addFood === this.mylist[i].refrig_name) {
        check = false;
        break;
      }
    }
    return check;
  }
  //재료 추가
  @action
  handleAddFood = () => {
    let url = "http://localhost:9000/acorn/refri/put";
    let put = new FormData();
    put.append("email", this.root.info.userEmail);
    put.append("refrig_name", this.addFood);
    //유효성검사
    if (this.available_addfood === "") {
      alert("재료를 입력해주세요");
    } else if (!this.available_addfood) {
      alert("한글 1-10자로 입력해주세요");
    } else if (!this.checkFood) {
      alert("이미 추가된 재료입니다");
    } else if (this.mylist.length > 9) {
      alert("최대 9개까지 추가 가능합니다");
    } else {
      axios({
        method: "post",
        url: url,
        data: put,
      })
        .then((res) => {
          this.handleListFood();
          this.handleAddOpen();
        })
        .catch((err) => {
          console.log("업로드오류:" + err);
        });
    }
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
  handleRecipe = () => {
    let url = "http://localhost:9000/acorn/refri/search";
    let food = new FormData();
    if (this.e_store.length === 0) {
      alert("재료를 선택하세요");
    } else {
      for (let i = 0; i < this.e_store.length; i++) {
        food.append("refrig_num", this.e_store[i].dragData.key);
      }
      axios({
        method: "post",
        url: url,
        data: food,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("요리하기오류:" + err);
        });
    }
  };
  @action
  handleRecipe = () => {
    let url = "http://localhost:9000/acorn/refri/search";
    let recipe = new FormData();
    if (this.mylist.length === 0) {
      alert("재료를 추가하세요");
    } else {
      for (let i = 0; i < this.mylist.length; i++) {
        recipe.append("refrig_num", this.mylist[i].refrig_num);
      }

      axios({
        method: "post",
        url: url,
        data: recipe,
      })
        .then((res) => {
          console.dir(res.data);
        })
        .catch((err) => {
          console.log("레시피불러오기오류:" + err);
        });
    }
  };
}
