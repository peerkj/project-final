import React, { Component } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { Create, Lock, AccountCircle } from "@material-ui/icons";

@inject((stores) => ({
  password: stores.chefupdate.password,
  modal_open: stores.chefupdate.modal_open,
  handleOpen: stores.chefupdate.handleOpen,
  handlePassChange: stores.chefupdate.handlePassChange,
  handleReset: stores.chefupdate.handleReset,
  login_state: stores.info.login_state,
  error: stores.chefupdate.error,
  pass_open: stores.chefupdate.pass_open,
  handleOpen2: stores.chefupdate.handleOpen2,
  new_password: stores.chefupdate.new_password,
  new_password_re: stores.chefupdate.new_password_re,
  handleNewPassChange: stores.chefupdate.handleNewPassChange,
  handleNewPassReChange: stores.chefupdate.handleNewPassReChange,
  available_newpassword: stores.chefupdate.available_newpassword,
  available_pass_re: stores.chefupdate.available_pass_re,
  handlePassUpdate: stores.chefupdate.handlePassUpdate,
  email: stores.cu.email,
  imgBase64: stores.cu.menu_profile,
  handleEnter: stores.chefupdate.handleEnter,
  handleUpdate: stores.chefupdate.handleUpdate,
  handleEnter2: stores.chefupdate.handleEnter2,
}))
@observer
class mypage extends Component {
  componentWillMount = () => {
    this.props.handleReset();
    if (!this.props.login_state) {
      this.props.history.push("/login");
    }
  };

  render() {
    const {
      password,
      modal_open,
      handleOpen,
      handlePassChange,
      handleNewPassChange,
      handleNewPassReChange,
      available_newpassword,
      available_pass_re,
      handleOpen2,
      handlePassUpdate,
      imgBase64,
      error,
      pass_open,
      new_password,
      new_password_re,
      email,
      handleEnter,
      handleUpdate,
      history,
      handleEnter2,
    } = this.props;
    return (
      <div>
        <center>
          <div>
            {imgBase64 ? (
              <img
                src={imgBase64}
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              />
            ) : (
                <img src="img/basic_user.png" alt="" style={{ width: "200px" }} />
              )}
          </div>
          <span style={{ fontSize: "12pt", fontWeight: "300" }}>{email}</span>
        </center>
        <hr style={{ marginTop: "55px" }} />
        <div style={{ marginTop: "25px" }}>
          <ul style={{ marginLeft: "90px", padding: "10px" }}>
            <li style={{ padding: "10px" }}>
              <Create style={{ verticalAlign: "middle" }} />
              <Button
                color="#000000"
                onClick={() => {
                  handleOpen(1);
                }}
                style={{ fontSize: "12pt" }}
              >
                회원정보 수정
            </Button>
            </li>
            <li style={{ padding: "10px" }}>
              <Lock style={{ verticalAlign: "middle" }} />
              <Button
                color="#000000"
                onClick={() => {
                  handleOpen(2);
                }}
                style={{ fontSize: "12pt" }}
              >
                비밀번호 변경
            </Button>
            </li>
            <li style={{ padding: "10px" }}>
              <AccountCircle style={{ verticalAlign: "middle" }} />
              <Button
                color="#000000"
                onClick={() => {
                  handleOpen(3);
                }}
                style={{ fontSize: "12pt" }}
              >
                회원 탈퇴
            </Button>
            </li>
          </ul>
        </div>
        <div>
          <Dialog
            open={modal_open}
            onClose={handleOpen}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">비밀번호 확인</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                onKeyPress={(e) => {
                  handleEnter(e, history);
                }}
                onChange={handlePassChange}
                value={password}
                margin="dense"
                label="비밀번호 입력"
                type="password"
                fullWidth
                id="name"
                helperText={error}
                error={error !== ""}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleUpdate(history);
                }}
                color="primary"
              >
                확인
              </Button>
              <Button onClick={handleOpen} color="primary">
                취소
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={pass_open}
            onClose={handleOpen2}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">비밀번호 변경</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                onChange={handleNewPassChange}
                value={new_password}
                margin="dense"
                id="name"
                label="새로운 비밀번호 입력"
                type="password"
                fullWidth
                error={!(new_password === "") ^ available_newpassword}
                helperText={
                  available_newpassword || new_password === ""
                    ? ""
                    : "8~10자 영문,숫자 조합"
                }
              />
            </DialogContent>
            <DialogContent>
              <TextField
                onKeyPress={handleEnter2}
                onChange={handleNewPassReChange}
                value={new_password_re}
                margin="dense"
                id="name"
                label="비밀번호 확인"
                type="password"
                fullWidth
                error={
                  new_password_re === ""
                    ? false
                    : !available_pass_re
                      ? true
                      : false
                }
                helperText={
                  available_pass_re || new_password_re === ""
                    ? ""
                    : "비밀번호가 일치하지 않습니다"
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePassUpdate} color="primary">
                확인
              </Button>
              <Button onClick={handleOpen2} color="primary">
                취소
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default mypage;
