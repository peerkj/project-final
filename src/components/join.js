import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../css/join.css";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  email: stores.join.email,
  password: stores.join.password,
  password_check: stores.join.password_check,
  name: stores.join.name,
  nickname: stores.join.nickname,
  birth: stores.join.birth,
  profile: stores.join.profile,
  imgBase64: stores.join.imgBase64,
  handleChangeImg: stores.join.handleChangeImg,
  handleChange: stores.join.handleChange,
  handleRemove: stores.join.handleRemove,
  emailCheck: stores.join.emailCheck,
}))
@observer
class join extends Component {
  render() {
    const {
      email,
      password,
      password_check,
      name,
      nickname,
      birth,
      profile,
      emailCheck,
      imgBase64,
      handleChangeImg,
      handleChange,
      handleRemove,
    } = this.props;

    return (
      <div>
        <div
          style={{
            backgroundColor: "#efefef",
            width: "250px",
            height: "250px",
          }}
        >
          {imgBase64 ? (
            <img
              style={{ width: "250px", height: "250px" }}
              src={imgBase64}
              alt=""
            />
          ) : (
            <img
              style={{ width: "250px", height: "250px" }}
              src="img/basic_user.png"
              alt=""
            />
          )}
        </div>
예지
        <input
          style={{ display: "none" }}
          accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChangeImg}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleRemove}
        >
          Delete
        </Button>
        <br />
        <input type="text" name="email" onChange={handleChange} value={email} />

        <br />
        <Button variant="contained" color="primary" component="span">
          회원가입
        </Button>
      </div>
    );
  }
}

export default join;
