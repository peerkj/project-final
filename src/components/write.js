import React, { Component } from "react";
import "../css/write.css";
import {
    TextField,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import {
    Cancel,
    AddCircle
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
    subject: stores.write.subject,
    summary: stores.write.summary,
    tip: stores.write.tip,
    handleSubjectChange: stores.write.handleSubjectChange,
    handleSummaryChange: stores.write.handleSummaryChange,
    handleFoodcateChange: stores.write.handleFoodcateChange,
    handlePortionChange: stores.write.handlePortionChange,
    handleTimeChange: stores.write.handleTimeChange,
    handleDiffChange: stores.write.handleDiffChange,
    click: stores.write.click,

}))

@observer
class write extends Component {
    render() {
        const {
            click,
            subject,
            summary,
            tip,
            handleSubjectChange,
            handleSummaryChange,
            handleFoodcateChange,
            handlePortionChange,
            handleTimeChange,
            handleDiffChange,
        } = this.props;

        const useStyles = makeStyles((theme) => ({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));

        return (
            <div>
                <button onClick={click}>버튼</button>
                <div>
                    <div className="all_title">대표 사진</div>
                    <br />
                    <img
                        src="img/add_icon.png"
                        alt=""
                        style={{
                            width: "95px",
                            height: "95px",
                            marginLeft: "5px",
                        }}
                    />
                </div>
                <div id="writebody">
                    <div>
                        <div className="first_title">레시피 제목</div>
                        <div className="first_input">
                            <TextField
                                onChange={handleSubjectChange}
                                value={subject}
                                className="inputwriteform"
                                size="small"
                                variant="outlined"
                                style={{ marginLeft: "10px" }}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="first_title">요리 소개</div>
                        <div className="first_input">
                            <TextField
                                onChange={handleSummaryChange}
                                value={summary}
                                className="inputwriteform"
                                size="small"
                                variant="outlined"
                                style={{ marginLeft: "21px" }}
                            />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className="all_title">카테고리</div>
                    <br />
                    <FormControl className={useStyles.formControl}>
                        <InputLabel id="demo-simple-select-label">카테고리 선택</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectcate"

                            onChange={handleFoodcateChange}
                        >
                            <MenuItem value={"구이"}>구이</MenuItem>
                            <MenuItem value={"국/탕/찌개"}>국/탕/찌개</MenuItem>
                            <MenuItem value={"디저트"}>디저트</MenuItem>
                            <MenuItem value={"면"}>면</MenuItem>
                            <MenuItem value={"무침"}>무침</MenuItem>
                            <MenuItem value={"밥/죽/떡"}>밥/죽/떡</MenuItem>
                            <MenuItem value={"볶음"}>볶음</MenuItem>
                            <MenuItem value={"양념/소스"}>양념/소스</MenuItem>
                            <MenuItem value={"조림/찜"}>조림/찜</MenuItem>
                            <MenuItem value={"튀김/부침"}>튀김/부침</MenuItem>
                            <MenuItem value={"기타"}>기타</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <br />
                    <div className="all_title">요리 정보</div>
                    <br />
                    <FormControl className={useStyles.formControl}>
                        <InputLabel id="demo-simple-select-label">인원</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectwrite"
                            onChange={handlePortionChange}
                        >
                            <MenuItem value={1}>1인분</MenuItem>
                            <MenuItem value={2}>2인분</MenuItem>
                            <MenuItem value={3}>3인분</MenuItem>
                            <MenuItem value={4}>4인분</MenuItem>
                            <MenuItem value={5}>5인분 이상</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={useStyles.formControl}
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        <InputLabel id="demo-simple-select-label">시간</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectwrite"
                            onChange={handleTimeChange}
                        >
                            <MenuItem value={15}>15분 이내</MenuItem>
                            <MenuItem value={30}>30분 이내</MenuItem>
                            <MenuItem value={60}>60분 이내</MenuItem>
                            <MenuItem value={90}>90분 이내</MenuItem>
                            <MenuItem value={120}>2시간 이상</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={useStyles.formControl}
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        <InputLabel id="demo-simple-select-label">난이도</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectwrite"
                            onChange={handleDiffChange}
                        >
                            <MenuItem value={"every"}>아무나</MenuItem>
                            <MenuItem value={"easy"}>초급</MenuItem>
                            <MenuItem value={"normal"}>중급</MenuItem>
                            <MenuItem value={"diff"}>고급</MenuItem>
                            <MenuItem value={"chef"}>요리사</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <br />

                    <div id="ingredient">
                        <div className="all_title">재료 입력</div>
                        <br />
                        <div>
                            <TextField
                                id="outlined-helperText"
                                label="재료"
                                helperText="예) 돼지고기"
                                variant="outlined"
                                size="small"
                                className="inputingre"
                            />
                            <TextField
                                id="outlined-helperText"
                                label="용량"
                                helperText="예) 300g"
                                variant="outlined"
                                size="small"
                                className="inputingre"
                                style={{
                                    marginLeft: "5px",
                                }}
                            />
                            <Cancel size="small" color="disabled" />
                        </div>
                    </div>
                    <div id="add_ingredient">
                        <AddCircle size="small" color="primary" />
                        <div className="subtext">재료 추가</div>
                    </div>
                    <div>
                        <br />
                        <div className="all_title">요리 순서</div>
                        <br />
            Step 1
            <br />
                        <TextField
                            id="filled-multiline-static"
                            multiline
                            rows={3}
                            variant="filled"
                            style={{ width: "200px" }}
                            className="input"
                        />
                        <img
                            src="img/add_icon.png"
                            alt=""
                            style={{
                                width: "95px",
                                height: "95px",
                                marginLeft: "5px",
                            }}
                        />
                        {/* {imgBase64 ? (
                     <Close onClick={handleRemove}
                        id="profileImg_delete" />
                     ) : (
                     ""
                  )} */}
                        <Cancel size="small" color="disabled" />
                        <div>
                            <AddCircle size="small" color="primary" />
                            <div className="subtext">순서 추가</div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <div className="all_title">완성 사진</div>
                        <br />
                        <img
                            src="img/add_icon.png"
                            alt=""
                            style={{
                                width: "95px",
                                height: "95px",
                                marginLeft: "5px",
                            }}
                        />
                        <img
                            src="img/add_icon.png"
                            alt=""
                            style={{
                                width: "95px",
                                height: "95px",
                                marginLeft: "5px",
                            }}
                        />
                        <img
                            src="img/add_icon.png"
                            alt=""
                            style={{
                                width: "95px",
                                height: "95px",
                                marginLeft: "5px",
                            }}
                        />
                    </div>
                    <br />

                    <div className="all_title">요리 Tip!</div>
                    <br />
                    <TextField
                        value={tip}
                        size="small"
                        variant="filled"
                        style={{
                            width: "300px",
                        }}
                    />
                    <br />
                    <br />
                    <Button
                        variant="outlined"
                        size="small"
                        style={{
                            backgroundColor: "#002060",
                            color: "#ffffff",
                        }}
                    >
                        글쓰기
          </Button>
                    <Button variant="outlined" size="small" onClick={() => { }}>
                        취소
          </Button>
                </div>
            </div>
        );
    }
}

export default write;
