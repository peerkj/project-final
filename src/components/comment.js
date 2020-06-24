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
    imgBase64: stores.comment.imgBase64,
    handleChangeImg: stores.comment.handleChangeImg,
    content: stores.comment.content,
    handleCommentChange: stores.comment.handleCommentChange,
    handleSubmit: stores.comment.handleSubmit,
}))
@observer
class comment extends Component {
    render() {
        const {
            modal_open,
            handleOpen,
            imgBase64,
            handleChangeImg,
            content,
            handleCommentChange,
            handleSubmit,
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
                                value={content}
                                onChange={handleCommentChange}
                            />
                            <div style={{ marginTop: "15px" }}>

                                <label htmlFor="comphoto">
                                    {imgBase64 ? (
                                        <img src={imgBase64} alt="" />
                                    ) : (
                                            <img
                                                width="100px"

                                                src="img/add_icon2.png"
                                                alt=""
                                            />
                                        )}
                                </label>
                            </div>
                            <input
                                style={{ display: "none" }}
                                accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
                                id="comphoto"
                                multiple
                                type="file"
                                onChange={handleChangeImg}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    handleSubmit();
                                }}
                                color="primary"
                            >
                                등록
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
