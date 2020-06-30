import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "../css/ranking.css";
import {
  People,
  Favorite,
  Bookmark,
  Restaurant,
  DoubleArrow,
} from "@material-ui/icons";
import { Link } from 'react-router-dom';

const fakeFetch = (delay = 1500) =>
  new Promise((res) => setTimeout(res, delay));

// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
  rankingList: stores.ranking.rankingList,
  chef: stores.ranking.chef,
  check_n: stores.ranking.check_n,
  checkNews: stores.ranking.checkNews,
  onNews: stores.ranking.onNews,
  offNews: stores.ranking.offNews,
  userEmail: stores.info.userEmail,

  onNews: stores.ranking.onNews,
  offNews: stores.ranking.offNews,
}))
@observer
class Counter extends Component {
  componentWillMount = () => {
    this.props.rankingList();
  };
  render() {
    const { chef, check_n, checkNews, onNews, offNews, userEmail } = this.props;

    const ChefList = chef.map((c, idx) => {
      return (
        <div
          key={idx}
          style={{ borderBottom: "1px solid #cfcfcf", padding: "10px" }}
        >
          <div style={{ display: "inline" }}>
            {/* 순위 */}
            <span
              style={{
                padding: "5px 10px",
                verticalAlign: "middle",
                color: "#002060",
                fontWeight: "600",
                fontSize: "13pt",
              }}
            >
              {idx + 1}
            </span>
            {/* 프로필사진 */}
            <div className="rankingCenterWrapper">
              <div className="rankingCenter">
                <div className="centered">
                  <img
                    src={`http://localhost:9000/acorn/image/profile/${c.profile}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          &ensp;
          <div style={{ display: "inline" }}>
            {/* 닉네임 */}
            <div
              style={{
                display: "inline-block",
                top: "-10px",
                position: "relative",
              }}
            >
              <span
                style={{
                  color: "#002060",
                  fontWeight: "600",
                  fontSize: "14pt",
                }}
              >
                <Link to={`/mypage?nick=${c.nickname}`}>
                  {c.nickname}
                </Link>

              </span>
              {/* 소식받기버튼 */}

              {check_n[idx] === 0 && c.email !== userEmail ? (
                <button
                  onClick={() => {
                    onNews(c.email, idx);
                  }}
                >
                  소식받기
                </button>
              ) : check_n[idx] === 1 && c.email !== userEmail ? (
                <button
                  onClick={() => {
                    offNews(c.email, idx);
                  }}
                >
                  소식끊기
                </button>
              ) : (
                    ""
                  )}
            </div>

            {/* 아이콘 */}
            <div style={{ position: "relative", top: "-30px", left: "100px" }}>
              <span className="rankIcon">
                <Restaurant fontSize="small" className="rankIconImg" />
                <span className="rankIconText">{c.recipecount}</span>
              </span>
              <span className="rankIcon">
                <People fontSize="small" className="rankIconImg" />
                <span className="rankIconText">{c.newscount}</span>
              </span>
              <span className="rankIcon">
                <Favorite fontSize="small" className="rankIconImg" />
                <span className="rankIconText">{c.joayocount}</span>
              </span>
              <span className="rankIcon">
                <Bookmark fontSize="small" className="rankIconImg" />
                <span className="rankIconText">{c.scrapcount}</span>
              </span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <DoubleArrow
          style={{ verticalAlign: "middle", margin: "10px 0 10px 20px" }}
        />
        <span className="rankingTitle">Chef Ranking</span>
        <div style={{ marginTop: "20px" }}>{ChefList}</div>
      </div>
    );
  }
}

export default Counter;
