import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { AccountCircle, Https } from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import "../css/login.css";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

@inject((stores) => ({
  email: stores.login.email,
  password: stores.login.password,
  handleReset: stores.login.handleReset,
  handleLogin: stores.login.handleLogin,
  handleEmailChange: stores.login.handleEmailChange,
  handlePassChange: stores.login.handlePassChange,
  login_state: stores.info.login_state,
  //유효성 검사
  available_email: stores.login.available_email,
  available_password: stores.login.available_password,

  modal_open: stores.findPass.modal_open,
  handleOpen: stores.findPass.handleOpen,
  error: stores.login.error,
}))
@observer
class login extends Component {
  componentWillMount = () => {
    this.props.handleReset();

    if (this.props.login_state) {
      this.props.history.replace("/");
    }
  };

  handleSubmit = () => {
    this.props.handleLogin(this.props.history);
  };

  render() {
    const {
      email,
      password,
      handleEmailChange,
      handlePassChange,
      available_email,
      modal_open,
      handleOpen,
      history,
      error,
    } = this.props;

    return (
      <div>
        <div style={{ width: "280px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginTop: "200px" }}>
            <span style={{ fontWeight: "bold", fontSize: "large" }}>
              로그인
            </span>

            <Grid container spacing={1} alignItems="flex-start">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  error={!(email === "") ^ available_email}
                  helperText={
                    available_email || email === ""
                      ? ""
                      : "이메일 형식으로 입력하세요"
                  }
                  value={email}
                  id="outlined-id-input"
                  variant="outlined"
                  size="small"
                  label="e-mail"
                  type="text"
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={1}>
              <Grid item alignItems="center">
                <Https />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-password-input"
                  name="password"
                  variant="outlined"
                  size="small"
                  label="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePassChange}
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            로그인
          </Button>
          <br />
          <br />
          <span style={{ color: "#BDBDBD" }}>계정이 없으신가요?</span>
          &nbsp;&nbsp;
          <Link to="/join">회원가입</Link>
          <br />
          <Link to="/findid" style={{ textDecoration: "none" }}>
            이메일 찾기
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            to="/findpass"
            style={{ textDecoration: "none" }}
            activeStyle={{ color: "#BDBDBD" }}
          >
            비밀번호 찾기
          </Link>
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
                {error}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOpen} color="primary" autoFocus>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default login;
