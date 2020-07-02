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
import { Link } from "react-router-dom";

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
  updateCheck: stores.ranking.updateCheck,
  userEmail: stores.info.userEmail,
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
          style={{
            borderBottom: "1px solid #cfcfcf",
            padding: "10px",
            clear: "both",
          }}
        >
          <div style={{ display: "inline" }}>
            {/* 순위 */}
            <span
              style={{
                padding: "5px 10px",
                verticalAlign: "middle",
                fontWeight: "600",
                fontSize: "16pt",
              }}
            >
              {idx + 1}
            </span>
            {/* 프로필사진 */}
            <div className="rankingCenterWrapper">
              <div className="rankingCenter">
                <div className="centered">
                  <Link to={`/mypage?nick=${c.nickname}`}>
                    <img
                      src={`http://13.124.83.195:8080/acorn/image/profile/${c.profile}`}
                      alt=""
                    />
                  </Link>
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
                  fontWeight: "600",
                  fontSize: "14pt",
                  verticalAlign: "middle",
                }}
              >
                <Link to={`/mypage?nick=${c.nickname}`}>{c.nickname}</Link>
              </span>

              {/* 소식받기버튼 */}
              {check_n[idx] === 0 && c.email !== userEmail ? (
                <span
                  onClick={() => {
                    onNews(c.email, idx);
                  }}
                  id="rankingFollowbtn"
                >
                  Follow
                </span>
              ) : check_n[idx] === 1 && c.email !== userEmail ? (
                <span
                  onClick={() => {
                    offNews(c.email, idx);
                  }}
                  id="rankingUnfollowbtn"
                >
                  Unfollow
                </span>
              ) : (
                ""
              )}
            </div>
            <div id="rankingScore">{c.score}</div>

            {/* 아이콘 */}
            <div
              style={{
                position: "relative",
                top: "-25px",
                left: "103px",
                width: "200px",
              }}
            >
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
        <div style={{ margin: "30px 0 0 20px" }}>
          <DoubleArrow style={{ verticalAlign: "middle" }} fontSize="large" />
          <span className="rankingTitle">Chef Ranking</span>
        </div>
        <div
          style={{
            marginTop: "25px",
            fontWeight: "600",
            fontSize: "11pt",
            borderBottom: "1px solid #cfcfcf",
            width: "360px",
            padding: "0 0 10px 0",
          }}
        >
          <span style={{ marginLeft: "12px" }}>순위</span>
          <div style={{ float: "right", marginRight: "5px" }}>
            <img
              src="/img/star.png"
              alt=""
              width="25px"
              style={{ verticalAlign: "middle" }}
            />
            <span style={{ verticalAlign: "middle" }}>셰프 점수</span>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>{ChefList}</div>
      </div>
    );
  }
}

export default Counter;
