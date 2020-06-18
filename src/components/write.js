import React, { Component } from "react";
import "../css/write.css";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  Cancel,
  AddCircle,
  AddPhotoAlternate,
  Close,
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  //주,부 재료 추가
  handelAddMain: stores.write.handelAddMain,
  main_ingre: stores.write.main_ingre,
  handleChange_main_i: stores.write.handleChange_main_i,
  handleChange_main_q: stores.write.handleChange_main_q,
  handelDelete_ingre: stores.write.handelDelete_ingre,
  handelAddSub: stores.write.handelAddSub,
  sub_ingre: stores.write.sub_ingre,
  handleChange_sub_i: stores.write.handleChange_sub_i,
  handleChange_sub_q: stores.write.handleChange_sub_q,
  handelDelete_ingre_sub: stores.write.handelDelete_ingre_sub,

  //
  imgBase64: stores.write.imgBase64,
  handleChangeImg: stores.write.handleChangeImg,
  handleRemove: stores.write.handleRemove,
  step: stores.write.step,
  handelAddStep: stores.write.handelAddStep,
  handelDelete_step: stores.write.handelDelete_step,
}))
@observer
class write extends Component {
  render() {
    const {
      handelAddMain,
      main_ingre,
      handleChange_main_i,
      handleChange_main_q,
      handelDelete_ingre,
      handelAddSub,
      sub_ingre,
      handleChange_sub_i,
      handleChange_sub_q,
      handelDelete_ingre_sub,

      //
      imgBase64,
      handleChangeImg,
      handleRemove,
      step,
      handelAddStep,
      handelDelete_step,
    } = this.props;

    const m_i = main_ingre.map((i, idx) => {
      return (
        <div key={idx}>
          <TextField
            value={i.main_ingre}
            onChange={(e) => {
              handleChange_main_i(e, idx);
            }}
            id="outlined-helperText"
            label="재료"
            helperText="예) 돼지고기"
            variant="outlined"
            size="small"
            className="inputingre"
          />
          <TextField
            value={i.main_quantity}
            onChange={(e) => {
              handleChange_main_q(e, idx);
            }}
            id="outlined-helperText"
            label="용량"
            helperText="예) 300g"
            variant="outlined"
            size="small"
            className="inputingre"
            style={{
              marginLeft: "5px",
            }}
          />
          <Cancel
            onClick={() => {
              handelDelete_ingre(idx);
            }}
            size="small"
            color="disabled"
          />
        </div>
      );
    });
    const s_i = sub_ingre.map((i, idx) => {
      return (
        <div key={idx}>
          <TextField
            value={i.sub_ingre}
            onChange={(e) => {
              handleChange_sub_i(e, idx);
            }}
            id="outlined-helperText"
            label="재료"
            helperText="예) 돼지고기"
            variant="outlined"
            size="small"
            className="inputingre"
          />
          <TextField
            value={i.sub_quantity}
            onChange={(e) => {
              handleChange_sub_q(e, idx);
            }}
            id="outlined-helperText"
            label="용량"
            helperText="예) 300g"
            variant="outlined"
            size="small"
            className="inputingre"
            style={{
              marginLeft: "5px",
            }}
          />
          <Cancel
            onClick={() => {
              handelDelete_ingre_sub(idx);
            }}
            size="small"
            color="disabled"
          />
        </div>
      );
    });
    const step_list = step.map((i, idx) => {
      return (
        <div key={idx}>
          <br />
          Step {idx + 1}
          <br />
          <TextField
            id="filled-multiline-static"
            multiline
            rows={3}
            variant="filled"
            style={{ width: "235px" }}
            className="input"
          />
          <label htmlFor="contained-button-file">
            {imgBase64 ? (
              <img className="cookImg" src={imgBase64} alt="" />
            ) : (
              <img className="cookImg" src="img/add_icon.png" alt="" />
            )}
          </label>
          <input
            style={{ display: "none" }}
            accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleChangeImg}
          />
          <Cancel
            onClick={() => {
              handelDelete_step(idx);
            }}
            size="small"
            color="disabled"
          />
        </div>
      );
    });
    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

    return (
      <div>
        <div id="writebody">
          <br />
          <br />
          <br />

          <div id="ingredient">
            <div className="all_title">재료 입력</div>
            <br />
            <b>주재료</b>
            <br />
            {m_i}

            <br />
            <div id="add_ingredient" onClick={handelAddMain}>
              <AddCircle size="small" color="primary" />
              <div className="subtext">재료 추가</div>
            </div>
            <div>
              <br />
              <b>부재료</b>
              <br />
              {s_i}
              <div id="add_ingredient" onClick={handelAddSub}>
                <AddCircle size="small" color="primary" />
                <div className="subtext">재료 추가</div>
              </div>
            </div>
          </div>

          <div>
            <br />
            <div className="all_title">요리 순서</div>
            {step_list}
            <div onClick={handelAddStep}>
              <AddCircle size="small" color="primary" />
              <div className="subtext">순서 추가</div>
            </div>
          </div>
          <br />
          <div>
            <div className="all_title">완성 사진</div>
            <br />
            <img
              src="img/add_icon.png"
              alt=""
              style={{
                width: "95px",
                height: "95px",
                marginLeft: "5px",
              }}
            />
          </div>
          <br />

          <div className="all_title">요리 Tip!</div>
          <br />
          <TextField
            size="small"
            variant="filled"
            style={{
              width: "300px",
            }}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "#002060",
              color: "#ffffff",
            }}
          >
            글쓰기
          </Button>
          <Button variant="outlined" size="small" onClick={() => {}}>
            취소
          </Button>
        </div>
      </div>
    );
  }
}

export default write;
