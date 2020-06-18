<<<<<<< HEAD
import React, { Component } from 'react';
import "../css/write.css";
import { TextField, FormControlLabel, Checkbox, FormGroup, makeStyles, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Cancel, AddCircle, AddPhotoAlternate, Close } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

class write extends Component {
    render() {
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
                <div id="writebody">
                    <div>
                        <div className="first_title">
                            레시피 제목
						</div>
                        <div className="first_input">
                            <TextField
                                className="inputwriteform"
                                size="small"
                                variant="outlined"
                                style={{ marginLeft: "10px" }} />
                        </div>
                        <br /><br />
                        <div className="first_title">
                            요리 소개
						</div>
                        <div className="first_input">
                            <TextField
                                className="inputwriteform"
                                size="small"
                                variant="outlined"
                                style={{ marginLeft: "21px" }} />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div>
                        <div className="all_title">
                            카테고리
						</div>
                        <br />
                        <div>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // checked={state.checkedB}
                                            // onChange={handleChange}
                                            name="soup"
                                            color="primary"
                                        />
                                    }
                                    label="국/탕/찌개"
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <br />

                    <div className="all_title">
                        요리 정보
					</div>
                    <br />
                    <FormControl className={useStyles.formControl}>
                        <InputLabel id="demo-simple-select-label">인원</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectwrite"
                        // value={age}
                        // onChange={handleChange}
                        >
                            <MenuItem value={1}>1인분</MenuItem>
                            <MenuItem value={2}>2인분</MenuItem>
                            <MenuItem value={3}>3인분</MenuItem>
                            <MenuItem value={4}>4인분</MenuItem>
                            <MenuItem value={5}>5인분 이상</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={useStyles.formControl}
                        style={{
                            marginLeft: "5px"
                        }}>
                        <InputLabel id="demo-simple-select-label">시간</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectwrite"
                        // value={age}
                        // onChange={handleChange}
                        >
                            <MenuItem value={15}>15분 이내</MenuItem>
                            <MenuItem value={30}>30분 이내</MenuItem>
                            <MenuItem value={60}>60분 이내</MenuItem>
                            <MenuItem value={90}>90분 이내</MenuItem>
                            <MenuItem value={120}>2시간 이상</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={useStyles.formControl}
                        style={{
                            marginLeft: "5px"
                        }}>
                        <InputLabel id="demo-simple-select-label">난이도</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="selectwrite"
                        // value={age}
                        // onChange={handleChange}
                        >
                            <MenuItem value={'every'}>아무나</MenuItem>
                            <MenuItem value={'easy'}>초급</MenuItem>
                            <MenuItem value={'normal'}>중급</MenuItem>
                            <MenuItem value={'diff'}>고급</MenuItem>
                            <MenuItem value={'chef'}>요리사</MenuItem>
                        </Select>
                    </FormControl>
                    <br /><br /><br />

                    <div id="ingredient">
                        <div className="all_title">
                            재료 입력
						</div>
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
                                    marginLeft: "5px"
                                }}
                            />
                            <Cancel
                                size="small"
                                color="disabled" />
                        </div>
                    </div>
                    <div id="add_ingredient">
                        <AddCircle
                            size="small"
                            color="primary"
                        />
                        <div className="subtext">
                            재료 추가
						</div>
                    </div>
                    <div>
                        <br />

                        <div className="all_title">
                            요리 순서
						</div>
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
                                marginLeft: "5px"
                            }}
                        />
                        {/* {imgBase64 ? (
							<Close onClick={handleRemove}
								id="profileImg_delete" />
							) : (
							""
						)} */}
                        <Cancel
                            size="small"
                            color="disabled" />
                        <div>
                            <AddCircle
                                size="small"
                                color="primary" />
                            <div className="subtext">
                                순서 추가
							</div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <div className="all_title">
                            완성 사진
						</div>
                        <br />
                        <img
                            src="img/add_icon.png"
                            alt=""
                            style={{
                                width: "95px",
                                height: "95px",
                                marginLeft: "5px"
                            }}
                        />
                    </div>
                    <br />

                    <div className="all_title">
                        요리 Tip!
					</div>
                    <br />
                    <TextField
                        size="small"
                        variant="filled"
                        style={{
                            width: "300px"
                        }}
                    />
                    <br /><br />
                    <Button variant="outlined"
                        size="small"
                        style={{
                            backgroundColor: "#002060",
                            color: "#ffffff"
                        }}>
                        글쓰기
					</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                        }}>
                        취소
					</Button>
                </div>
            </div>
        );
    }
}

export default write;
=======
import React, { Component } from "react";
import "../css/write.css";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  Cancel,
  AddCircle,
  AddPhotoAlternate,
  Close,
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

class write extends Component {
  render() {
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
        <div id="writebody">
          <div>
            <div className="first_title">레시피 제목</div>
            <div className="first_input">
              <TextField
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
                className="inputwriteform"
                size="small"
                variant="outlined"
                style={{ marginLeft: "21px" }}
              />
            </div>
          </div>

          <br />
          <br />

          <div>
            <div className="all_title">카테고리</div>
            <br />
            <div>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="soup"
                      color="primary"
                    />
                  }
                  label="국/탕/찌개"
                />
              </FormGroup>
            </div>
          </div>
          <br />

          <div className="all_title">요리 정보</div>
          <br />
          <FormControl className={useStyles.formControl}>
            <InputLabel id="demo-simple-select-label">인원</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="selectwrite"
              // value={age}
              // onChange={handleChange}
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
              // value={age}
              // onChange={handleChange}
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
              // value={age}
              // onChange={handleChange}
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
          </div>
          <br />

          <div className="all_title">요리 Tip!</div>
          <br />
          <TextField
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
          <Button variant="outlined" size="small" onClick={() => {}}>
            취소
          </Button>
        </div>
      </div>
    );
  }
}

export default write;
>>>>>>> seok-home
