import React, { useEffect } from "react";
import useIntersect from "./useIntersect";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Comment from "./comment";
import queryString from "query-string";
import "../css/mypage.css";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  CircularProgress,
  DialogActions,
} from "@material-ui/core";
import {
  Close,
  MoreVert,
  Bookmark,
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  ExpandLess,
  ChatBubbleOutline,
  ListAlt,
} from "@material-ui/icons";
import "../css/styles.css";

const R = ({
  list,
  state,
  getList,
  changeState,
  addState,
  history,
  updateList,
  setView,
  modal_open,
  url,
  onCopy,
  handleShare,
  anchorEl,
  dothandleClick,
  dothandleClose,
  check_j,
  check_s,
  Scrap,
  Joayo,
  userEmail,
  comment_count,
  comment_open,
  handleComment,
  setRec_num,
  onchangeSearch,
  search,
  handleEnter,
  list_count,
  nickname,
  profile_name,
  sw,
  setSw,
  getList_scrap,
  fakeFetch,
  fetchItems,
  checkList,
  location,
  setNickname,
  mypage,
  login_state,
  checkn,
  checkNews,
  onNews,
  offNews,
  updateform,

  rd,
  rdo,
  deleteRecipe,
}) => {
  //   // const [state, setState] = useState({ itemCount: 0, isLoading: false });
  //   /* fake async fetch */

  useEffect(() => {
    let query = queryString.parse(location.search);
    if (query.nick === undefined) {
      history.push("/");
    }
    setNickname(query.nick, history);
    updateList();
  }, []);

  //리스트 박스 디자인 관련
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    load: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  //리스트 박스
  const ListItem = list.map((l, idx) => {
    return (
      <Card className={useStyles.root} style={{ marginTop: "10px" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={useStyles.avatar}>
              <img
                width="40px"
                src={`http://3.128.62.155:8080/Team5Spring/image/profile/${
                  sw === 0 ? mypage.profile : l.profile
                }`}
                alt=""
              />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {/* 점 3개 */}
              <MoreVert
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(e) => {
                  dothandleClick(e, idx);
                }}
              />
              <Menu
                id={`simple-menu-${idx}`}
                anchorEl={anchorEl[idx]}
                keepMounted
                open={Boolean(anchorEl[idx])}
                onClose={() => {
                  dothandleClose(idx);
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleShare(l.rec_num);
                    dothandleClose(idx);
                  }}
                >
                  공유
                </MenuItem>
                {l.email === userEmail && (
                  <MenuItem
                    onClick={() => {
                      updateform(l.rec_num, history);
                      dothandleClose(idx);
                    }}
                  >
                    수정
                  </MenuItem>
                )}
                {l.email === userEmail && (
                  <MenuItem
                    onClick={() => {
                      rdo(l.rec_num);
                      dothandleClose(idx);
                    }}
                  >
                    삭제
                  </MenuItem>
                )}
              </Menu>
            </IconButton>
          }
          title={sw === 0 ? mypage.nickname : l.nickname}
          subheader={l.timeDiffer}
        />
        <Link
          key={l.rec_num}
          className="ListItem"
          to={`/recipe/detail?recipe=${l.rec_num}`}
          onClick={() => {
            setView(l.rec_num, idx);
          }}
        >
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "10pt",
                  float: "right",
                  marginTop: "-30px",
                }}
              >
                조회 {l.readcount}
              </span>
              <div className="r2listThumbnail">
                <div className="centered">
                  <img
                    className="r2listImg"
                    src={`http://3.128.62.155:8080/Team5Spring/image/recipe/${l.repre_photo}`}
                    alt=""
                  />
                </div>
              </div>
              <br />
              <center>
                <span className="recipeSubject">{l.subject}</span>
              </center>
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing style={{ float: "right" }}>
          <IconButton aria-label="share">
            {check_j[idx] === 0 || !login_state ? (
              <FavoriteBorder
                color="disabled"
                fontSize="small"
                onClick={() => {
                  Joayo(l.rec_num, idx);
                }}
              />
            ) : (
              <Favorite
                style={{ color: "#db555a" }}
                fontSize="small"
                onClick={() => {
                  Joayo(l.rec_num, idx);
                }}
              />
            )}
            <span
              style={{
                fontWeight: "500",
                fontSize: "12pt",
              }}
            >
              {l.joayo}
            </span>
            &ensp;
            {check_s[idx] === 0 || !login_state ? (
              <BookmarkBorder
                color="disabled"
                fontSize="small"
                onClick={() => {
                  Scrap(l.rec_num, idx);
                }}
              />
            ) : (
              <Bookmark
                style={{ color: "#db555a" }}
                fontSize="small"
                onClick={() => {
                  Scrap(l.rec_num, idx);
                }}
              />
            )}
            <span
              style={{
                fontWeight: "500",
                fontSize: "12pt",
              }}
            >
              {l.scrap}
            </span>
            &ensp;
            <ChatBubbleOutline
              onClick={() => {
                setRec_num(l.rec_num);
                setView(l.rec_num, idx);
                handleComment();
              }}
              color="disabled"
              fontSize="small"
            />
            <span
              style={{
                fontWeight: "500",
                fontSize: "12pt",
              }}
            >
              {comment_count[idx]}
            </span>
            &nbsp;
          </IconButton>
        </CardActions>
      </Card>
    );
  });

  /* initial fetch */

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  //if (state1.itemCount) return null;

  return (
    <div className="RecipeApp">
      <div style={{ marginBottom: "15px" }}>
        <center style={{ marginTop: "20px" }}>
          <div className="mypageProfileBox">
            {/* 닉네임 출력 */}
            <span className="mypageTitle">{mypage.nickname}</span>
            <br />
            {/* 프로필 사진 */}
            <div className="mypageCenterWrapper">
              <div className="mypageCenter">
                <div className="centered">
                  <img
                    src={`http://3.128.62.155:8080/Team5Spring/image/profile/${
                      mypage.profile === "basic_user.png"
                        ? "basic_user2.png"
                        : mypage.profile
                    }`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* 팔로우 */}
            {checkn === 0 && mypage.email !== userEmail && (
              <div className="mypageFollowbtn" onClick={onNews}>
                Follow
              </div>
            )}
            {checkn === 1 && mypage.email !== userEmail && (
              <div className="mypageUnfollowbtn" onClick={offNews}>
                Unfollow
              </div>
            )}
          </div>
        </center>

        {/* 리스트 분류,정렬 */}
        <center>
          <div className="chefpageStepCate">
            <div
              className="category"
              onClick={() => {
                //내가쓴글
                setSw(0);
              }}
            >
              {sw === 0 ? (
                <ListAlt fontSize="small" style={{ color: "#002060" }} />
              ) : (
                <ListAlt fontSize="small" style={{ color: "#d0d6e1" }} />
              )}
              <br />
              <span className="cate_text">
                {mypage.email === userEmail ? "나" : "셰프"}의 레시피
              </span>
              <br />
            </div>
            <div
              className="category"
              onClick={() => {
                //스크랩
                setSw(1);
              }}
            >
              {sw === 1 ? (
                <Bookmark fontSize="small" style={{ color: "#002060" }} />
              ) : (
                <Bookmark fontSize="small" style={{ color: "#d0d6e1" }} />
              )}
              <br />
              <span className="cate_text">스크랩</span>
              <br />
            </div>
          </div>
        </center>
      </div>

      {/* 리스트*/}
      {ListItem}

      <center>
        {!checkList && (
          <div ref={setRef} className="Loading">
            <div className={useStyles.load}>
              {state.isLoading && (
                <CircularProgress style={{ color: "#bdbdbd" }} />
              )}
            </div>
          </div>
        )}
        {list_count === 0 && (
          <div
            style={{ marginTop: "70px", fontSize: "20px", fontWeight: "500" }}
          >
            <span>글이 없습니다</span>
          </div>
        )}
      </center>

      {/* 위로 가기, 글쓰기 버튼 */}
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <ExpandLess
          style={{
            position: "fixed",
            left: "330px",
            top: "610px",
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

      <Dialog open={rd} onClose={rdo} aria-labelledby="form-dialog-title">
        <DialogContent>삭제하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={rdo} style={{ color: "#002060" }}>
            취소
          </Button>
          <Button
            onClick={() => {
              deleteRecipe();
            }}
            style={{ color: "#002060" }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 댓글모달 */}
      <Dialog open={comment_open} onClose={handleComment}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleComment}
          aria-label="close"
        >
          <Close />
        </IconButton>

        <br />
        <br />
        <DialogContent>
          <Comment />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default inject(({ mypage, detail, info, recipeupdate }) => ({
  list: mypage.list,
  getList: mypage.getList,
  state: mypage.state,
  changeState: mypage.changeState,
  addState: mypage.addState,
  updateList: mypage.updateList,
  setView: mypage.setView,
  modal_open: detail.modal_open,
  url: detail.url,
  onCopy: detail.onCopy,
  handleShare: detail.handleShare,
  anchorEl: mypage.anchorEl,
  dothandleClick: mypage.dothandleClick,
  dothandleClose: mypage.dothandleClose,
  check_j: mypage.check_j,
  check_s: mypage.check_s,
  Joayo: mypage.Joayo,
  Scrap: mypage.Scrap,
  userEmail: info.userEmail,
  nickname: info.nickname,
  profile_name: info.profile_name,

  comment_count: mypage.comment_count,

  comment_open: detail.comment_open,
  handleComment: detail.handleComment,
  setRec_num: detail.setRec_num,

  onchangeSearch: mypage.onchangeSearch,
  search: mypage.search,
  handleEnter: mypage.handleEnter,
  list_count: mypage.list_count,
  sw: mypage.sw,
  setSw: mypage.setSw,
  getList_scrap: mypage.getList_scrap,
  fetchItems: mypage.fetchItems,
  fakeFetch: mypage.fakeFetch,
  checkList: mypage.checkList,

  setNickname: mypage.setNickname,
  mypage: mypage.mypage,
  login_state: info.login_state,

  checkn: mypage.checkn,
  checkNews: mypage.checkNews,
  onNews: mypage.onNews,
  offNews: mypage.offNews,
  updateform: recipeupdate.updateform,
  rd: mypage.rd,
  rdo: mypage.rdo,
  deleteRecipe: mypage.deleteRecipe,
}))(observer(R));
