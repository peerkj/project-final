import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Badge,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  IconButton,
  InputAdornment,
  FormControl,
  Input,
  Typography,
  CardContent,
  CardHeader,
  Avatar,
  Card,
} from "@material-ui/core";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import {
  Close,
  AddCircle,
  ThumbUp,
  RestaurantMenu,
  DeleteOutline,
  Search,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import "../css/home.css";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  badge: {
    height: "40px",
    minWidth: "40px",
    borderRadius: "40px",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Home = ({
  count,
  addCount,
  resetCount,
  openpot,
  clickPot,
  pot,
  changePot,
  openPot,
  stopPot,
  mylist,
  addPotFood,

  deleteList,
  c,
  e_add,
  e_store,
  select_delete,
  addopen,
  handleAddFood,
  handleAddOpen,
  available_addfood,
  addFood,
  onChangeFood,
  handleEnter,
  handleListFood,
  refri_delete,
  handleCook,
  handleRecipe,
  refir,
  handle_style,
  r_open,
  r_close,
  refir_style,
  binpot,
  handleKeyPress,
  onchangeSearch_home,
  search_home,
  handleEnter_home,
  history,
  login_state,
  open_recipe,
  openRecipe,
  //추천 레시피 리스트
  recipe_list,
  stepR,
  stepL,
  recipe_index,
  ing_list,
  sw,
  main_ing,
  sub_ing,
  //handleSearchRecipe
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    resetCount();
    r_open();
    setOpen(true);
    handleListFood();
  };

  const handleClose = () => {
    setOpen(false);
    r_close();
  };
  const dropped = (e) => {
    e.containerElem.style.visibility = "hidden";
    addPotFood(e.dragData.idx);
    e_add(e);
    openPot();
    addCount();
  };

  const list = mylist.map((my, idx) => {
    return (
      <DragDropContainer
        key={my.refrig_num}
        targetKey="foo"
        dragData={{ idx: idx, key: my.refrig_num, food: my.refrig_name }}
      >
        <img
          src="/img/pot/dish.png"
          alt=""
          width="100px"
          style={{ marginTop: "-35px" }}
        />
        <center>
          <span
            style={{
              position: "relative",
              top: "-63px",
            }}
          >
            {my.refrig_name}
          </span>
        </center>
        <Close
          id="homeRef_delete"
          onClick={() => {
            refri_delete(my.refrig_num);
          }}
        />
      </DragDropContainer>
    );
  });
  const pot_list = e_store.map((e) => {
    return (
      <div key={e.dragData.key} style={{}}>
        <span style={{ fontSize: "10pt", fontWeight: "400" }}>
          {e.dragData.food}
        </span>
        <Close
          id="profileImg_delete"
          onClick={() => {
            select_delete(e);
          }}
          style={{
            position: "relative",
            top: "-1px",
            left: "1px",
            fontSize: "12pt",
          }}
        />
      </div>
    );
  });

  //주재료
  const main = main_ing[recipe_index].map((i, idx) => {
    return (
      <div key={idx} className="detailMainIngre">
        <span>
          {i.check === 1 ? (
            <span style={{ color: "#dc1523", fontWeight: "500" }}>
              {i.ingre_name}
            </span>
          ) : (
            i.ingre_name
          )}
        </span>
        <span className="sub">
          {i.check === 1 ? (
            <span style={{ color: "#dc1523", fontWeight: "500" }}>
              {i.quantity}
            </span>
          ) : (
            i.quantity
          )}
        </span>
      </div>
    );
  });

  //부재료
  const sub = sub_ing[recipe_index].map((i, idx) => {
    return (
      <div key={idx} className="detailMainIngre">
        <span>
          {i.check === 1 ? (
            <span style={{ color: "#dc1523", fontWeight: "500" }}>
              {i.ingre_name}
            </span>
          ) : (
            i.ingre_name
          )}
        </span>
        <span className="sub">
          {i.check === 1 ? (
            <span style={{ color: "#dc1523", fontWeight: "500" }}>
              {i.quantity}
            </span>
          ) : (
            i.quantity
          )}
        </span>
      </div>
    );
  });

  return (
    <div width="375px">
      <center>
        <FormControl className={classes.margin} style={{ marginTop: "70px" }}>
          <Input
            onKeyDown={(e) => {
              handleEnter_home(e, history);
            }}
            value={search_home}
            onChange={onchangeSearch_home}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            placeholder="재료 검색:#재료"
          />
        </FormControl>
        <br />
        <img
          src="/img/refrigerator.png"
          style={{
            width: "200px",
            marginTop: "80px",
          }}
          onClick={() => {
            if (login_state) handleClickOpen();
            else {
              alert("로그인 후 이용하세요");
              history.push("/login");
            }
          }}
          alt=""
        />
        <br />
      </center>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
          style={{ height: "50px", backgroundColor: "#002060" }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <Close style={{ color: "#ffffff", marginTop: "-5px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
          <br />
          <div style={{ width: "375px" }}>
            <center>
              <div className={handle_style}>
                <Button
                  onClick={handleRecipe}
                  size="small"
                  startIcon={<ThumbUp />}
                  variant="outlined"
                >
                  추천 레시피 보기
                </Button>
                <br />
                <br />
                <div onClick={handleAddOpen}>
                  <AddCircle style={{ fontSize: "10pt" }} />
                  <span>재료 추가</span>
                </div>
              </div>
              <img
                className={refir_style}
                src={refir}
                alt=""
                width="530"
                style={{ marginLeft: "-77px" }}
              />
              <div className={handle_style} width="330">
                <img src="img/refview2.png" alt="" width="330" />
                <div
                  style={{
                    position: "absolute",
                    top: "175px",
                    left: "0px",
                    width: "370px",
                    height: "300px",
                  }}
                >
                  {list}
                </div>
              </div>
            </center>
          </div>
          <DropTarget targetKey="foo" onHit={dropped}>
            <div className={handle_style}>
              <center style={{ width: "375px" }}>
                <span>재료를 드래그하여 냄비에 넣어 주세요.</span>
                <br />
                <img
                  style={{
                    width: "150px",
                  }}
                  src={pot}
                  alt=""
                  onClick={clickPot}
                />
              </center>
            </div>
            <div
              style={{
                position: "absolute",
                left: "275px",
                top: "422px",
              }}
            >
              <Badge
                className={useStyles.badge}
                badgeContent={count}
                color="secondary"
                style={{ top: "85px", left: "-10px" }}
              ></Badge>
            </div>
          </DropTarget>
        </div>
      </Dialog>

      <Dialog
        open={binpot}
        onClose={clickPot}
        style={{ position: "absolute", top: "35px", left: "7px" }}
      >
        <DialogContent>
          <Close onClick={clickPot} style={{ float: "right" }} />
          <br />
          <center>
            <img src="img/pot/boiledpot.gif" alt="" width="250px" />
            <br />
            <div
              style={{
                width: "200px",
                height: "180px",
                border: "1px solid #c5c5c5",
                borderRadius: "10px",
                marginBottom: "10px",
                padding: "1px",
              }}
            >
              {pot_list}
            </div>
            <Button
              size="small"
              variant="outlined"
              onClick={deleteList}
              startIcon={<DeleteOutline />}
            >
              비우기
            </Button>
            &ensp;
            <Button
              size="small"
              variant="outlined"
              startIcon={<RestaurantMenu />}
              onClick={handleCook}
            >
              요리하기
            </Button>
          </center>
          <br />
        </DialogContent>
      </Dialog>

      <Dialog
        open={addopen}
        onClose={handleAddOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">냉장고 재료 추가</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="재료 입력"
            type="test"
            fullWidth
            autoFocus
            onKeyPress={handleEnter}
            value={addFood}
            onChange={onChangeFood}
            error={!(addFood === "") ^ available_addfood}
            helperText={
              available_addfood || addFood === "" ? "" : "한글 1~10자"
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddOpen} color="primary">
            취소
          </Button>
          <Button onClick={handleAddFood} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>

      {/*추천 레시피 리스트 */}
      <Dialog
        fullScreen
        open={open_recipe}
        onClose={openRecipe}
        // TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
          style={{ height: "50px", backgroundColor: "#002060" }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={openRecipe} aria-label="close">
              <Close style={{ color: "#ffffff", marginTop: "-5px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
          <center>
            <br />
            <span
              style={{
                fontSize: "12pt",
                fontWeight: "500",
              }}
            >
              [ 총 {recipe_list.length}개의 레시피 추천 ]
            </span>
            <br />
            <br />
            <KeyboardArrowLeft
              onClick={stepL}
              fontSize="large"
              style={{
                border: "1px solid #dcdcdc",
                borderRadius: "20px",
              }}
            />
            &ensp;
            <KeyboardArrowRight
              onClick={stepR}
              fontSize="large"
              style={{
                border: "1px solid #dcdcdc",
                borderRadius: "20px",
              }}
            />
          </center>
          <Card className={useStyles.root} style={{ marginTop: "5px" }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={useStyles.avatar}>
                  <Link
                    to={`/mypage?nick=${recipe_list[recipe_index].nickname}`}
                  >
                    <img
                      width="40px"
                      src={`http://13.124.83.195:8080/acorn/image/profile/${recipe_list[recipe_index].profile}`}
                      alt=""
                    />
                  </Link>
                </Avatar>
              }
              title={
                <Link
                  to={`/mypage?nick=${recipe_list[recipe_index].nickname}`}
                  style={{ color: "#000000" }}
                >
                  {recipe_list[recipe_index].nickname}
                </Link>
              }
              subheader={recipe_list[recipe_index].timeDiffer}
            />
            <Link
              className="ListItem"
              to={`/recipe/detail?recipe=${recipe_list[recipe_index].rec_num}`}
            >
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <div className="r2listThumbnail2">
                    <div className="centered">
                      <img
                        className="r2listImg"
                        src={`http://13.124.83.195:8080/acorn/image/recipe/${recipe_list[recipe_index].repre_photo}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <br />
                  <center>
                    <span className="recipeSubject">
                      {recipe_list[recipe_index].subject}
                    </span>
                  </center>
                </Typography>
              </CardContent>
            </Link>
          </Card>
          <br />
          <p
            style={{ fontSize: "16pt", fontWeight: "600", marginLeft: "10px" }}
          >
            재료
            <span class="detailIngreTitleText">Ingredients</span>
          </p>
          <p
            style={{ fontWeight: "300", marginLeft: "10px", color: "#959595" }}
          >
            일치하는 재료&nbsp;
            <span style={{ color: "#dc1523" }}>■</span>색으로 표시
          </p>
          <div>
            <p className="detailMainTitle">[주재료]</p>
            {main}
            <br />
            <p className="detailMainTitle">[부재료]</p>
            {sub}
          </div>
          <br />
          <br />
        </div>
      </Dialog>
    </div>
  );
};
export default inject(({ drag, recipe, info }) => ({
  count: drag.count,
  resetCount: drag.resetCount,
  addCount: drag.addCount,
  openpot: drag.open,
  clickPot: drag.clickPot,
  pot: drag.pot,
  changePot: drag.changePot,
  openPot: drag.openPot,
  stopPot: drag.stopPot,
  mylist: drag.mylist,
  addPotFood: drag.addPotFood,
  deleteList: drag.deleteList,
  e_add: drag.e_add,
  select_delete: drag.select_delete,
  e_store: drag.e_store,
  addopen: drag.addopen,
  handleAddFood: drag.handleAddFood,
  handleAddOpen: drag.handleAddOpen,
  available_addfood: drag.available_addfood,
  addFood: drag.addFood,
  onChangeFood: drag.onChangeFood,
  handleEnter: drag.handleEnter,
  handleListFood: drag.handleListFood,
  refri_delete: drag.refri_delete,
  handleCook: drag.handleCook,
  handleRecipe: drag.handleRecipe,
  r_open: drag.r_open,
  r_close: drag.r_close,
  handle_style: drag.handle_style,
  refir: drag.refir,
  refir_style: drag.refir_style,
  binpot: drag.binpot,
  handleKeyPress: drag.handleKeyPress,
  //handleSearchRecipe: drag, handleSearchRecipe
  onchangeSearch_home: recipe.onchangeSearch,
  search_home: recipe.search,
  handleEnter_home: recipe.handleEnter,

  login_state: info.login_state,
  openRecipe: drag.openRecipe,
  open_recipe: drag.open_recipe,
  recipe_list: drag.recipe_list,
  stepR: drag.stepR,
  stepL: drag.stepL,
  recipe_index: drag.recipe_index,
  ing_list: drag.ing_list,
  sw: drag.sw,
  main_ing: drag.main_ing,
  sub_ing: drag.sub_ing,
}))(observer(Home));
