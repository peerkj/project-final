import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import Comment from "./comment";
import { makeStyles } from "@material-ui/core/styles";
import "../css/detail.css";
import {
  Share,
  Close,
  People,
  Timer,
  Star,
  ChatBubbleOutline,
  Bookmark,
  FavoriteBorderSharp,
  FavoriteSharp,
  ViewList,
  ViewCarousel,
  Subject,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  PlayArrow,
  Pause,
  ExpandLess,
  BookmarkBorderSharp,
  BorderColor,
  ExpandMore,
} from "@material-ui/icons";
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
  setValue: stores.comment.setValue,
  handleOpen: stores.comment.handleOpen,

  //step 모드
  changeStep: stores.detail.changeStep,
  step_state: stores.detail.step_state,
  step_slide: stores.detail.step_slide,
  stepR: stores.detail.stepR,
  stepL: stores.detail.stepL,

  c_count: stores.detail.c_count,
  getComment: stores.detail.getComment,

  login_state: stores.info.login_state,
}))
@observer
class Detail extends Component {
  componentWillMount = () => {
    let query = queryString.parse(this.props.location.search);
    window.scrollTo(0, 0);
    this.props.getRecipe(query.recipe);
    this.props.changeComp();
    this.props.getComment();
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
      setValue,
      handleOpen,

      checkjoa,
      Joayo,

      checkscr,
      Scrap,

      changeStep,
      step_state,
      step_slide,
      stepR,
      stepL,
      history,
      c_count,
      login_state,
    } = this.props;

    const useStyles = makeStyles((theme) => ({
      button: {
        margin: theme.spacing(1),
      },
    }));

    //주재료
    const main = ing_list.map((i, idx) => {
      return (
        <div key={idx} className="detailMainIngre">
          <span>{i.sort === "주재료" ? i.ingre_name : ""}</span>
          <span className="sub">{i.sort === "주재료" ? i.quantity : ""}</span>
        </div>
      );
    });

    //부재료
    const sub = ing_list.map((i, idx) => {
      return (
        <div key={idx} className="detailSubIngre">
          {i.sort === "부재료" ? i.ingre_name : ""}
          <span className="sub">{i.sort === "부재료" ? i.quantity : ""}</span>
        </div>
      );
    });

    //조리순서 기본
    const step1 = step_list.map((i, num) => {
      return (
        <div key={num}>
          <div className="stepnc">
            <div className="stepnum">{num + 1}</div>
            <div className="steptext">{i.content}</div>
            <br />
          </div>
          <div className="stepImgWrapper">
            <div className="centered">
              <img
                src={`http://13.124.83.195:8080/acorn/image/recipe/${i.photo}`}
                alt=""
                width="359px"
              />
            </div>
          </div>
        </div>
      );
    });
    //글만 - 1
    const step2 = step_list.map((i, num) => {
      return (
        <div key={num}>
          <div className="stepnc">
            <div className="stepnum">{num + 1}</div>
            <div className="steptext1">{i.content}</div>
          </div>
        </div>
      );
    });
    //슬라이더
    const step3 = () => {
      return (
        <div>
          <div className="stepslider">
            <div className="stepnc">
              <div className="stepnum">{step_slide + 1}</div>
              <div className="steptext">{step_list[step_slide].content}</div>
              <br />
              <div className="stepImgWrapper">
                <div className="centered">
                  <img
                    src={`http://13.124.83.195:8080/acorn/image/recipe/${step_list[step_slide].photo}`}
                    alt=""
                    width="359px"
                  />
                </div>
              </div>
            </div>
            <div className="stepsliderbtn">
              <KeyboardArrowLeft onClick={stepL} />
              &ensp;
              <KeyboardArrowRight onClick={stepR} />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        {/* Default */}
        {/* 썸네일 */}
        <div style={{ width: "100%", height: "270px" }}>
          <div className="detailThumbnail">
            <div className="centered">
              <img
                className="detailThumbnailImg"
                src={`http://13.124.83.195:8080/acorn/image/recipe/${all.repre_photo}`}
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
            }}
          >
            <center>
              <div className="detailProfileCenterWrapper">
                <div className="detailProfileCenter">
                  <div className="centered">
                    <Link to={`/mypage?nick=${all.nickname}`}>
                      <img
                        src={`http://13.124.83.195:8080/acorn/image/profile/${all.profile}`}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "10pt",
                  marginTop: "-30px",
                }}
              >
                <Link
                  to={`/mypage?nick=${all.nickname}`}
                  style={{ color: "#000000" }}
                >
                  {all.nickname}
                </Link>
              </p>

              {/* 요리 제목 */}
              <p id="detail_titletext">{all.subject}</p>

              {/* 요리 설명 */}
              <p>
                <img src="/img/quote1.png" alt="" width="16px" />
                <span id="detail_subtext">{all.summary}</span>
                <img src="/img/quote2.png" alt="" width="16px" />
              </p>

              {/* 카테고리 */}
              <div
                style={{
                  border: "1px solid #e2e1e1",
                  width: "60px",
                  padding: "8px 10px",
                  borderRadius: "20px",
                }}
              >
                {all.food_cate}
              </div>
              <br />

              {/* 난이도 등 */}
              <div className="ptdGroup">
                <div className="ptd">
                  <People className="texts" />
                  <br />
                  <span className="texts">{all.portion}</span>
                </div>
                <div className="ptd">
                  <Timer className="texts" />
                  <br />
                  <span className="texts">{all.time}</span>
                </div>
                <div className="ptd">
                  <Star className="texts" />
                  <br />
                  <span className="texts">{all.difficult}</span>
                </div>
              </div>

              {/* 공유/좋아요/스크랩/댓글 */}
              <div className="ptd2Group">
                <div
                  className="ptd2"
                  onClick={() => {
                    handleShare(all.rec_num);
                  }}
                >
                  <Share />
                  <br />
                  URL 복사
                </div>
                <div className="ptd2" onClick={Joayo}>
                  {checkjoa === 0 || !login_state ? (
                    <FavoriteBorderSharp />
                  ) : (
                    <FavoriteSharp style={{ color: "#db555a" }} />
                  )}
                  <br />
                  {checkjoa === 0 || !login_state ? "좋아요" : "좋아요 취소"}
                </div>
                <div className="ptd2" onClick={Scrap}>
                  {checkscr === 0 || !login_state ? (
                    <BookmarkBorderSharp />
                  ) : (
                    <Bookmark style={{ color: "#db555a" }} />
                  )}
                  <br />
                  {checkscr === 0 || !login_state ? "스크랩" : "스크랩 취소"}
                </div>
                <div className="ptd2" onClick={handleComment}>
                  <ChatBubbleOutline />
                  <br />
                  댓글 {c_count}개
                </div>
              </div>
            </center>
          </div>
          <hr className="detailLine" />
          <div style={{ width: "100%" }}>
            <p
              style={{ fontSize: "16pt", fontWeight: "500", marginLeft: "5px" }}
            >
              재료
              <span class="detailIngreTitleText">Ingredients</span>
            </p>
            <p className="detailMainTitle">[주재료]</p>
            {main}
            <br />
            <p className="detailMainTitle">[부재료]</p>
            {sub}
            <hr className="detailLine" />
            <p
              style={{ fontSize: "16pt", fontWeight: "500", marginLeft: "5px" }}
            >
              조리 순서
              <span class="detailIngreTitleText">Steps</span>
            </p>
            <div className="detailStepCate">
              <div
                className="category"
                onClick={() => {
                  //기본 0
                  changeStep(0);
                }}
              >
                <ViewList />
                <br />
              </div>
              <div
                className="category"
                onClick={() => {
                  //슬라이더 2번
                  changeStep(2);
                }}
              >
                <ViewCarousel />
                <br />
              </div>
              <div
                className="category"
                onClick={() => {
                  //글만 1번
                  changeStep(1);
                }}
              >
                <Subject />
                <br />
              </div>
            </div>
            <br />
            <br />
            <br />
            <div>
              {step_state === 0 ? step1 : step_state === 1 ? step2 : step3()}
            </div>

            <hr className="detailLine" />
            <div>
              <p
                style={{
                  fontSize: "16pt",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                완성 사진
                <span class="detailIngreTitleText">Finish</span>
              </p>

              <div className="stepImgWrapper">
                <div className="centered">
                  <img
                    src={`http://13.124.83.195:8080/acorn/image/recipe/${comp_img}`}
                    alt=""
                  />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <KeyboardArrowLeft onClick={sliderL} />
                &ensp;
                <Pause onClick={sliderP} />
                &ensp;
                <PlayArrow onClick={changeComp} />
                &ensp;
                <KeyboardArrowRight onClick={sliderR} />
              </div>
            </div>
            <br />
            <br />
            <p
              style={{ fontSize: "16pt", fontWeight: "500", marginLeft: "5px" }}
            >
              <img
                src="/img/star.png"
                alt=""
                width="35px"
                style={{ verticalAlign: "middle" }}
              />
              <span style={{ verticalAlign: "middle" }}>요리 Tip!</span>
            </p>
            <div id="tipBox">{all.tip}</div>
            <center style={{ margin: "50px 0 80px" }}>
              <Button
                onClick={() => {
                  history.goBack();
                }}
                variant="outlined"
                color="black"
                component="span"
                className={useStyles.button}
              >
                뒤로
              </Button>
            </center>
          </div>
        </div>
        {/* Default */}

        {/* 위로가기 */}
        <Link
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <ExpandLess
            style={{
              position: "fixed",
              left: "330px",
              top: "570px",
              width: "30px",
              height: "30px",
              border: "1px solid #575757",
              backgroundColor: "#ffffff",
              opacity: "0.8",
              color: "#000000",
            }}
          />
        </Link>
        <Link
          onClick={() => {
            window.scrollTo({ top: 5000, left: 0, behavior: "smooth" });
          }}
        >
          <ExpandMore
            style={{
              position: "fixed",
              left: "330px",
              top: "605px",
              width: "30px",
              height: "30px",
              border: "1px solid #575757",
              backgroundColor: "#ffffff",
              opacity: "0.8",
              color: "#000000",
            }}
          />
        </Link>

        {/* 공유모달 */}
        <div>
          <Dialog open={modal_open} onClose={handleShare}>
            <DialogTitle id="form-dialog-title">
              <span style={{ fontSize: "12pt" }}>URL 복사하기</span>
              <IconButton edge="end" onClick={handleShare} aria-label="close">
                <Close style={{ marginLeft: "130px", marginTop: "-10px" }} />
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
                <center>
                  <Button style={{ margin: "20px 0" }} variant="outlined">
                    복사
                  </Button>
                </center>
              </CopyToClipboard>
            </DialogContent>
          </Dialog>
        </div>
        {/* 공유모달 */}

        {/* 댓글모달 */}
        <Dialog fullScreen open={comment_open} onClose={handleComment}>
          <AppBar
            style={{
              height: "50px",
              width: "100%",
              backgroundColor: "#002060",
              marginLeft: "-84px",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                style={{ marginTop: "-5px" }}
              >
                <Close onClick={handleComment} />
                <BorderColor
                  onClick={() => {
                    if (login_state) {
                      setValue();
                      handleOpen();
                    }
                  }}
                  style={{ marginLeft: "295px" }}
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <br />
          <br />
          <DialogContent>
            <Comment />
          </DialogContent>
        </Dialog>
        {/* 댓글모달 */}
      </div>
    );
  }
}

export default Detail;
