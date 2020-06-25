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
import { Close } from "@material-ui/icons";

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
  handleEnter: stores.comment.handleEnter,
  handleRemoveRe: stores.comment.handleRemoveRe,
  setValue: stores.comment.setValue,
}))
@observer
class comment extends Component {
  componentDidMount = () => {
    this.props.getList();
  };

  render() {
    const {
      comment_list,

      modal_open,
      handleOpen,
      imgBase64,
      handleChangeImg,
      content,
      handleCommentChange,
      handleSubmit,
      handleEnter,
      handleRemoveRe,
      setValue,
    } = this.props;

    const comment = comment_list.map((c, idx) => {
      return (
        <div style={{ border: "1px solid gray" }} key={idx}>
          {c.relevel === 1 && <b>답글입니당</b>}
          <img
            width="40px"
            src={`http://localhost:9000/acorn/image/profile/${c.profile}`}
            alt=""
          />
          <br />
          <b>{c.timeDiffer}</b>
          <br />
          <b>{c.nickname}</b>
          <br />
          <b>{c.content}</b>
          <br />
          {c.image && (
            <img
              width="40px"
              src={`http://localhost:9000/acorn/image/comment/${c.image}`}
              alt=""
            />
          )}
          <br />
          <button
            onClick={() => {
              setValue(c.com_num, c.regroup, c.restep, c.relevel);
              handleOpen();
            }}
          >
            답글
          </button>
        </div>
      );
    });

    return (
      <div>
        <br />

        <div
          style={{
            border: "1px solid gray",
            width: "357px",
          }}
        >
          <button
            style={{ position: "fixed", top: "600px", right: "30px" }}
            onClick={() => {
              setValue();
              handleOpen();
            }}
          >
            댓글쓰기
          </button>

          {comment}
        </div>

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
                size="medium"
                onKeyPress={handleEnter}
              />
              <div style={{ marginTop: "15px" }}>
                <label htmlFor="commentp">
                  {imgBase64 ? (
                    <img
                      width="200px"
                      height="200px"
                      src={imgBase64}
                      alt=""
                    />
                  ) : (
                      <img
                        width="100px"
                        src="/img/add_icon2.png"
                        alt=""
                      />
                    )}
                </label>
                {imgBase64 ? (
                  <Close
                    style={{
                      position: "relative",
                      top: "-198px",
                      marginLeft: "170px",
                      zIndex: "2",
                    }}
                    onClick={() => {
                      handleRemoveRe();
                    }}
                    id="commentthumb_delete"
                  />
                ) : (
                    ""
                  )}
              </div>
              <input
                style={{ display: "none" }}
                accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
                id="commentp"
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
