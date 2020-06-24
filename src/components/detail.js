import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Comment from "./comment";

import "../css/detail.css";
import Info from "@material-ui/icons/InfoOutlined";
import { Share, Close, People, Timer, Star, ChatBubbleOutline, Bookmark, ThumbUp } from "@material-ui/icons";
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import queryString from "query-string";

// **** 최하단에 있던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
  all: stores.detail.all,
  getRecipe: stores.detail.getRecipe,
  ing_list: stores.detail.ing_list,
  step_list: stores.detail.step_list,

  comp_img: stores.detail.comp_img,
  changeComp: stores.detail.changeComp,
  sliderR: stores.detail.sliderR,
  sliderL: stores.detail.sliderL,
  sliderP: stores.detail.sliderP,

  //공유모달
  modal_open: stores.detail.modal_open,
  handleShare: stores.detail.handleShare,
  url: stores.detail.url,
  onCopy: stores.detail.onCopy,

  //댓글모달
  comment_open: stores.detail.comment_open,
  handleComment: stores.detail.handleComment,

  checkjoa: stores.detail.checkjoa,
  Joayo: stores.detail.Joayo,

  checkscr: stores.detail.checkscr,
  Scrap: stores.detail.Scrap,

  //step 모드
  changeStep: stores.detail.changeStep,
  step_state: stores.detail.step_state,
  step_slide: stores.detail.step_slide,
  stepR: stores.detail.stepR,
  stepL: stores.detail.stepL,
}))
@observer
class Detail extends Component {
  componentWillMount = () => {
    let query = queryString.parse(this.props.location.search);
    window.scrollTo(0, 0);
    this.props.getRecipe(query.recipe);
    this.props.changeComp();
  };
  render() {
    const {
      all,

      ing_list,
      step_list,

      comp_img,

      sliderR,
      sliderL,
      sliderP,
      changeComp,

      //공유모달
      modal_open,
      handleShare,
      url,
      onCopy,

      //댓글모달
      comment_open,
      handleComment,

      checkjoa,
      Joayo,

      checkscr,
      Scrap,

      changeStep,
      step_state,
      step_slide,
      stepR,
      stepL,
    } = this.props;

    //주재료
    const main = ing_list.map((i, idx) => {
      return (
        <div key={idx}>
          {i.sort === "주재료" ? i.ingre_name : ""}
          {i.sort === "주재료" ? <Info /> : ""}&nbsp;
          {i.sort === "주재료" ? i.quantity : ""}
        </div>
      );
    });

    //부재료
    const sub = ing_list.map((i, idx) => {
      return (
        <div key={idx}>
          {i.sort === "부재료" ? i.ingre_name : ""}
          {i.sort === "부재료" ? <Info /> : ""}&nbsp;
          {i.sort === "부재료" ? i.quantity : ""}
        </div>
      );
    });

    //조리순서 기본
    const step1 = step_list.map((i, num) => {
      return (
        <div key={num}>
          <div className="stepnc">
            <div className="stepnum">{num + 1}</div>
            <p style={{ float: "left" }}>
              <b>{i.content}</b>
            </p>
            <br />
          </div>
          <img
            src={`http://localhost:9000/acorn/image/recipe/${i.photo}`}
            alt=""
          />
        </div>
      );
    });
    //글만 - 1
    const step2 = step_list.map((i, num) => {
      return (
        <div key={num}>
          <div className="stepnc">
            <div className="stepnum">{num + 1}</div>
            <p style={{ float: "left" }}>
              <b>{i.content}</b>
            </p>
            <br />
          </div>
        </div>
      );
    });
    //슬라이더
    const step3 = () => {
      return (
        <div>
          <div className="stepnc">
            <div className="stepnum">{step_slide + 1}</div>
            <p style={{ float: "left" }}>
              <b>{step_list[step_slide].content}</b>
            </p>
            <br />
            <img
              src={`http://localhost:9000/acorn/image/recipe/${step_list[step_slide].photo}`}
              alt=""
            />
          </div>
          <br />
          <button onClick={stepL}>&lt;</button>
          <button onClick={stepR}>&gt;</button>
        </div>
      );
    };

    return (
      <div>
        {/* Default */}
        {/* 썸네일 */}
        <div
          style={{ width: "100%", height: "270px" }}
        >
          <div className="detailThumbnail">
            <div className="centered">
              <img
                className="detailThumbnailImg"
                src={`http://localhost:9000/acorn/image/recipe/${all.repre_photo}`}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 글 정보 */}
        <div>
          <div
            style={{
              position: "relative",
              width: "100%",
              border: "1px solid black",
            }}
          >
            <center>
              <img
                className="de_profile"
                src={`http://localhost:9000/acorn/image/profile/${all.profile}`}
                alt=""
              />
              <p style={{ fontWeight: "500", fontSize: "10pt" }}>
                {all.nickname}
              </p>

              {/* 요리 제목 */}
              <p style={{ fontWeight: "500", fontSize: "16pt" }}>
                {all.subject}
              </p>

              {/* 요리 설명 */}
              <p>
                <img src="/img/quote1.png" alt="" width="16px" />
                <span style={{ fontWeight: "500", fontSize: "12pt" }}>
                  {all.summary}
                </span>
                <img src="/img/quote2.png" alt="" width="16px" />
              </p>
              <br />
              <div className="ptdGroup">
                <div className="ptd"><People /><br />{all.portion}</div>
                <div className="ptd"><Timer /><br />{all.time}</div>
                <div className="ptd"><Star /><br />{all.difficult}</div>
              </div>
              <div>
                <div>
                  <Share onClick={handleShare} /><br />
                  URL 복사
                </div>
                <div>
                  <Bookmark onClick={Scrap} /><br />
                  {checkscr === 0 ? "스크랩하기" : "스크랩 취소"}
                </div>
                <div>
                  <ThumbUp onClick={Joayo} /><br />
                  {checkjoa === 0 ? "좋아요" : "좋아요 취소"}
                </div>
                <div>
                  <ChatBubbleOutline onClick={handleComment} /><br />
                  댓글 0개
                </div>
              </div>
            </center>
          </div>
          <div style={{ width: "100%", border: "1px solid black" }}>
            재료
            <br />
            <b>주재료</b>
            <br />
            {main}
            <hr />
            <br />
            <b>부재료</b>
            <br />
            {sub}
            <hr />
            <b>조리순서</b>
            <br />
            <button
              onClick={() => {
                //기본 0
                changeStep(0);
              }}
            >
              기본
            </button>
            <button
              onClick={() => {
                //슬라이더 2번
                changeStep(2);
              }}
            >
              이미지슬라이더
            </button>
            <button
              onClick={() => {
                //글만 1번
                changeStep(1);
              }}
            >
              글만
            </button>
            {step_state === 0 ? step1 : step_state === 1 ? step2 : step3()}
            <br />
            <br />
            <b>완성사진</b>
            <br />
            <div>
              <img
                width="200px"
                height="200px"
                src={`http://localhost:9000/acorn/image/recipe/${comp_img}`}
                alt=""
              />
              <br />
              <button onClick={sliderL}>&lt;</button>
              <button onClick={sliderP}>일시정지</button>
              <button onClick={changeComp}>재생</button>
              <button onClick={sliderR}>&gt;</button>
            </div>
            <br />
            <br />
            <b>요리 Tip!</b>
            <br />
            {all.tip}
          </div>
        </div>
        {/* Default */}

        {/* 공유모달 */}
        <div>
          <Dialog open={modal_open} onClose={handleShare}>
            <DialogTitle id="form-dialog-title">
              URL 복사하기
              <IconButton edge="end" onClick={handleShare} aria-label="close">
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <TextField
                value={url}
                readOnly
                fullWidth
                variant="filled"
                size="small"
              />
              <CopyToClipboard text={url} onCopy={onCopy}>
                <Button color="primary" variant="contained">
                  복사하기
                </Button>
              </CopyToClipboard>
            </DialogContent>
          </Dialog>
        </div>
        {/* 공유모달 */}

        {/* 댓글모달 */}
        <Dialog fullScreen open={comment_open} onClose={handleComment}>
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleComment}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>

          <div>
            <br />
            <br />
            <Comment />
          </div>
        </Dialog>
        {/* 댓글모달 */}
      </div>
    );
  }
}

export default Detail;
