import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
    Button,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
    modal_open: stores.comment.modal_open,
    handleOpen: stores.comment.handleOpen,
}))
@observer
class comment extends Component {
    render() {
        const {
            modal_open,
            handleOpen
        }
            = this.props;

        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <button onClick={handleOpen}>댓글쓰기</button>

                <div>
                    <Dialog
                        open={modal_open}
                        onClose={handleOpen}
                        aria-labelledby="form-dialog-title"
                        fullWidth
                    >
                        <DialogTitle id="form-dialog-title">댓글쓰기</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="outlined-basic"
                                placeholder="댓글을 입력하세요"
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button

                                color="primary"
                            >
                                확인
              </Button>
                            <Button onClick={handleOpen} color="primary">
                                취소
              </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default comment;
