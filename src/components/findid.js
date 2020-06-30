import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { TextField, Button } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StorefrontSharp } from "@material-ui/icons";
@inject((stores) => ({
  //input list
  name: stores.findId.name,
  hp: stores.findId.hp,

  //input change
  handleNameChange: stores.findId.handleNameChange,
  handleHpChange: stores.findId.handleHpChange,
  //유효성 검사
  available_name: stores.findId.available_name,
  available_hp: stores.findId.available_hp,

  handleReset: stores.findId.handleReset,
  //결과
  result: stores.findId.result,
  result_state: stores.findId.result_state,
  //submit
  handleSubmit: stores.findId.handleSubmit,

  modal_open: stores.findPass.modal_open,
  handleOpen: stores.findPass.handleOpen,
  error: stores.findId.error,
  login_state: stores.info.login_state,
}))
@observer
class findid extends Component {
  componentWillMount = () => {
    this.props.handleReset();

    if (this.props.login_state) {
      this.props.history.replace("/");
    }
  };

  render() {
    const {
      name,
      hp,
      error,
      //유효성
      available_name,
      available_hp,
      handleReset,
      //change
      handleNameChange,
      handleHpChange,
      handleSubmit,
      result,
      result_state,
      modal_open,
      handleOpen,
      history,
    } = this.props;

    return (
      <div>
        <div>
          <center>
            <div style={{ marginTop: "120px" }}>
              <Email style={{ verticalAlign: "middle" }} />
              <span style={{
                fontSize: "medium",
                fontWeight: "400",
                verticalAlign: "middle",
              }}>
                이메일 찾기</span>
            </div>
            <div style={{ marginTop: "50px" }}>
              <span style={{ marginLeft: "-175px" }}>이름</span>
              <br />
              <TextField
                id="standard-basic"
                value={name}
                onChange={handleNameChange}
                error={!(name === "") ^ available_name}
                helperText={
                  available_name || name === "" ? "" : "한글 2~5자 / 영문 2~15자 "
                }
                style={{ width: "200px" }}
              />
              <br /><br /><br />
              <span style={{ marginLeft: "-155px" }}>전화번호</span>
              <br />
              <TextField
                id="standard-basic"
                value={hp}
                onChange={handleHpChange}
                error={!(hp === "010") ^ available_hp}
                helperText={!available_hp && "하이픈(-) 없이 입력"}
                style={{ width: "200px" }}
              />
              <br />
              <br />
            </div>
            <span
              style={{
                fontWeight: "400",
                color: "red",
                fontSize: "medium",
              }}
            >
              {error === "" ? "" : error}
            </span>
            <br />
            <br />
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{ backgroundColor: "#002060", color: "#ffffff" }}
              component="span"
            >
              이메일 찾기
          </Button>
          </center>
          <br />
          <br />
          <div>
            <Dialog
              open={modal_open}
              onClose={handleOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {result}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {result_state && (
                  <Button
                    onClick={() => {
                      handleReset();
                      history.replace("/login");
                      handleOpen();
                    }}
                    color="primary"
                  >
                    로그인
                  </Button>
                )}
                {result_state && (
                  <Button
                    onClick={() => {
                      handleReset();
                      history.replace("/findpass");
                      handleOpen();
                    }}
                    color="primary"
                  >
                    비밀번호 찾기
                  </Button>
                )}

                {!result_state && (
                  <Button onClick={handleOpen} color="primary" autoFocus>
                    확인
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div >
    );
  }
}

export default findid;