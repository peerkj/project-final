import React, { useEffect } from "react";
import useIntersect from "./useIntersect";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Comment from "./comment";
import "../css/detail.css";

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
  DialogActions,
  CircularProgress,
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
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import "../css/styles.css";

const fakeFetch = (delay = 1500) =>
  new Promise((res) => setTimeout(res, delay));

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
  delete_open,
  deleteOpen,
  deleteRecipe,
  checkList,
  list_count,
  resetRecipe,
  setFood_cate,
  setSort,
  sort,
  login_state,

  cate_list,
  cate_index,
  cateR,
  cateL,

  updateform,
  rd,
  rdo,
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
    load: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  //카테고리 검색
  const FoodList = cate_list[cate_index].map((f, i) => {
    return (
      <img
        src={`/img/foodcate/food_${cate_index}_${i}.png`}
        width="70px"
        alt=""
        style={{ verticalAlign: "middle" }}
        onClick={() => {
          setFood_cate(f);
        }}
      />
    );
  });

  //리스트 박스
  const ListItem = list.map((l, idx) => {
    return (
      <Card
        key={l.rec_num}
        className={useStyles.root}
        style={{ marginTop: "10px" }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={useStyles.avatar}>
              <Link to={`/mypage?nick=${l.nickname}`}>
                <img
                  width="40px"
                  src={`http://18.221.230.63:8080/acorn/image/profile/${l.profile}`}
                  alt=""
                />
              </Link>
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
                    handleShare(l.rec_num, history);
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
          title={
            <Link
              to={`/mypage?nick=${l.nickname}`}
              style={{ color: "#000000" }}
            >
              {l.nickname}
            </Link>
          }
          subheader={l.timeDiffer}
        />
        <Link
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
                    src={`http://18.221.230.63:8080/acorn/image/recipe/${l.repre_photo}`}
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
          &nbsp;
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onKeyDown={handleEnter}
            value={search}
            onChange={onchangeSearch}
            style={{ verticalAlign: "middle" }}
          />
          <center style={{ marginTop: "30px" }}>
            <KeyboardArrowLeft
              onClick={cateL}
              fontSize="large"
              style={{ verticalAlign: "middle" }}
            />
            {FoodList}
            <KeyboardArrowRight
              onClick={cateR}
              fontSize="large"
              style={{ verticalAlign: "middle" }}
            />
          </center>
          <br />
          {/* 리스트 분류,정렬 */}
          <div className="recipeStepCate">
            <div
              className="category"
              onClick={() => {
                //최신순
                setSort("");
              }}
            >
              {sort === "" ? (
                <Restore fontSize="small" style={{ color: "#002060" }} />
              ) : (
                <Restore fontSize="small" style={{ color: "#d0d6e1" }} />
              )}
              <br />
              <span className="cate_text" style={{ color: "#000000" }}>
                최신순
              </span>
              <br />
            </div>
            <div
              className="category"
              onClick={() => {
                //스크랩순
                setSort("scrap");
              }}
            >
              {sort === "scrap" ? (
                <Bookmark fontSize="small" style={{ color: "#002060" }} />
              ) : (
                <Bookmark fontSize="small" style={{ color: "#d0d6e1" }} />
              )}
              <br />
              <span className="cate_text" style={{ color: "#000000" }}>
                스크랩순
              </span>
              <br />
            </div>
            <div
              className="category"
              onClick={() => {
                //조회순
                setSort("readcount");
              }}
            >
              {sort === "readcount" ? (
                <Pageview fontSize="small" style={{ color: "#002060" }} />
              ) : (
                <Pageview fontSize="small" style={{ color: "#d0d6e1" }} />
              )}
              <br />
              <span className="cate_text" style={{ color: "#000000" }}>
                조회순
              </span>
              <br />
            </div>
          </div>
        </center>
      </div>
      <br />
      <br />

      {/* 리스트*/}
      {ListItem}

      {/* 로딩 */}

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
            style={{
              marginTop: "130px",
              fontSize: "20px",
              fontWeight: "500",
              width: "175px",
            }}
          >
            <span>검색 결과가 없습니다</span>
          </div>
        )}
      </center>

      {/* 위로 가기, 글쓰기 버튼 */}
      <Link
        onClick={() => {
          history.push("/write");
        }}
      >
        <Create
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
            fontSize: "10pt",
          }}
        />
      </Link>
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

      {/* 레시피 삭제모달 */}
      <Dialog open={comment_open} onClose={handleComment}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleComment}
          aria-label="close"
        >
          <Close style={{ marginLeft: "12px" }} />
        </IconButton>

        <br />
        <br />
        <DialogContent style={{ width: "270px" }}>
          <Comment />
        </DialogContent>
      </Dialog>
      <div>
        <Dialog open={rd} onClose={rdo} aria-labelledby="form-dialog-title">
          <DialogContent>삭제하시겠습니까?</DialogContent>
          <DialogActions>
            <Button onClick={rdo} color="primary">
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
      </div>
    </div>
  );
};

export default inject(({ recipe, detail, info, recipeupdate }) => ({
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

  checkList: recipe.checkList,
  list_count: recipe.list_count,
  resetRecipe: recipe.resetRecipe,
  setFood_cate: recipe.setFood_cate,
  setSort: recipe.setSort,
  login_state: info.login_state,

  cate_list: recipe.cate_list,
  cate_index: recipe.cate_index,
  cateR: recipe.cateR,
  cateL: recipe.cateL,
  sort: recipe.sort,
  updateform: recipeupdate.updateform,

  rd: recipe.rd,
  rdo: recipe.rdo,
  deleteRecipe: recipe.deleteRecipe,
}))(observer(R));
