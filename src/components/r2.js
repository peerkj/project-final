import React, { useEffect } from "react";
import useIntersect from "./useIntersect";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import {
  Button,
  Icon,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography, TextField, BottomNavigation, BottomNavigationAction, Menu, MenuItem
} from '@material-ui/core';
import { Search, Create, MoreVert, Restore, Bookmark, Pageview, FavoriteBorder, BookmarkBorder, ExpandLess } from '@material-ui/icons';
import "../css/styles.css";

const fakeFetch = (delay = 800) => new Promise((res) => setTimeout(res, delay));
// const ListItem = ({ number }) => (
//   <div className="ListItem">
//     <span>{number}</span>
//   </div>
// );
const R = ({
  list,
  state,
  getList,
  changeState,
  addState,
  history,
  updateList,
  setView,
}) => {
  //   // const [state, setState] = useState({ itemCount: 0, isLoading: false });
  //   /* fake async fetch */

  useEffect(() => {
    updateList();
  });

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

  //리스트 점 3개
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dothandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dothandleClose = () => {
    setAnchorEl(null);
  };

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
              <MoreVert aria-controls="simple-menu" aria-haspopup="true" onClick={dothandleClick} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={dothandleClose}
              >
                <MenuItem onClick={dothandleClose}>공유</MenuItem>
                <MenuItem onClick={dothandleClose}>수정</MenuItem>
                <MenuItem onClick={dothandleClose}>삭제</MenuItem>
              </Menu>
            </IconButton>
          }
          title={l.nickname}
          subheader={l.writeday.substring(0, 10)}
        />
        <Link
          key={l.rec_num}
          className="ListItem"
          to={`/detail?recipe=${l.rec_num}`}
          onClick={() => {
            setView(l.rec_num, idx);
          }}
        >
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{
                fontWeight: "400",
                fontSize: "10pt",
                float: "right",
                marginTop: "-30px"
              }}>조회 {l.readcount}</span>
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
                {l.subject}
              </center>
            </Typography>
          </CardContent>
          <CardActions disableSpacing style={{ float: "right" }}>
            <IconButton aria-label="share">
              <FavoriteBorder color="disabled" fontSize="small" />&nbsp;
              <span style={{ fontWeight: "600", fontSize: "12pt", color: "#ff6d75" }}>{l.joayo}</span>
							&ensp;
              <BookmarkBorder color="disabled" fontSize="small" />&nbsp;
							<span style={{ fontWeight: "600", fontSize: "12pt", color: "#ff6d75" }}>{l.scrap}</span>
							&nbsp;
            </IconButton>
          </CardActions>
        </Link>
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
          <Search width="40px"
            fontSize="large"
            style={{ verticalAlign: "middle" }} />
          <TextField id="outlined-basic" variant="outlined" size="small"
            style={{ verticalAlign: "middle" }} />


          {/* 리스트 분류,정렬 */}
          <div style={{ marginTop: "10px" }}>
            <BottomNavigation
              // value={value}
              // onChange={(event, newValue) => {
              // 	setValue(newValue);
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
        }}>
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
            color: "#000000"
          }}
        />
      </Link>
      <Link
        onClick={() => {
          history.push("/write");
        }}>
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
            fontSize: "10pt"
          }}
        />
      </Link>
    </div>
  );
};

export default inject(({ recipe }) => ({
  list: recipe.list,
  getList: recipe.getList,
  state: recipe.state,
  changeState: recipe.changeState,
  addState: recipe.addState,
  updateList: recipe.updateList,
  setView: recipe.setView,
}))(observer(R));
