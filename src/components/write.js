import React, { Component } from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import "../css/write.css";
import {
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Cancel, AddCircle, Close } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  subject: stores.write.subject,
  summary: stores.write.summary,
  tip: stores.write.tip,
  handleSubjectChange: stores.write.handleSubjectChange,
  handleSummaryChange: stores.write.handleSummaryChange,
  handleFoodcateChange: stores.write.handleFoodcateChange,
  handlePortionChange: stores.write.handlePortionChange,
  handleTimeChange: stores.write.handleTimeChange,
  handleDiffChange: stores.write.handleDiffChange,
  handleTipChange: stores.write.handleTipChange,
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

  //
  represent: stores.write.represent,
  handleChangeRe: stores.write.handleChangeRe,
  handleRemoveRe: stores.write.handleRemoveRe,
  //
  insertRecipe: stores.write.insertRecipe,

  handleReset: stores.write.handleReset,
  login_state: stores.info.login_state,
}))
@observer
class write extends Component {
  componentWillMount = () => {
    this.props.handleReset();
    window.scrollTo(0, 0);
    if (!this.props.login_state) {
      this.props.history.push("/login");
    }
  };

  render() {
    const {
      history,
      subject,
      summary,
      tip,
      handleSubjectChange,
      handleSummaryChange,
      handleFoodcateChange,
      handlePortionChange,
      handleTimeChange,
      handleDiffChange,
      handleTipChange,
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

      //
      represent,
      handleChangeRe,
      handleRemoveRe,
      //
      insertRecipe,
    } = this.props;

    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        width: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

    //이동한 STEP, 이동지점
    const handleDrop = (e, idx) => {
      changeStep(e.dragData.idx, idx);
    };
    const handleDropDone = (e, idx) => {
      changeDone(e.dragData.idx, idx);
    };

    //주재료 입력
    const m_i = main_ingre.map((i, idx) => {
      return (
        <div key={idx} className="inputingre_margin">
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
            className="inputcancle"
          />
        </div>
      );
    });

    // 부재료 입력
    const s_i = sub_ingre.map((i, idx) => {
      return (
        <div key={idx} className="inputingre_margin">
          <TextField
            value={i.ingre_name}
            onChange={(e) => {
              handleChange_sub_i(e, idx);
            }}
            id="outlined-helperText"
            label="재료"
            helperText="예) 양파"
            variant="outlined"
            size="small"
            className="inputingre"
          />
          <TextField
            value={i.quantity}
            onChange={(e) => {
              handleChange_sub_q(e, idx);
            }}
            id="outlined-helperText"
            label="용량"
            helperText="예) 1/2개"
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
            className="inputcancle"
          />
        </div>
      );
    });

    //요리 순서
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
              style={{ width: "230px" }}
              className="input"
              value={i.content}
              onChange={(e) => {
                onChangeStep(e, idx);
              }}
            />
            <label htmlFor={idx}>
              {i.imgBase64 ? (
                <img className="cookImg" src={i.imgBase64} alt="" />
              ) : (
                <img className="cookImg" src="img/add_icon2.png" alt="" />
              )}
            </label>
            {i.imgBase64 ? (
              <Close
                onClick={() => {
                  handleRemove(idx);
                }}
                size="small"
                style={{ position: "relative", left: "-21px", top: "-75px" }}
              />
            ) : (
              ""
            )}
            <Cancel
              onClick={() => {
                handelDelete_step(idx);
              }}
              size="small"
              color="disabled"
              style={{ position: "absolute", top: "75px", left: "335px" }}
            />
            <input
              onChange={(e) => {
                handleChangeImg(e, idx);
              }}
              style={{ display: "none" }}
              accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
              id={idx}
              type="file"
            />
          </DropTarget>
        </DragDropContainer>
      );
    });

    //완성 사진
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
            <div className="finishImg">
              <label htmlFor={idx + "done"}>
                {i.imgBase64 ? (
                  <img className="finishImg" src={i.imgBase64} alt="" />
                ) : (
                  <img className="finishImg" src="img/add_icon2.png" alt="" />
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
              style={{ position: "relative", top: "-140px", left: "140px" }}
            />
          </DropTarget>
        </DragDropContainer>
      );
    });

    return (
      <div>
        <div id="writebody">
          <div>
            {/* 대표 사진 */}
            <div style={{ width: "150px", float: "right", marginTop: "15px" }}>
              <label htmlFor="repre">
                {represent.imgBase64 ? (
                  <img
                    className="writeThumbnail"
                    src={represent.imgBase64}
                    alt=""
                  />
                ) : (
                  <img
                    className="writeThumbnail"
                    src="img/add_icon3.png"
                    alt=""
                  />
                )}
              </label>
              {represent.imgBase64 ? (
                <Close
                  onClick={() => {
                    handleRemoveRe();
                  }}
                  id="thumbnail_delete"
                />
              ) : (
                ""
              )}
            </div>
            <input
              onChange={handleChangeRe}
              style={{ display: "none" }}
              accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
              id="repre"
              type="file"
            />
            <br />
            <div>
              <div className="all_title">레시피 제목</div>
              <div>
                <TextField
                  onChange={handleSubjectChange}
                  value={subject}
                  className="inputwriteform"
                  size="small"
                  variant="outlined"
                />
              </div>
              <br />
              <div className="all_title">요리 소개</div>
              <div>
                <TextField
                  onChange={handleSummaryChange}
                  value={summary}
                  className="inputwriteform"
                  size="small"
                  variant="outlined"
                />
              </div>
            </div>
            <br />
            <br />
            <div className="all_title">카테고리</div>
            <FormControl className={useStyles.formControl}>
              <br/>
              <InputLabel id="demo-simple-select-label">음식 카테고리</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleFoodcateChange}
                style={{ width: "160px", marginTop: "-4px" }}
              >
                <MenuItem value="구이">구이</MenuItem>
                <MenuItem value="국/탕/찌개">국/탕/찌개</MenuItem>
                <MenuItem value="디저트">디저트</MenuItem>
                <MenuItem value="면">면</MenuItem>
                <MenuItem value="무침">무침</MenuItem>
                <MenuItem value="밥/죽/떡">밥/죽/떡</MenuItem>
                <MenuItem value="볶음">볶음</MenuItem>
                <MenuItem value="양념/소스">양념/소스</MenuItem>
                <MenuItem value="조림/찜">조림/찜</MenuItem>
                <MenuItem value="튀김/부침">튀김/부침</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <br />
            <div className="all2nd_title">요리 정보</div>
            <FormControl className={useStyles.formControl}>
              <InputLabel id="demo-simple-select-label">인원</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handlePortionChange}
                style={{ width: "110px" }}
              >
                <MenuItem value="1인분">1인분</MenuItem>
                <MenuItem value="2인분">2인분</MenuItem>
                <MenuItem value="3인분">3인분</MenuItem>
                <MenuItem value="4인분">4인분</MenuItem>
                <MenuItem value="5인분 이상">5인분 이상</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className={useStyles.formControl}
              style={{
                marginLeft: "10px",
              }}
            >
              <InputLabel id="demo-simple-select-label">시간</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleTimeChange}
                style={{ width: "110px" }}
              >
                <MenuItem value="15분 이내">15분 이내</MenuItem>
                <MenuItem value="30분 이내">30분 이내</MenuItem>
                <MenuItem value="60분 이내">60분 이내</MenuItem>
                <MenuItem value="90분 이내">90분 이내</MenuItem>
                <MenuItem value="2시간 이상">2시간 이상</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className={useStyles.formControl}
              style={{
                marginLeft: "10px",
              }}
            >
              <InputLabel id="demo-simple-select-label">난이도</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleDiffChange}
                style={{ width: "110px" }}
              >
                <MenuItem value="아무나">아무나</MenuItem>
                <MenuItem value="초급">초급</MenuItem>
                <MenuItem value="중급">중급</MenuItem>
                <MenuItem value="고급">고급</MenuItem>
                <MenuItem value="요리사">요리사</MenuItem>
              </Select>
            </FormControl>
          </div>
          <hr className="line" />
          <div id="ingredient">
            <div className="all_title">재료 입력</div>
            <span className="subtitle">주재료</span>
            <br />
            {m_i}
            <br />
            <center>
              <div id="add_ingredient" onClick={handelAddMain}>
                <AddCircle
                  size="small"
                  style={{ color: "#002060", verticalAlign: "middle" }}
                />
                <div className="subtext" style={{ verticalAlign: "middle" }}>
                  재료 추가
                </div>
              </div>
            </center>
            <hr id="mdline" />
            <div>
              <br />
              <span className="subtitle">부재료</span>
              <br />
              {s_i}
              <br />
              <center>
                <div id="add_ingredient" onClick={handelAddSub}>
                  <AddCircle
                    size="small"
                    style={{ color: "#002060", verticalAlign: "middle" }}
                  />
                  <div className="subtext" style={{ verticalAlign: "middle" }}>
                    재료 추가
                  </div>
                </div>
              </center>
            </div>
          </div>
          <hr className="line" />
          <div>
            <div className="all2nd_title">요리 순서</div>
            <div style={{ color: "#c4c4c4" }}>
              Tip! 드래그로 순서를 바꿀 수 있습니다
            </div>
            {step_list}
            <center>
              <div onClick={handelAddStep} style={{ marginTop: "10px" }}>
                <AddCircle
                  size="small"
                  style={{ color: "#002060", verticalAlign: "middle" }}
                />
                <div className="subtext" style={{ verticalAlign: "middle" }}>
                  순서 추가
                </div>
              </div>
            </center>
          </div>
          <hr className="line" />
          <div>
            <div className="all2nd_title">완성 사진</div>
            <div>여러장 첨부 가능</div>
            <div style={{ color: "#c4c4c4" }}>
              Tip! 드래그로 순서를 바꿀 수 있습니다
            </div>
            {done_list}
          </div>
          <hr className="line" />
          <div className="all2nd_title">요리 Tip!</div>
          <br />
          <TextField
            onChange={handleTipChange}
            value={tip}
            size="small"
            variant="filled"
            style={{
              width: "300px",
            }}
          />
          <hr className="line" />
          <center>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                history.push("/recipe");
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                insertRecipe(history);
              }}
              variant="outlined"
              size="medium"
              style={{
                backgroundColor: "#002060",
                color: "#ffffff",
                marginLeft: "5px",
              }}
            >
              글쓰기
            </Button>
          </center>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default write;
