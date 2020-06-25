import React, { useEffect } from "react";
import useIntersect from "./useIntersect";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Comment from "./comment";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import {
  Close,
  Search,
  Create,
  MoreVert,
  Restore,
  Bookmark,
  Pageview,
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  ExpandLess,
  ChatBubbleOutline,
} from "@material-ui/icons";
import "../css/styles.css";

const fakeFetch = (delay = 800) => new Promise((res) => setTimeout(res, delay));

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
}) => {
  //   // const [state, setState] = useState({ itemCount: 0, isLoading: false });
  //   /* fake async fetch */

  useEffect(() => {
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
  }));

  //리스트 박스
  const ListItem = list.slice(0, state.itemCount).map((l, idx) => {
    return (
      <Card className={useStyles.root} style={{ marginTop: "10px" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={useStyles.avatar}>
              <img
                width="40px"
                src={`http://localhost:9000/acorn/image/profile/${l.profile}`}
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
                  }}
                >
                  공유
                </MenuItem>
                {l.email === userEmail && (
                  <MenuItem onClick={dothandleClose}>수정</MenuItem>
                )}
                {l.email === userEmail && (
                  <MenuItem onClick={dothandleClose}>삭제</MenuItem>
                )}
              </Menu>
            </IconButton>
          }
          title={l.nickname}
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
                    src={`http://localhost:9000/acorn/image/recipe/${l.repre_photo}`}
                    alt=""
                  />
                </div>
              </div>
              <br />
              <center>
                <span style={{ fontSize: "12pt", fontWeight: "500", color: "#000000", marginLeft: "2px" }}>
                  {l.subject}
                </span>
              </center>
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing style={{ float: "right" }}>
          <IconButton aria-label="share">
            {check_j[idx] === 0 ? (
              <FavoriteBorder
                color="disabled"
                fontSize="small"
                onClick={() => {
                  Joayo(l.rec_num, idx);
                }}
              />
            ) : (
                <Favorite
                  color="secondary"
                  fontSize="small"
                  onClick={() => {
                    Joayo(l.rec_num, idx);
                  }}
                />
              )}
            <span
              style={{
                fontWeight: "600",
                fontSize: "12pt",
              }}
            >
              {l.joayo}
            </span>
            &ensp;
            {check_s[idx] === 0 ? (
              <BookmarkBorder
                color="disabled"
                fontSize="small"
                onClick={() => {
                  Scrap(l.rec_num, idx);
                }}
              />
            ) : (
                <Bookmark
                  color="secondary"
                  fontSize="small"
                  onClick={() => {
                    Scrap(l.rec_num, idx);
                  }}
                />
              )}
            <span
              style={{
                fontWeight: "600",
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
                fontWeight: "600",
                fontSize: "12pt"
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

  const fetchItems = async () => {
    changeState();
    getList();
    await fakeFetch();
    addState();
  };
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
        {/* 검색창 */}
        <center style={{ marginTop: "20px" }}>
          <Search
            width="40px"
            fontSize="large"
            style={{ verticalAlign: "middle" }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onKeyDown={handleEnter}
            value={search}
            onChange={onchangeSearch}
            style={{ verticalAlign: "middle" }}
          />

          {/* 리스트 분류,정렬 */}
          <div style={{ marginTop: "10px" }}>
            <BottomNavigation
              // value={value}
              // onChange={(event, newValue) => {
              //    setValue(newValue);
              // }}
              showLabels
              style={{ width: "150px" }}
            >
              <BottomNavigationAction label="최신순" icon={<Restore />} />
              <BottomNavigationAction label="스크랩순" icon={<Bookmark />} />
              <BottomNavigationAction label="조회순" icon={<Pageview />} />
            </BottomNavigation>
          </div>
        </center>
      </div>

      {/* 리스트*/}
      {ListItem}

      {/* 로딩 */}
      <center>
        <div ref={setRef} className="Loading">
          {state.isLoading && "Loading..."}
        </div>
      </center>

      {/* 위로 가기, 글쓰기 버튼 */}
      <Link
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ExpandLess
          style={{
            position: "fixed",
            left: "290px",
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
      <Link
        onClick={() => {
          history.push("/write");
        }}
      >
        <Create
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
            fontSize: "10pt",
          }}
        />
      </Link>
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

export default inject(({ recipe, detail, info }) => ({
  list: recipe.list,
  getList: recipe.getList,
  state: recipe.state,
  changeState: recipe.changeState,
  addState: recipe.addState,
  updateList: recipe.updateList,
  setView: recipe.setView,
  modal_open: detail.modal_open,
  url: detail.url,
  onCopy: detail.onCopy,
  handleShare: detail.handleShare,
  anchorEl: recipe.anchorEl,
  dothandleClick: recipe.dothandleClick,
  dothandleClose: recipe.dothandleClose,
  check_j: recipe.check_j,
  check_s: recipe.check_s,
  Joayo: recipe.Joayo,
  Scrap: recipe.Scrap,
  userEmail: info.userEmail,
  comment_count: recipe.comment_count,

  comment_open: detail.comment_open,
  handleComment: detail.handleComment,
  setRec_num: detail.setRec_num,

  onchangeSearch: recipe.onchangeSearch,
  search: recipe.search,
  handleEnter: recipe.handleEnter,
}))(observer(R));
