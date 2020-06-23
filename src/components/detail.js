import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import queryString from "query-string";

import "../css/detail.css";
import Info from "@material-ui/icons/InfoOutlined";

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
    } = this.props;

    //주재료
    const main = ing_list.map((i) => {
      return (
        <div>
          {i.sort === "주재료" ? i.ingre_name : ""}
          {i.sort === "주재료" ? <Info /> : ""}&nbsp;
          {i.sort === "주재료" ? i.quantity : ""}
        </div>
      );
    });

    //부재료
    const sub = ing_list.map((i) => {
      return (
        <div>
          {i.sort === "부재료" ? i.ingre_name : ""}
          {i.sort === "부재료" ? <Info /> : ""}&nbsp;
          {i.sort === "부재료" ? i.quantity : ""}
        </div>
      );
    });

    //조리순서
    const step = step_list.map((i, num) => {
      return (
        <div>
          <div className="stepnc">
            <div className="stepnum">{num + 1}</div>
            <p style={{ float: "left" }}>
              <b>{i.content}</b>
            </p>
            <br />
          </div>
          <img
            width="300px"
            src={`http://localhost:9000/acorn/image/recipe/${i.photo}`}
            alt=""
          />
        </div>
      );
    });

    //<img src={`http://localhost:9000/acorn/image/recipe/${all.repre_photo}`} alt="" />

    return (
      <div>
        {/* Default */}
        <div
          style={{ width: "100%", height: "300px", border: "1px solid black" }}
        >
          <img
            width="300px"
            src={`http://localhost:9000/acorn/image/recipe/${all.repre_photo}`}
            alt=""
          />
        </div>
        <div>
          <div
            style={{
              position: "relative",
              width: "100%",
              border: "1px solid black",
            }}
          >
            <img
              className="de_profile"
              src={`http://localhost:9000/acorn/image/profile/${profile}`}
              alt=""
            />
            <br />
            <br />
            <p style={{ textAlign: "center" }}>{nickname}</p>
            <p style={{ textAlign: "center" }}>
              <b>{all.subject}</b>
            </p>
            <p style={{ textAlign: "center" }}>"{all.summary}"</p>
            <div className="ptdGroup">
              <div className="ptd">{all.portion}</div>
              <div className="ptd">{all.time}</div>
              <div className="ptd">{all.difficult}</div>
            </div>
          </div>
          <div style={{ width: "100%", border: "1px solid black" }}>
            재료
            <br />
            <b>주재료</b>
            <br />
            {main}
            <hr />
            <br />
            <b>부재료</b>
            <br />
            {sub}
            <hr />
            <b>조리순서</b>
            <br />
            <button>기본</button>
            <button>글만</button>
            <button>이미지슬라이더</button>
            {step}
            <br />
            <br />
            <b>완성사진</b>
            <br />
            <div>
              <img
                width="300px"
                src={`http://localhost:9000/acorn/image/recipe/${comp_img}`}
                alt=""
              />
              <button onClick={sliderL}>&lt;</button>
              <button onClick={sliderP}>일시정지</button>
              <button onClick={changeComp}>재생</button>
              <button onClick={sliderR}>&gt;</button>
            </div>
            <br />
            <br />
            <b>요리 Tip!</b>
            <br />
            {all.tip}
          </div>
        </div>
        {/* Default */}
      </div>
    );
  }
}

export default Detail;
