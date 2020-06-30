import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import "../css/profile.css";

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
  userEmail: stores.info.userEmail,
  deleteComment: stores.comment.deleteComment,

  delete_open: stores.comment.delete_open,
  deleteOpen: stores.comment.deleteOpen,
  err: stores.comment.err,
  modalReset: stores.detail.modalReset,
  login_state: stores.info.login_state,
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
      userEmail,
      deleteComment,
      delete_open,
      deleteOpen,
      err,
      modalReset,
      login_state,
    } = this.props;

    const comment = comment_list.map((c, idx) => {
      return (
        <div
          style={{
            borderTop: "1px solid #e5e5e5",
            paddingTop: "10px",
            paddingBottom: "20px",
          }}
          key={idx}
        >
          <div style={{ display: "inline", verticalAlign: "middle" }}>
            {/* {c.restep === 2 && <span>&emsp;&nbsp;</span>}
            {c.restep === 3 && <span>&emsp;&emsp;&ensp;</span>} */}
            {c.relevel === 1 && (
              <img
                src="/img/comment.png"
                alt=""
                width="25px"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
            )}
            <Link to={`/mypage?nick=${c.nickname}`} onClick={modalReset}>
              <img
                width="40px"
                height="40px"
                style={{ borderRadius: "40px", verticalAlign: "middle" }}
                src={`http://localhost:9000/acorn/image/profile/${c.profile}`}
                alt=""
              />
            </Link>
          </div>
          <div
            style={{
              display: "inline",
              height: "40px",
              verticalAlign: "middle",
            }}
          >
            &emsp;
            <b>
              <Link to={`/mypage?nick=${c.nickname}`} onClick={modalReset}>
                {c.nickname}
              </Link>
            </b>
            &emsp;
            <span>{c.timeDiffer}</span>
            {c.email === userEmail && (
              <Close
                onClick={() => {
                  deleteOpen(c.com_num);
                }}
                style={{ float: "right", color: "#585858" }}
              />
            )}
          </div>
          <br />
          {/* {c.relevel === 1 && <span>&emsp;&emsp;&ensp;</span>} */}
          <span>&emsp;&emsp;&emsp;&ensp;&ensp;{c.content}</span>
          <div className="commentCenterWrapper">
            <div className="commentCenter">
              <div className="centered">
                {c.image && (
                  <img
                    src={`http://localhost:9000/acorn/image/comment/${c.image}`}
                    alt=""
                    style={{ float: "right" }}
                  />
                )}
              </div>
            </div>
          </div>
          <br />
          <br />
          {c.relevel === 1 && <span>&emsp;&emsp;&ensp;</span>}
          {c.email !== "알수없음" && (
            <span
              onClick={() => {
                if (login_state) {
                  setValue(c.com_num, c.regroup, c.restep, c.relevel);
                  handleOpen();
                }
              }}
            >
              &emsp;&emsp;&emsp;&ensp;&ensp;답글
            </span>
          )}
        </div>
      );
    });

    return (
      <div>
        <div>{comment}</div>
        {err && <b>등록된 댓글이 없습니다</b>}
        <div>
          <Dialog
            open={modal_open}
            onClose={handleOpen}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">댓글 쓰기</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="outlined-basic"
                placeholder="댓글을 입력하세요"
                variant="outlined"
                value={content}
                onChange={handleCommentChange}
                size="medium"
                onKeyPress={handleEnter}
              />
              <div style={{ marginTop: "20px" }}>
                <label htmlFor="commentp">
                  {imgBase64 ? (
                    <img
                      src={imgBase64}
                      alt=""
                      style={{ maxWidth: "240px", maxHeight: "200px" }}
                    />
                  ) : (
                      <img src="/img/add_icon2.png" alt="" width="240px" />
                    )}
                </label>
                {imgBase64 ? (
                  <Close
                    style={{
                      position: "relative",
                      top: "-198px",
                      marginLeft: "220px",
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
                onClick={handleOpen}
                style={{ color: "#8a8989", fontWeight: "400" }}
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                style={{ color: "#002060" }}
              >
                등록
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={delete_open}
            onClose={deleteOpen}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>삭제하시겠습니까?</DialogContent>
            <DialogActions>
              <Button
                onClick={deleteOpen}
                style={{ color: "#8a8989", fontWeight: "400" }}
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  deleteComment();
                }}
                style={{ color: "#002060" }}
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default comment;
