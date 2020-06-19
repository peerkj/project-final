import { observable, action, computed } from "mobx";
import axios from "axios";

export default class WriteStore {

    //주 재료   
    @observable subject = "";  //레시피제목
    @observable summary = ""; //요리소개
    @observable foodcatevalue = ""; //카테고리셀렉트value
    @observable portionvalue = ""; //인원셀렉트value
    @observable timevalue = ""; //시간셀렉트value
    @observable difftvalue = ""; //난이도셀렉트value
    @observable tip = ""; //요리팁


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
    }

    @action
    handleFoodcateChange = (e) => {
        this.foodcatevalue = e.target.value;
    }

    @action
    handlePortionChange = (e) => {
        this.portionvalue = e.target.value;
    }

    @action
    handleTimeChange = (e) => {
        this.timevalue = e.target.value;
    }

    @action
    handleDiffChange = (e) => {
        this.difftvalue = e.target.value;
    }

    @action
    handleTipChange = (e) => {
        this.tip = e.target.value;
    }

    @action
    click = () => {
        console.log(this.subject, this.summary, this.foodcatevalue, this.portionvalue, this.timevalue, this.difftvalue);
    }

    @computed
    get insertRecipe() {
        let url = "http://localhost:9000/acorn/recipe/regist";
        let submit = new FormData();
        //submit.append("repre_photofile",);  //대표사진(썸네일)
        submit.append("subject", this.subject);
        submit.append("summary", this.summary);
        submit.append("food_cate", this.foodcatevalue);
        submit.append("portion", this.portionvalue);
        submit.append("time", this.timevalue);
        submit.append("difficult", this.difftvalue);
        submit.append("tip", this.tip);

        // //재료
        // for (let i = 0; i < ; i++) {
        //     submit.append("ingreList[" + i + "].sort",);    //주재료인지 부재료인지
        //     submit.append("ingreList[" + i + "].ingre_name",);  //재료명
        //     submit.append("ingreList[" + i + "].quantity",);    //용량
        // }
        // //순서
        // for (let i = 0; i < ; i++) {
        //     submit.append("orderList[" + i + "].order_num", i + 1); //순서
        //     submit.append("orderList[" + i + "].content",);    //설명
        //     submit.append("orderList[" + i + "].photofile",);  //사진
        // }
        // //완성사진
        // for (let i = 0; i < ; i++) {
        //     submit.append("comp_photoList[" + i + "]",);
        // }
        axios({
            method: "post",
            url: url,
            data: submit
        })
            .then((res) => {

            })
            .catch((err) => {
                console.log("레시피 업로드 오류:" + err);
            })
    }

}

