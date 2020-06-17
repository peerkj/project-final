import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  modal_open: stores.findPass.modal_open,
  handleOpen: stores.findPass.handleOpen,
}))
@observer
class AlertDialog extends Component {
  render() {
    const { modal_open, handleOpen } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={modal_open}
          onClose={handleOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen} color="primary">
              Disagree
            </Button>
            <Button onClick={handleOpen} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
