import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

@inject((stores) => ({
  //input list
  name: stores.findPass.name,
  email: stores.findPass.email,
  handleReset: stores.findPass.handleReset,
  error: stores.findPass.error,
  //input change
  handleNameChange: stores.findPass.handleNameChange,
  handleEmailChange: stores.findPass.handleEmailChange,
  //유효성 검사
  available_name: stores.findPass.available_name,
  available_email: stores.findPass.available_email,

  //submit
  handleSubmit: stores.findPass.handleSubmit,

  result: stores.findPass.result,
  result_state: stores.findPass.result_state,
  modal_open: stores.findPass.modal_open,
  handleOpen: stores.findPass.handleOpen,
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
      email,
      history,
      error,
      //유효성
      available_name,
      available_email,
      //change
      handleNameChange,
      handleEmailChange,

      handleSubmit,
      result,
      result_state,
      modal_open,
      handleOpen,
      handleReset,
    } = this.props;

    return (
      <div>
        <div id="divjoin">
          <b>이름</b>
          <br />
          <TextField
            id="standard-basic"
            value={name}
            onChange={handleNameChange}
            error={!(name === "") ^ available_name}
            helperText={
              available_name || name === "" ? "" : "한글 2~5자 / 영문 2~15자 "
            }
          />
          <br />
          <br />
          <b>이메일</b>
          <br />
          <TextField
            id="standard-basic"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={!(email === "") ^ available_email}
            helperText={
              available_email || email === ""
                ? ""
                : "이메일 형식으로 입력하세요"
            }
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
          <br />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            component="span"
          >
            비밀번호 찾기
          </Button>

          <br />
          {result_state && <Link to="/login">로그인</Link>}
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