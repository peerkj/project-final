import React, { Component } from "react";

import "../css/join.css";
import { inject, observer } from "mobx-react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Close, StorefrontSharp } from "@material-ui/icons";

@inject((stores) => ({
  //input list -7
  email: stores.withdraw.email,
  name: stores.withdraw.name,
  ori_nickname: stores.info.nickname,
  nickname: stores.withdraw.nickname,
  hp: stores.withdraw.hp,
  imgBase64: stores.withdraw.imgBase64,
  error: stores.withdraw.error,
  checkImg: stores.withdraw.checkImg,

  //input change event -7
  handleChangeImg: stores.withdraw.handleChangeImg,
  handleEmailChange: stores.withdraw.handleEmailChange,
  handleNameChange: stores.withdraw.handleNameChange,
  handleNicknameChange: stores.withdraw.handleNicknameChange,
  handleHpChange: stores.withdraw.handleHpChange,

  //이미지 제거
  handleRemove: stores.withdraw.handleRemove,
  //유효성 검사

  available_name: stores.withdraw.available_name,
  available_nickname: stores.withdraw.available_nickname,
  available_hp: stores.withdraw.available_hp,

  //이메일 중복체크

  checkNickname: stores.withdraw.checkNickname,
  nickname_check: stores.withdraw.nickname_check,
  //submit
  handleSubmit: stores.withdraw.handleSubmit,
  reloadimg: stores.withdraw.reloadimg,
  login_state: stores.info.login_state,
  pass_check: stores.chefupdate.pass_check,
}))
@observer
class chefupdate extends Component {
  componentWillMount = () => {
    if (!this.props.login_state || !this.props.pass_check) {
      this.props.history.push("/login");
    }
    this.props.reloadimg();
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.props.history);
  };

  render() {
    const {
      email,
      name,
      nickname,
      hp,
      error,
      //유효성
      ori_nickname,
      available_name,
      available_nickname,
      imgBase64,
      available_hp,
      //중복체크

      checkNickname,
      nickname_check,
      //change
      handleChangeImg,

      handleNameChange,
      handleNicknameChange,
      handleHpChange,
      handleRemove,
      //submit
      handleSubmit,
    } = this.props;

    const useStyles = makeStyles((theme) => ({
      container: {
        display: "flex",
        flexWrap: "wrap",
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));

    return (
      <div>
        <div id="joinbody">
          <center>
            <div
              style={{
                width: "150px",
                height: "150px",
              }}
            >
              <center>
                <label htmlFor="contained-button-file">
                  {imgBase64 ? (
                    <img className="profileImg" src={imgBase64} alt="" />
                  ) : (
                    <img
                      className="profileImg"
                      src="img/basic_user.png"
                      alt=""
                    />
                  )}
                </label>
              </center>

              {imgBase64 ? (
                <Close onClick={handleRemove} id="profileImg_delete" />
              ) : (
                <label htmlFor="contained-button-file">
                  <Add id="profileImg_add" />
                </label>
              )}
            </div>
            <br />
            <input
              style={{ display: "none" }}
              accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChangeImg}
            />
            <div id="divjoin">
              <span class="all_title">E-mail</span>
              <br />
              <TextField
                aria-readonly
                id="standard-basic"
                defaultValue={email}
              />
              <br />
              <br />
              <span class="all_title">이름</span>
              <br />
              <TextField
                id="standard-basic"
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
                id="standard-basic"
                value={nickname}
                onChange={handleNicknameChange}
                error={
                  nickname === "" || nickname === ori_nickname
                    ? false
                    : (available_nickname === false) === true
                    ? true
                    : available_nickname === true && checkNickname === false
                    ? true
                    : false
                }
                helperText={
                  nickname === ""
                    ? ""
                    : !available_nickname
                    ? "한글 2~8자"
                    : available_nickname === true && checkNickname === false
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
              <br />
              <br />
            </div>
            <span
              style={{
                fontWeight: "300",
                color: "red",
                fontSize: "medium",
              }}
            >
              {error}
            </span>
            <br />
            <br />
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              component="span"
              style={{ backgroundColor: "#002060", color: "#ffffff" }}
            >
              정보수정
            </Button>
          </center>
        </div>
      </div>
    );
  }
}

export default chefupdate;
