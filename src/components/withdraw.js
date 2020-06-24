import React, { Component } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  handleChange: stores.withdraw.handleChange,
  handleWithdraw: stores.withdraw.handleWithdraw,
  login_state: stores.info.login_state,
  pass_check: stores.chefupdate.pass_check,
}))
@observer
class withdraw extends Component {
  componentWillMount = () => {
    if (!this.props.login_state || !this.props.pass_check) {
      this.props.history.push("/login");
    }
  };

  onClick = () => {
    this.props.handleWithdraw(this.props.history);
  };

  render() {
    const { handleChange, handleWithdraw } = this.props;
    return (
      <div>
        <div style={{
          width: "240px",
          marginTop: "80px",
          marginLeft: "30px",
          border: "1px solid #e5e3e3",
          borderRadius: "20px",
          padding: "30px"
        }}>
          <center>
            <span
              style={{
                fontSize: "14pt",
                fontWeight: "500",
              }}
            >탈퇴 사유를 선택하세요</span>
          </center>
          <br />
          <br />
          <div style={{ width: "185px", margin: "0 auto" }}>
            <FormControl component="fieldset">
              <RadioGroup
                defaultValue="reason1"
                aria-label="reason"
                name="reason"
                onChange={handleChange}
                style={{ marginLeft: "10px" }}
              >
                <FormControlLabel
                  value="reason1"
                  control={<Radio />}
                  label="서비스 불만"
                />
                <FormControlLabel
                  value="reason2"
                  control={<Radio />}
                  label="다른 서비스 이용"
                />
                <FormControlLabel
                  value="reason3"
                  control={<Radio />}
                  label="홈페이지 정보 부족"
                />
                <FormControlLabel
                  value="reason4"
                  control={<Radio />}
                  label="기타"
                />
              </RadioGroup>
              <center>
                <Button onClick={this.onClick} variant="contained"
                  style={{ backgroundColor: "#002060", color: "#ffffff", marginTop: "40px" }}>
                  탈퇴하기
                </Button>
              </center>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default withdraw;
