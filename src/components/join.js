import React, { Component } from "react";

import "../css/join.css";
import { inject, observer } from "mobx-react";
import { TextField, Button, Icon, makeStyles } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

@inject((stores) => ({
  //input list -7
  email: stores.join.email,
  password: stores.join.password,
  password_re: stores.join.password_re,
  name: stores.join.name,
  nickname: stores.join.nickname,
  hp: stores.join.hp,
  login_state: stores.info.login_state,

  handelReset: stores.join.handelReset,
  imgBase64: stores.join.imgBase64,
  error: stores.join.error,
  //input change event -7
  handleChangeImg: stores.join.handleChangeImg,
  handleEmailChange: stores.join.handleEmailChange,
  handlePassChange: stores.join.handlePassChange,
  handlePassCheckChange: stores.join.handlePassCheckChange,
  handleNameChange: stores.join.handleNameChange,
  handleNicknameChange: stores.join.handleNicknameChange,
  handleHpChange: stores.join.handleHpChange,

  //이미지 제거
  handleRemove: stores.join.handleRemove,
  //유효성 검사
  available_email: stores.join.available_email,
  available_password: stores.join.available_password,
  available_pass_re: stores.join.available_pass_re,
  available_name: stores.join.available_name,
  available_nickname: stores.join.available_nickname,
  available_hp: stores.join.available_hp,

  //이메일 중복체크
  checkEmail: stores.join.checkEmail,
  checkNickname: stores.join.checkNickname,
  //submit
  handleSubmit: stores.join.handleSubmit,
}))
@observer
class join extends Component {
  componentWillMount = () => {
    this.props.handelReset();
    if (this.props.login_state) {
      this.props.history.replace("/");
    }
  };

  render() {
    const {
      email,
      password,
      password_re,
      error,
      name,
      nickname,
      hp,
      //유효성
      available_email,
      available_password,
      available_pass_re,
      available_name,
      available_nickname,
      available_hp,
      imgBase64,
      //중복체크
      checkEmail,
      checkNickname,
      //change
      handleChangeImg,
      handleEmailChange,
      handlePassChange,
      handlePassCheckChange,
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
      },
      button: {
        margin: theme.spacing(1),
      },
    }));

    return (
      <div>
        <div id="joinbody">
          <center>
            <div className="chefupdateCenterWrapper">
              <div className="chefupdateCenter">
                <div className="centered">
                  <label htmlFor="contained-button-file">
                    {imgBase64 ? (
                      <img className="profileImg" src={imgBase64} alt="" />
                    ) : (
                        <img
                          className="profileImg"
                          src="/img/basic_user.png"
                          alt=""
                        />
                      )}
                  </label>
                </div>
              </div>
            </div>

            {imgBase64 ? (
              <Close onClick={handleRemove} id="profileImg_delete" />
            ) : (
                <label htmlFor="contained-button-file">
                  <Add id="profileImg_add" />
                </label>
              )}
            <input
              style={{ display: "none" }}
              accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChangeImg}
            />
            <br />
            <div id="divjoin">
              <span class="all_titles">E-mail</span>
              <br />
              <TextField
                error={
                  email === ""
                    ? false
                    : (available_email === false) === true
                      ? true
                      : available_email === true && checkEmail === false
                        ? true
                        : false
                }
                helperText={
                  email === ""
                    ? ""
                    : !available_email
                      ? "이메일 형식이 유효하지 않습니다"
                      : available_email === true && checkEmail === false
                        ? "이미 가입된 이메일입니다"
                        : "사용가능"
                }
                id="standard-basic"
                name="email"
                onChange={handleEmailChange}
                value={email}
              />
              <br />
              <br />
              <span class="all_titles">비밀번호</span>
              <br />
              <TextField
                id="standard-password-input"
                name="password"
                value={password}
                onChange={handlePassChange}
                type="password"
                autoComplete="current-password"
                error={!(password === "") ^ available_password}
                helperText={
                  available_password || password === ""
                    ? ""
                    : "8~10자 영문,숫자 조합"
                }
              />
              <br />
              <br />
              <span class="all_titles">비밀번호 확인</span>
              <br />
              <TextField
                onChange={handlePassCheckChange}
                id="standard-password-input"
                type="password"
                name="password_re"
                value={password_re}
                autoComplete="current-password"
                error={
                  password_re === "" ? false : !available_pass_re ? true : false
                }
                helperText={
                  available_pass_re || password_re === ""
                    ? ""
                    : "비밀번호가 일치하지 않습니다"
                }
              />
              <br />
              <br />
              <span class="all_titles">이름</span>
              <br />
              <TextField
                id="standard-basic"
                value={name}
                onChange={handleNameChange}
                error={!(name === "") ^ available_name}
                helperText={
                  available_name || name === ""
                    ? ""
                    : "한글 2~5자/영문 2~15자/혼용 불가능"
                }
              />
              <br />
              <br />
              <span class="all_titles">닉네임</span>
              <br />
              <TextField
                id="standard-basic"
                value={nickname}
                onChange={handleNicknameChange}
                error={
                  nickname === ""
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
              <span class="all_titles">전화 번호</span>
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
              onClick={handleSubmit}
              variant="outlined"
              color="black"
              component="span"
              className={useStyles.button}
              id="joinbtn"
              endIcon={<Icon>send</Icon>}
            >
              가입하기
            </Button>
          </center>
          <br /><br />
        </div>
      </div>
    );
  }
}

export default join;
