import { observable, action, computed } from "mobx";
import axios from 'axios';

export default class RankingStore {
    @observable chef = [];
    //소식받기
    @observable check_n = [];
    // **** 추가됨
    constructor(root) {
        this.root = root;
    }

    @action
    rankingList = () => {
        let url = "http://localhost:9000/acorn/ranking/sorting";

        axios({
            method: "get",
            url: url,
        }).then((res) => {
            this.chef = res.data
            console.log(res.data);
            for (let i = 0; i < this.chef.length; i++) {
                this.checkNews(this.chef[i].email, i);
            }
        }).catch((err) => {
            console.log("랭킹리스트오류:" + err);
        })
    };

    @action
    updateCheck = (email, i) => {
        this.checkNews(email, i);
    }

    //소식받기체크
    @action
    checkNews = (email, i) => {
        let url = "http://localhost:9000/acorn/connect/newscheck";

        axios({
            method: "get",
            url: url,
            params: { provider: email, receiver: this.root.info.userEmail },
        }).then((res) => {
            this.check_n[i] = res.data;
            console.log(this.check_n[i]);
        }).catch((err) => {
            console.log("소식받기체크오류:" + err);
        })
    }

    //소식받기
    @action
    onNews = (email, i) => {
        let url = "http://localhost:9000/acorn/connect/onnews";

        if (this.root.info.login_state) {
            axios({
                method: "get",
                url: url,
                params: { provider: email, receiver: this.root.info.userEmail },
            }).then((res) => {
                this.updateCheck(email, i);
            }).catch((err) => {
                console.log("소식받기오류:" + err);
            })
        }
    }

    //소식받기취소
    @action
    offNews = (email, i) => {
        let url = "http://localhost:9000/acorn/connect/offnews";

        if (this.root.info.login_state) {
            axios({
                method: "get",
                url: url,
                params: { provider: email, receiver: this.root.info.userEmail },
            }).then((res) => {
                this.updateCheck(email, i);
            }).catch((err) => {
                console.log("소식받기취소오류:" + err);
            })
        }
    }

}
