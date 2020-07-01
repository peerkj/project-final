import { observable, action, computed } from "mobx";
import axios from "axios";
import React from "react";
export default class RankingStore {
  @observable chef = [];
  //소식받기
  @observable check_n = [-1];
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action
  rankingList = () => {
    let url = "http://13.124.83.195:8080/Team5Spring/ranking/sorting";

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        this.chef = res.data;
        this.setList();
      })
      .catch((err) => {
        console.log("랭킹리스트오류:" + err);
      });
  };
  @action
  fakeFetch = (delay = 1500) => new Promise((res) => setTimeout(res, delay));

  @action
  setList = async () => {
    for (let i = 0; i < this.chef.length; i++) {
      await this.checkNews(this.chef[i].email, i);
      await this.fakeFetch(300);
    }
  };

  //소식받기체크
  @action
  checkNews = (email, i) => {
    let url = "http://13.124.83.195:8080/Team5Spring/connect/newscheck";

    axios({
      method: "get",
      url: url,
      params: { provider: email, receiver: this.root.info.userEmail },
    })
      .then((res) => {
        this.check_n[i] = res.data;
      })
      .catch((err) => {
        console.log("소식받기체크오류:" + err);
      });
  };

  //소식받기
  @action
  onNews = (email, i) => {
    let url = "http://13.124.83.195:8080/Team5Spring/connect/onnews";

    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { provider: email, receiver: this.root.info.userEmail },
      })
        .then((res) => {
          this.rankingList();
          this.setList();
        })
        .catch((err) => {
          console.log("소식받기오류:" + err);
        });
    }
  };

  //소식받기취소
  @action
  offNews = (email, i) => {
    let url = "http://13.124.83.195:8080/Team5Spring/connect/offnews";

    if (this.root.info.login_state) {
      axios({
        method: "get",
        url: url,
        params: { provider: email, receiver: this.root.info.userEmail },
      })
        .then((res) => {
          this.rankingList();
          this.setList();
        })
        .catch((err) => {
          console.log("소식받기취소오류:" + err);
        });
    }
  };
}
