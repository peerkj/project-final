import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  password: stores.chefupdate.password,
  modal_open: stores.chefupdate.modal_open,
  handleOpen: stores.chefupdate.handleOpen,
  handlePassChange: stores.chefupdate.handlePassChange,
  handleUpdate: stores.chefupdate.handleUpdate,
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
}))
@observer
class mypage extends Component {
  componentWillMount = () => {
    this.props.handleReset();
    if (!this.props.login_state) {
      this.props.history.replace("/");
    }
  };

  handleUpdate = () => {
    this.props.handleUpdate(this.props.history);
  };

  handleOpen1 = () => {
    this.props.handleOpen(1);
  };
  handleOpen2 = () => {
    this.props.handleOpen(2);
  };
  handleOpen3 = () => {
    this.props.handleOpen(3);
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
      error,
      pass_open,
      new_password,
      new_password_re,
    } = this.props;
    return (
      <div>
        <ul>
          <li>
            <Button color="primary" onClick={this.handleOpen1}>
              회원정보수정
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={this.handleOpen2}>
              비밀번호 변경
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={this.handleOpen3}>
              회원탈퇴
            </Button>
          </li>
        </ul>

        <div>
          <Dialog
            open={modal_open}
            onClose={handleOpen}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">비밀번호 확인</DialogTitle>
            <DialogContent>
              <TextField
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
              <Button onClick={this.handleUpdate} color="primary">
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
