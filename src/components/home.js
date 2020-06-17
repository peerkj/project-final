import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, AppBar, Toolbar, Badge } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { inject, observer } from "mobx-react";
import { DialogContent } from "@material-ui/core";

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
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    resetCount();
    changePot();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    stopPot();
  };
  const dropped = (e) => {
    e.containerElem.style.visibility = "hidden";
    openPot();
    addCount();
  };
  return (
    <div>
      <img
        src="/img/refrigerator.png"
        style={{
          width: "100px",

          position: "absolute",
          left: "280px",
          top: "480px",
        }}
        onClick={handleClickOpen}
        alt=""
      />
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
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <hr />
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <hr />
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <DragDropContainer targetKey="foo">
            <img src="/img/orange.png" alt="" />
          </DragDropContainer>
          <hr />
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
                top: "420px",
              }}
            >
              <Badge
                className={useStyles.badge}
                badgeContent={count}
                color="secondary"
              ></Badge>
            </div>
          </DropTarget>
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
          <Button color="primary" variant="outlined">
            냄비비우기
          </Button>
          <Button color="primary" variant="outlined">
            요리하기
          </Button>
          <br />
        </DialogContent>
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
}))(observer(Home));
