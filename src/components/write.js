import React, { Component } from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
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

  handleChangeImg: stores.write.handleChangeImg,
  handleRemove: stores.write.handleRemove,
  step: stores.write.step,
  handelAddStep: stores.write.handelAddStep,
  handelDelete_step: stores.write.handelDelete_step,
  changeStep: stores.write.changeStep,
  onChangeStep: stores.write.onChangeStep,

  //완성 사진
  done: stores.write.done,
  changeDone: stores.write.changeDone,
  handelAddDone: stores.write.handelAddDone,
  handelDelete_done: stores.write.handelDelete_done,
  handleChangeDone: stores.write.handleChangeDone,
  handleRemoveDone: stores.write.handleRemoveDone,

  insertRecipe: stores.write.insertRecipe,
}))
@observer
class write extends Component {
  render() {
    const {
      done,
      changeDone,
      handelAddDone,
      handelDelete_done,
      handleChangeDone,
      handleRemoveDone,
      //
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
      handleChangeImg,
      handleRemove,
      step,
      handelAddStep,
      handelDelete_step,
      changeStep,
      onChangeStep,
      insertRecipe,
    } = this.props;
    //이동한 STEP, 이동지점
    const handleDrop = (e, idx) => {
      changeStep(e.dragData.idx, idx);
    };
    const handleDropDone = (e, idx) => {
      changeDone(e.dragData.idx, idx);
    };

    const m_i = main_ingre.map((i, idx) => {
      return (
        <div key={idx}>
          <TextField
            value={i.ingre_name}
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
            value={i.quantity}
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
        <DragDropContainer
          key={idx}
          targetKey="moveStep"
          dragData={{ idx: idx }}
        >
          <br />
          Step {idx + 1}
          <br />
          <DropTarget
            targetKey="moveStep"
            onHit={(e) => {
              handleDrop(e, idx);
            }}
          >
            <TextField
              id={"filled-multiline-static" + idx}
              multiline
              rows={3}
              variant="filled"
              style={{ width: "235px" }}
              className="input"
              value={i.ex}
              onChange={(e) => {
                onChangeStep(e, idx);
              }}
            />
            <div style={{ width: "100px" }}>
              <label htmlFor={idx}>
                {i.imgBase64 ? (
                  <img className="cookImg" src={i.imgBase64} alt="" />
                ) : (
                  <img className="cookImg" src="img/add_icon.png" alt="" />
                )}
                {i.imgBase64 ? (
                  <Close
                    onClick={() => {
                      handleRemove(idx);
                    }}
                    id="profileImg_delete"
                  />
                ) : (
                  ""
                )}
              </label>
            </div>
            <input
              onChange={(e) => {
                handleChangeImg(e, idx);
              }}
              style={{ display: "none" }}
              accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
              id={idx}
              type="file"
            />
            <Cancel
              onClick={() => {
                handelDelete_step(idx);
              }}
              size="small"
              color="disabled"
            />
          </DropTarget>
        </DragDropContainer>
      );
    });
    const done_list = done.map((i, idx) => {
      return (
        <DragDropContainer
          key={idx}
          targetKey="moveDone"
          dragData={{ idx: idx }}
        >
          <br />
          <DropTarget
            targetKey="moveDone"
            onHit={(e) => {
              handleDropDone(e, idx);
            }}
          >
            <div style={{ width: "100px" }}>
              <label htmlFor={idx + "done"}>
                {i.imgBase64 ? (
                  <img className="cookImg" src={i.imgBase64} alt="" />
                ) : (
                  <img className="cookImg" src="img/add_icon.png" alt="" />
                )}
              </label>
            </div>
            <input
              onChange={(e) => {
                handleChangeDone(e, idx);
              }}
              style={{ display: "none" }}
              accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
              id={idx + "done"}
              type="file"
            />
            <Cancel
              onClick={() => {
                handelDelete_done(idx);
              }}
              size="small"
              color="disabled"
            />
          </DropTarget>
        </DragDropContainer>
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
        <button type="button" onClick={insertRecipe}>
          클릭
        </button>
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
            {done_list}
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
