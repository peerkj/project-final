import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "../css/detail.css";
import Info from "@material-ui/icons/InfoOutlined";
import { Close } from "@material-ui/icons";
import {
    Button,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    AppBar,
    Toolbar,
    IconButton,

} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import queryString from "query-string";

// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
    all: stores.detail.all,
    getRecipe: stores.detail.getRecipe,
    comp_list: stores.detail.comp_list,
    ing_list: stores.detail.ing_list,
    step_list: stores.detail.step_list,
    nickname: stores.detail.nickname,
    profile: stores.detail.profile,

    comp_img: stores.detail.comp_img,
    changeComp: stores.detail.changeComp,
    sliderR: stores.detail.sliderR,
    sliderL: stores.detail.sliderL,
    sliderP: stores.detail.sliderP,

    //공유모달
    modal_open: stores.detail.modal_open,
    handleShare: stores.detail.handleShare,
    url: stores.detail.url,
    onCopy: stores.detail.onCopy,

    //댓글모달
    comment_open: stores.detail.comment_open,
    handleComment: stores.detail.handleComment,

    checkjoa:stores.detail.checkjoa,
    Joayo:stores.detail.Joayo,

    checkscr:stores.detail.checkscr,
    Scrap:stores.detail.Scrap,
}))


@observer
class Detail extends Component {

    componentWillMount = () => {
        let query = queryString.parse(this.props.location.search);
        window.scrollTo(0, 0);
        this.props.getRecipe(query.recipe);
        this.props.changeComp();
      };
    render() {



        const {
            all,
            comp_list,
            ing_list,
            step_list,
            nickname,
            profile,
            comp_img,

            sliderR,
            sliderL,
            sliderP,
            changeComp,

            //공유모달
            modal_open,
            handleShare,
            url,
            onCopy,

            //댓글모달
            comment_open,
            handleComment,

            checkjoa,
            Joayo,

            checkscr,
            Scrap,
        } = this.props;

        //완성사진
        const compphoto_list = comp_list.map(i => {
            return (
                <div><img src={`http://localhost:9000/acorn/image/recipe/${i}`} alt="" /> </div>
            )
        })

        //주재료
        const main = ing_list.map(i => {
            return (
                <div>

                    {i.sort === '주재료' ?
                        i.ingre_name : ""
                    }{i.sort === '주재료' ?
                        <Info /> : ""
                    }&nbsp;
                    {i.sort === '주재료' ?
                        i.quantity : ""
                    }
                </div>
            )
        })

        //부재료
        const sub = ing_list.map(i => {
            return (
                <div>

                    {i.sort === '부재료' ?
                        i.ingre_name : ""
                    }{i.sort === '부재료' ?
                        <Info /> : ""
                    }&nbsp;
                    {i.sort === '부재료' ?
                        i.quantity : ""
                    }
                </div>
            )
        })

        //조리순서
        const step = step_list.map((i, num) => {
            return (
                <div>
                    <div className="stepnc">
                        <div className="stepnum">{num + 1}</div>
                        <p style={{ float: "left" }}><b>{i.content}</b></p><br />
                    </div>
                    <img src={`http://localhost:9000/acorn/image/recipe/${i.photo}`} alt="" />
                </div>
            )
        })

        //<img src={`http://localhost:9000/acorn/image/recipe/${all.repre_photo}`} alt="" />


        return (
            <div>
                {/* Default */}
                <div style={{ width: "100%", height: "300px", border: "1px solid black" }}>
                    <img src={`http://localhost:9000/acorn/image/recipe/${all.repre_photo}`} alt="" />
                </div>
                <div>
                    <div style={{ position: "relative", width: "100%", border: "1px solid black" }}>
                        <img className="de_profile" src={`http://localhost:9000/acorn/image/profile/${profile}`} alt="" />
                        <br />
                        <br />
                        <p style={{ textAlign: "center" }}>{nickname}</p>
                        <p style={{ textAlign: "center" }}><b>{all.subject}</b></p>
                        <p style={{ textAlign: "center" }}>"{all.summary}"</p>
                        <div className="ptdGroup">
                            <div className="ptd">{all.portion}</div>
                            <div className="ptd">{all.time}</div>
                            <div className="ptd">{all.difficult}</div>
                        </div>
                        <div>
                            <div><button onClick={handleShare}>공유</button></div>
                            <div><button onClick={Scrap}>{checkscr===0?"스크랩하기":"스크랩취소"}</button></div>
                            <div><button onClick={handleComment}>댓글</button></div>
                            <div>
                                <button onClick={Joayo}>
                                {checkjoa===0?"좋아요":"좋아요취소"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "100%", border: "1px solid black" }}>
                        재료<br />
                        <b>주재료</b><br />
                        {main}
                        <hr />
                        <br />
                        <b>부재료</b><br />
                        {sub}
                        <hr />

                        <b>조리순서</b><br />

                        {step}
                        <br />
                        <br />
                        <b>완성사진</b><br />
                        <div>
                            <img src={`http://localhost:9000/acorn/image/recipe/${comp_img}`} alt="" />
                            <button onClick={sliderL}>&lt;</button>
                            <button onClick={sliderP}>일시y정지</button>
                            <button onClick={changeComp}>재생</button>
                            <button onClick={sliderR}>&gt;</button>
                        </div><br /><br />
                        <b>요리 Tip!</b><br />
                        {all.tip}
                    </div>

                </div>
                {/* Default */}

                {/* 공유모달 */}
                <div>
                    <Dialog
                        open={modal_open}
                        onClose={handleShare}
                    >
                        <DialogTitle id="form-dialog-title">
                            URL 복사하기
                            
                            <IconButton edge="end" onClick={handleShare} aria-label="close">
                                <Close />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent>
                            <TextField
                                value={url}
                                readOnly
                                fullWidth
                                variant="filled"
                                size="small"
                            />
                            <CopyToClipboard text={url} onCopy={onCopy}>
                                <Button color="primary" variant="contained">복사하기</Button>
                            </CopyToClipboard>
                        </DialogContent>
                    </Dialog>
                </div>
                {/* 공유모달 */}


                {/* 댓글모달 */}
                <Dialog fullScreen open={comment_open} onClose={handleComment}>
                    <AppBar>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleComment} aria-label="close">
                                <Close />
                            </IconButton>
                            댓글모달
                        </Toolbar>
                    </AppBar>

                </Dialog>
                {/* 댓글모달 */}

            </div>
        );
    }
}

export default Detail;
