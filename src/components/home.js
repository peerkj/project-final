import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, AppBar, Toolbar, Badge } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { Add, Close } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { inject, observer } from "mobx-react";
import { DialogContent } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  pot_food,
  deleteList,
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
  handleListFood
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    resetCount();
    changePot();
    setOpen(true);
    handleListFood();
  };

  const handleClose = () => {
    setOpen(false);
    stopPot();
  };
  const dropped = (e) => {
    e.containerElem.style.visibility = "hidden";
    addPotFood(e.dragData.idx);
    e_add(e);
    openPot();
    addCount();
  };

  const list = mylist.map((my) => {
    return (
      <DragDropContainer
        targetKey="foo"
        dragData={{ idx: my.key, food: my.food }}
      >
        <img src="/img/orange.png" alt="" />
        <br />
        <b>{my.food}</b>
      </DragDropContainer>
    );
  });
  const pot_list = e_store.map((e) => {
    return (
      <div>
        <b>{e.dragData.food}</b>
        <Close
          id="profileImg_delete"
          onClick={() => {
            select_delete(e);
          }}
        />
        <br />
      </div>
    );
  });

  return (
    <div>
      <div style={{
        width: "200px",
        overflow: "hidden",
        position: "absolute",
        left: "230px",
        top: "480px",
        cursor: "pointer"
      }}>
        <b onClick={handleClickOpen}>나의냉장고</b>
        <img
          src="/img/refrigerator.png"
          style={{
            width: "100px"
          }}
          onClick={handleClickOpen}
          alt=""
        />
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ backgroundImage: "url(/img/refrigerator.png)" }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
          {list}

          <DropTarget targetKey="foo" onHit={dropped}>
            <img
              style={{
                width: "200px",
                height: "200px",
                position: "absolute",
                left: "87px",
                top: "420px",
              }}
              src={pot}
              alt=""
              onClick={clickPot}
            />
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
              ></Badge>
            </div>
          </DropTarget>
          <button type="button" onClick={handleAddOpen}>
            추가
          </button>
        </div>
      </Dialog>

      <Dialog open={openpot} onClose={clickPot}>
        <DialogContent>
          <img
            src="/img/binpot.png"
            alt=""
            style={{ width: "280px", marginLeft: "-10px" }}
          />
          <br />
          {pot_list}
          <Button color="primary" variant="outlined" onClick={deleteList}>
            냄비비우기
          </Button>
          <Button color="primary" variant="outlined">
            요리하기
          </Button>
          <br />
        </DialogContent>
      </Dialog>

      <Dialog
        open={addopen}
        onClose={handleAddOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">냉장고 추가</DialogTitle>
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
          <Button onClick={handleAddFood} color="primary">
            확인
          </Button>
          <Button onClick={handleAddOpen} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default inject(({ drag }) => ({
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
  pot_food: drag.pot_food,
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
  handleListFood: drag.handleListFood
}))(observer(Home));
