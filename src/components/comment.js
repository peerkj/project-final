import React, { Component } from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { inject, observer } from "mobx-react";
import {
    Button,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

@inject((stores) => ({
    getList: stores.comment.getList,
    comment_list: stores.comment.comment_list,
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
    componentDidMount = () => {
        this.props.getList();
    };

    render() {
        const {
            getList,
            comment_list,

            modal_open,
            handleOpen,
            imgBase64,
            handleChangeImg,
            content,
            handleCommentChange,
            handleSubmit,
        } = this.props;
        const dropped = (e) => {
            //e.containerElem.style.visibility = "hidden";
            getList();
        };

        const comment = comment_list.map((c, idx) => {
            return (
                <div style={{ border: "1px solid gray" }} key={idx}>
                    <b>{c.com_writeday}</b>
                    <br />
                    <b>{c.content}</b>
                </div>
            );
        });

        return (
            <div>
                <br />
                <DropTarget targetKey="foo" onHit={dropped}>
                    <div
                        style={{
                            border: "1px solid gray",
                            width: "357px",
                        }}
                    >
                        <button onClick={handleOpen}>댓글쓰기</button>

                        {comment}
                    </div>
                </DropTarget>
                <DragDropContainer targetKey="foo">
                    <div
                        style={{
                            border: "1px solid gray",
                            width: "357px",
                            height: "50px",
                        }}
                    >
                        <b>pull up</b>
                    </div>
                </DragDropContainer>

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
                                            <img width="100px" src="img/add_icon2.png" alt="" />
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
                                onclick={() => {
                                    alert("잉");
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
