import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { TextField, Button } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

import "../css/join.css";

@inject((stores) => ({
  email: stores.cu.email,
  name: stores.cu.name,
  nickname: stores.cu.nickname,
  ori_nickname: stores.info.nickname,
  hp: stores.cu.hp,

  handleNameChange: stores.cu.handleNameChange,
  handleNicknameChange: stores.cu.handleNicknameChange,
  handleHpChange: stores.cu.handleHpChange,

  available_name: stores.cu.available_name,
  available_nickname: stores.cu.available_nickname,
  available_hp: stores.cu.available_hp,

  checkNickname: stores.cu.checkNickname,
  nickname_check: stores.cu.nickname_check,
}))
@observer
class chefupdate extends Component {
  componentWillMount = () => {
    this.props.checkNickname();
  };
  render() {
    const {
      email,
      name,
      nickname,
      ori_nickname,
      hp,

      handleNameChange,
      handleNicknameChange,
      handleHpChange,

      available_name,
      available_nickname,
      available_hp,

      nickname_check,
      checkNickname,
    } = this.props;
    return (
      <div>
        <TextField aria-readonly id="update-email" defaultValue={email} />
        <br />
        <br />
        <span class="all_title">이름</span>
        <br />
        <TextField
          id="update-name"
          value={name}
          onChange={handleNameChange}
          error={!(name === "") ^ available_name}
          helperText={available_name || name === "" ? "" : "한글 2~5자"}
        />
        <br />
        <br />
        <span class="all_title">닉네임</span>
        <br />
        <TextField
          id="update-nick"
          value={nickname}
          onChange={handleNicknameChange}
          error={
            nickname === "" || nickname === ori_nickname
              ? false
              : (available_nickname === false) === true
              ? true
              : available_nickname === true && nickname_check === false
              ? true
              : false
          }
          helperText={
            nickname === ""
              ? ""
              : !available_nickname
              ? "한글 2~8자"
              : available_nickname === true && nickname_check === false
              ? "이미 사용중인 닉네임입니다"
              : "사용 가능"
          }
        />
        <br />
        <br />
        <span class="all_title">전화 번호</span>
        <br />
        <TextField
          id="standard-basic"
          value={hp}
          onChange={handleHpChange}
          error={!(hp === "010") ^ available_hp}
          helperText={!available_hp && "하이픈(-) 없이 입력"}
        />
      </div>
    );
  }
}

export default chefupdate;
