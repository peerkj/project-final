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
}))
@observer
class withdraw extends Component {
  onClick = () => {
    this.props.handleWithdraw(this.props.history);
  };

  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <div>
          <h3>탈퇴사유를 선택하세요</h3>
          <FormControl component="fieldset">
            <RadioGroup
              defaultValue="reason1"
              aria-label="reason"
              name="reason"
              onChange={handleChange}
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
            <Button onClick={this.onClick} variant="contained" color="primary">
              회원탈퇴
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default withdraw;
