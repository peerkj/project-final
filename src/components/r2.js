import React, { useEffect } from "react";
import useIntersect from "./useIntersect";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography, TextField, BottomNavigation, BottomNavigationAction
} from '@material-ui/core';
import { MoreVert, BookmarkBorder, Restore, Bookmark, Pageview } from '@material-ui/icons';
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

  const ListItem = list.slice(0, state.itemCount).map((l, idx) => {
    return (
      <Link
        key={l.rec_num}
        className="ListItem"
        to={`/detail?recipe=${l.rec_num}`}
        onClick={() => {
          setView(l.rec_num, idx);
        }}
      >
        <Card className={useStyles.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={useStyles.avatar}>

              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={l.subject}
            subheader={l.writeday.substring(0, 10)}
          />
          <img
            width="35px"
            src={`http://localhost:9000/acorn/image/profile/${l.profile}`}
            alt=""
          />


          <br />
          {l.nickname}
           조회수{l.readcount}
          <img
            width="100px"
            src={`http://localhost:9000/acorn/image/recipe/${l.repre_photo}`}
            alt=""
          />
        조아용{l.joayo} 스크랩수{l.scrap}
        </Card>
      </Link>

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
      <div>
        <img src="/img/magnifying.png" alt="" width="40px" />
        <TextField id="outlined-basic" variant="outlined" size="small" />
        <BottomNavigation
          // value={value}
          // onChange={(event, newValue) => {
          // 	setValue(newValue);
          // }}
          showLabels
        >
          <BottomNavigationAction label="최신순" icon={<Restore />} />
          <BottomNavigationAction label="스크랩순" icon={<Bookmark />} />
          <BottomNavigationAction label="조회순" icon={<Pageview />} />
        </BottomNavigation>
      </div>
      <button
        style={{ position: "fixed", left: "250px", top: "600px" }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        TOP
      </button>
      <button
        style={{ position: "fixed", left: "300px", top: "600px" }}
        onClick={() => {
          history.push("/write");
        }}
      >
        글쓰기
      </button>
      {ListItem}
      <div ref={setRef} className="Loading">
        {state.isLoading && "Loading..."}
      </div>
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
