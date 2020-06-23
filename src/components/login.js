import React, { Component } from "react";
import { TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { AccountCircle, Https, Email } from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import "../css/login.css";

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

  handleEnter: stores.login.handleEnter,
}))
@observer
class login extends Component {
  componentWillMount = () => {
    this.props.handleReset();

    if (this.props.login_state) {
      this.props.history.replace("/");
    }
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
      handleLogin,
      history,
      error,

      handleEnter,
    } = this.props;

    return (
      <div>
        <div style={{ width: "290px", margin: "0 auto", }}>
          <div style={{ marginTop: "200px" }}>
            <center>
              <AccountCircle style={{ verticalAlign: "middle" }} />
              <span style={{ fontSize: "medium", fontWeight: "300", verticalAlign: "middle" }}>
                로그인
            </span>
            </center>
            <br /><br />
            <Grid container spacing={1} alignItems="flex-start" style={{ marginLeft: "22px" }}>
              <Grid item style={{ padding: "10px 1px" }}>
                <Email />
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
                  label="E-mail"
                  type="text"
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>

            <div>
              <Grid container spacing={1} style={{ marginLeft: "22px", marginTop: "3px" }}>
                <Grid item style={{ padding: "10px 1px" }}>
                  <Https />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-password-input"
                    name="password"
                    variant="outlined"
                    size="small"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePassChange}
                    onKeyPress={(e) => {
                      handleEnter(e, history);
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <br />
            <center>
              <Button
                onClick={() => {
                  handleLogin(history);
                }}
                variant="contained"
                style={{ backgroundColor: "#002060", color: "#ffffff" }}
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
            </center>
          </div>
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