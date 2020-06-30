import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Bookmark, People, Favorite, Restaurant } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import "../css/following.css";

// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
    follow: stores.following.follow,
    followList: stores.following.followList,
    offNews: stores.following.offNews,
}))
@observer
class Following extends Component {
    componentWillMount = () => {
        this.props.followList();
    }
    render() {
        const { follow, offNews } = this.props;

        const FollowList = follow.map((f, idx) => {
            return (
                <div>
                    <div className="chefbox" style={{ clear: "both" }}>
                        <div className="rankingCenterWrapper" style={{ marginRight: "4px" }}>
                            <div className="rankingCenter">
                                <div className="centered">
                                    <img src={`http://localhost:9000/acorn/image/profile/${f.chef.profile}`} alt="" />
                                </div>
                            </div>
                        </div>

					&ensp;
                    <div style={{ display: "inline" }}>
                            {/* 닉네임 */}
                            <div style={{ display: "inline-block", top: "-10px", position: "relative" }}>
                                <span
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "14pt",
                                        verticalAlign: "middle"
                                    }}>
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
                            <div style={{ position: "relative", top: "-25px", left: "73px", width: "200px" }}>
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
                                                    <img src={`http://localhost:9000/acorn/image/recipe/${r.repre_photo}`}
                                                        width="150px" height="150px" alt="" /><br />
                                                    {r.subject}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div >
            )
        })

        return (
            <div>
                <h2>내가 팔로하는 쉐프</h2>
                {FollowList}
            </div >
        );
    }
}

export default Following;
