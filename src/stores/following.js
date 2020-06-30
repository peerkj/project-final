import { observable, action, computed } from "mobx";
import axios from 'axios';

export default class FollowingStore {
    @observable follow = [];

    // **** 추가됨
    constructor(root) {
        this.root = root;
    }

    @action
    followList = () => {

        let url = "http://localhost:9000/acorn/ranking/news";

        axios({
            method: "get",
            url: url,
            params: { email: this.root.info.userEmail },
        }).then((res) => {
            console.log(res.data);
            this.follow = res.data;
        }).catch((err) => {
            console.log("팔로리스트오류:" + err);
        })
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
            })
                .then((res) => {
                    this.followList();
                })
                .catch((err) => {
                    console.log("소식받기취소오류:" + err);
                });
        }
    };
}
