import { observable, action, computed, get } from "mobx";
import axios from "axios";

export default class DetailStore {

    @observable all = {};

    constructor(root) {
        this.root = root;
    }

    @action
    getRecipe = () => {
        let url = "http://localhost:9000/acorn/recipe/select?rec_num=1";
        axios({
            url: url,
            method: "get",
        }).then((res) => {
            this.all = res.data;
            console.log(res.data);

        }).catch((err) => {
            console.log("업로드오류:" + err);
        })
    }

}