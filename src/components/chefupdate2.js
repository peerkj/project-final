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
  imgBase64: stores.cu.imgBase64,
  error: stores.cu.error,

  handleNameChange: stores.cu.handleNameChange,
  handleNicknameChange: stores.cu.handleNicknameChange,
  handleHpChange: stores.cu.handleHpChange,
  handleChangeImg: stores.cu.handleChangeImg,

  handleRemove: stores.cu.handleRemove,

  handleSubmit: stores.cu.handleSubmit,

  available_name: stores.cu.available_name,
  available_nickname: stores.cu.available_nickname,
  available_hp: stores.cu.available_hp,

  checkNickname: stores.cu.checkNickname,
  nickname_check: stores.cu.nickname_check,

  reLoadState: stores.cu.reLoadState,
  reloadimg: stores.cu.reloadimg,
  login_state: stores.info.login_state,
  pass_check: stores.chefupdate.pass_check,
}))
@observer
class chefupdate extends Component {
  componentWillMount = () => {
    if (!this.props.login_state || !this.props.pass_check) {
      this.props.history.push("/login");
    }
    this.props.reLoadState();
    this.props.reloadimg();
    this.props.checkNickname();
  };
  render() {
    const {
      email,
      name,
      nickname,
      ori_nickname,
      hp,
      error,

      handleNameChange,
      handleNicknameChange,
      handleHpChange,

      available_name,
      available_nickname,
      available_hp,

      nickname_check,

      imgBase64,
      handleChangeImg,
      handleRemove,
      history,
      handleSubmit,
    } = this.props;
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
                        src="img/basic_user.png"
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
              <span class="all_titles">E-mail</span>
              <br />
              <TextField aria-readonly id="update-email" defaultValue={email} />
              <br />
              <br />
              <span class="all_titles">이름</span>
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
              <span class="all_titles">닉네임</span>
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
              <Button
                onClick={() => {
                  handleSubmit(history);
                }}
                variant="contained"
                component="span"
                style={{ backgroundColor: "#002060", color: "#ffffff" }}
              >
                수정하기
              </Button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default chefupdate;
