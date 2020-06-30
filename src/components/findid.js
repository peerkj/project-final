import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { TextField, Button } from "@material-ui/core";
import { Email } from "@material-ui/icons";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

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
        <div
          id="divjoin"
          style={{
            width: "290px",
            margin: "0 auto",
          }}
        >
          <div style={{ marginTop: "120px" }}>
            <center>
              <Email style={{ verticalAlign: "middle" }} />
              <span
                style={{
                  fontSize: "medium",
                  fontWeight: "400",
                  verticalAlign: "middle",
                }}
              >
                이메일 찾기
              </span>
            </center>
          </div>
          <div style={{ marginTop: "50px", marginLeft: "50px" }}>
            <span>이름</span>
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
            <br />
            <br />
            <span>전화번호</span>
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

            <center>
              <span
                style={{
                  fontWeight: "400",
                  color: "red",
                  fontSize: "medium",
                }}
              >
                {error === "" ? <br /> : error}
              </span>
            </center>
            <br />
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{
                backgroundColor: "#002060",
                color: "#ffffff",
                marginLeft: "45px",
              }}
              component="span"
            >
              이메일 찾기
            </Button>
            <br />
            <br />
          </div>
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
                      history.push("/login");
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
                      history.push("/findpass");
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
      </div>
    );
  }
}

export default findid;
