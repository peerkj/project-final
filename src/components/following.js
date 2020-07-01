import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Bookmark, People, Favorite, Restaurant } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../css/following.css";
import { DoubleArrow } from "@material-ui/icons";

// **** 최하단에 있던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
  follow: stores.following.follow,
  followList: stores.following.followList,
  offNews: stores.following.offNews,
  login_state: stores.info.login_state,
}))
@observer
class Following extends Component {
  componentWillMount = () => {
    if (!this.props.login_state) {
      alert("로그인 후 이용하세요");
      this.props.history.push("/login");
    }
    this.props.followList();
  };
  render() {
    const { follow, offNews } = this.props;

    const FollowList = follow.map((f, idx) => {
      return (
        <div>
          <div className="chefbox" style={{ clear: "both" }}>
            <div
              className="rankingCenterWrapper"
              style={{ marginRight: "4px" }}
            >
              <div className="rankingCenter">
                <div className="centered">
                  <Link to={`/mypage?nick=${f.chef.nickname}`}>
                    <img
                      src={`http://18.221.230.63:8080/acorn/image/profile/${f.chef.profile}`}
                      alt=""
                    />
                  </Link>
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
                  <Link to={`/mypage?nick=${f.chef.nickname}`}>
                    {f.chef.nickname}
                  </Link>
                </span>
                {/* 소식받기버튼 */}

                <span
                  onClick={() => {
                    offNews(f.chef.email, idx);
                  }}
                  id="rankingUnfollowbtn"
                >
                  Unfollow
                </span>
              </div>

              {/* 아이콘 */}
              <div
                style={{
                  position: "relative",
                  top: "-25px",
                  left: "73px",
                  width: "200px",
                }}
              >
                <span className="rankIcon">
                  <Restaurant fontSize="small" className="rankIconImg" />
                  <span className="rankIconText">{f.chef.recipecount}</span>
                </span>
                <span className="rankIcon">
                  <People fontSize="small" className="rankIconImg" />
                  <span className="rankIconText">{f.chef.newscount}</span>
                </span>
                <span className="rankIcon">
                  <Favorite fontSize="small" className="rankIconImg" />
                  <span className="rankIconText">{f.chef.joayocount}</span>
                </span>
                <span className="rankIcon">
                  <Bookmark fontSize="small" className="rankIconImg" />
                  <span className="rankIconText">{f.chef.scrapcount}</span>
                </span>
              </div>
            </div>
            <div>
              <div>
                {f.recipes.map((r, idx) => {
                  return (
                    <div key={idx}>
                      <Link to={`/recipe/detail?recipe=${r.rec_num}`}>
                        <div className="chef-recipebox">
                          <div className="followCenterWrapper">
                            <div className="followCenter">
                              <div className="centered">
                                <img
                                  src={`http://18.221.230.63:8080/acorn/image/recipe/${r.repre_photo}`}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <center width="150px">
                            <span
                              style={{ color: "#000000", fontWeight: "500" }}
                            >
                              {r.subject}
                            </span>
                          </center>
                          <span
                            style={{
                              float: "right",
                              marginRight: "6px",
                              fontSize: "9pt",
                            }}
                          >
                            {r.timeDiffer}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div style={{ margin: "30px 0 0 20px" }}>
          <DoubleArrow style={{ verticalAlign: "middle" }} fontSize="large" />
          <span className="rankingTitle">구독하는 셰프</span>
        </div>
        {FollowList}
      </div>
    );
  }
}

export default Following;
