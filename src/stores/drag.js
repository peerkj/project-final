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
  @observable sw = 0;

  //추천레시피 리스트
  @observable open_recipe = false;
  @observable recipe_list = [
    {
      nickname: "",
      rec_num: "",
      repre_photo: "",
      subject: "",
      timeDiffer: "",
      ingreList: [{ sort: "", ingre_name: "", quantity: "" }, {}],
    },
    {},
  ];
  @observable recipe_index = 0;
  @observable ing_list = [[{ sort: "", ingre_name: "", quantity: "" }], []];
  @observable main_ing = [[{ check: "", ingre_name: "", quantity: "" }], []];
  @observable sub_ing = [[{ check: "", ingre_name: "", quantity: "" }], []];
  constructor(root) {
    this.root = root;
  }

  @action
  openRecipe = () => {
    this.open_recipe = !this.open_recipe;
  };

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
  };
  //모달 close
  @action
  r_close = () => {
    this.refir = "";
    this.handle_style = "close";
    this.refir_style = "refclose";
  };
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
    //pout 비우기
    this.e_store = [];
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
    let url = "http://3.128.62.155:8080/Team5Spring/refri/put";
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
      alert("최대 9개까지 추가가 가능합니다");
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
      "http://3.128.62.155:8080/Team5Spring/refri/list?email=" +
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
    let url = "http://3.128.62.155:8080/Team5Spring/refri/delete?refrig_num=" + num;
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
    this.sw = 1;
    let url = "http://3.128.62.155:8080/Team5Spring/refri/search";
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
          if (res.data.length !== 0) {
            this.openRecipe();
            this.recipe_list = res.data;
            for (let i = 0; i < this.recipe_list.length; i++) {
              this.ing_list[i] = res.data[i].ingreList;
            }
            this.sortIng();
          } else {
            alert("입력하신 재료로 추천할 수 있는 레시피가 없습니다");
          }
        })
        .catch((err) => {
          console.log("요리하기오류:" + err);
        });
    }
  };
  @action
  handleRecipe = () => {
    this.sw = 0;
    let url = "http://3.128.62.155:8080/Team5Spring/refri/search";
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
          if (res.data.length !== 0) {
            this.openRecipe();
            this.recipe_list = res.data;
            for (let i = 0; i < this.recipe_list.length; i++) {
              this.ing_list[i] = res.data[i].ingreList;
            }
            this.sortIng();
          } else {
            alert("입력하신 재료로 추천할 수 있는 레시피가 없습니다");
          }
        })
        .catch((err) => {
          console.log("레시피불러오기오류:" + err);
        });
    }
  };

  // >버튼
  @action
  stepR = () => {
    if (this.recipe_index === this.recipe_list.length - 1)
      this.recipe_index = 0;
    else this.recipe_index++;
  };

  // <버튼
  @action
  stepL = () => {
    if (this.recipe_index === 0)
      this.recipe_index = this.recipe_list.length - 1;
    else this.recipe_index--;
  };

  @action
  sortIng = () => {
    //sw 0
    this.main_ing = [[], [], [], [], []];
    this.sub_ing = [[], [], [], [], []];
    this.recipe_index = 0;

    if (this.sw === 0) {
      for (let i = 0; i < this.ing_list.length; i++) {
        for (let j = 0; j < this.ing_list[i].length; j++) {
          if (this.ing_list[i][j].sort === "주재료") {
            for (let k = 0; k < this.mylist.length; k++) {
              if (
                this.ing_list[i][j].ingre_name === this.mylist[k].refrig_name
              ) {
                this.main_ing[i].push({
                  check: 1,
                  ingre_name: this.ing_list[i][j].ingre_name,

                  quantity: this.ing_list[i][j].quantity,
                });
                break;
              } else {
                if (k === this.mylist.length - 1) {
                  this.main_ing[i].push({
                    check: 0,
                    ingre_name: this.ing_list[i][j].ingre_name,
                    quantity: this.ing_list[i][j].quantity,
                  });
                }
              }
            }
          }
        }
      }
      for (let i = 0; i < this.ing_list.length; i++) {
        for (let j = 0; j < this.ing_list[i].length; j++) {
          if (this.ing_list[i][j].sort === "부재료") {
            for (let k = 0; k < this.mylist.length; k++) {
              if (
                this.ing_list[i][j].ingre_name === this.mylist[k].refrig_name
              ) {
                this.sub_ing[i].push({
                  check: 1,
                  ingre_name: this.ing_list[i][j].ingre_name,

                  quantity: this.ing_list[i][j].quantity,
                });
                break;
              } else {
                if (k === this.mylist.length - 1) {
                  this.sub_ing[i].push({
                    check: 0,
                    ingre_name: this.ing_list[i][j].ingre_name,
                    quantity: this.ing_list[i][j].quantity,
                  });
                }
              }
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.ing_list.length; i++) {
        for (let j = 0; j < this.ing_list[i].length; j++) {
          if (this.ing_list[i][j].sort === "주재료") {
            for (let k = 0; k < this.e_store.length; k++) {
              if (
                this.ing_list[i][j].ingre_name === this.e_store[k].dragData.food
              ) {
                this.main_ing[i].push({
                  check: 1,
                  ingre_name: this.ing_list[i][j].ingre_name,

                  quantity: this.ing_list[i][j].quantity,
                });
                break;
              } else {
                if (k === this.e_store.length - 1) {
                  this.main_ing[i].push({
                    check: 0,
                    ingre_name: this.ing_list[i][j].ingre_name,
                    quantity: this.ing_list[i][j].quantity,
                  });
                }
              }
            }
          }
        }
      }
      for (let i = 0; i < this.ing_list.length; i++) {
        for (let j = 0; j < this.ing_list[i].length; j++) {
          if (this.ing_list[i][j].sort === "부재료") {
            for (let k = 0; k < this.e_store.length; k++) {
              if (
                this.ing_list[i][j].ingre_name === this.e_store[k].dragData.food
              ) {
                this.sub_ing[i].push({
                  check: 1,
                  ingre_name: this.ing_list[i][j].ingre_name,

                  quantity: this.ing_list[i][j].quantity,
                });
                break;
              } else {
                if (k === this.e_store.length - 1) {
                  this.sub_ing[i].push({
                    check: 0,
                    ingre_name: this.ing_list[i][j].ingre_name,
                    quantity: this.ing_list[i][j].quantity,
                  });
                }
              }
            }
          }
        }
      }
    }
  };
}
