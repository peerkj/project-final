import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
    rankingList: stores.ranking.rankingList,
    chef: stores.ranking.chef,
    check_n: stores.ranking.check_n,
    checkNews: stores.ranking.checkNews,
    onNews: stores.ranking.onNews,
    offNews: stores.ranking.offNews,

}))
@observer
class Counter extends Component {
    componentWillMount = () => {
        this.props.rankingList();
    };
    render() {
        const {
            chef,
            check_n,
            checkNews,
            onNews,
            offNews,
        } = this.props;

        const ChefList = chef.map((c, idx) => {
            return (
                <div style={{ border: "1px solid gray" }}>
                    {/* 순위 */}
                    <b>{idx + 1}</b>
                    {/* 프로필사진 */}
                    <img src={`http://localhost:9000/acorn/image/profile/${c.profile}`} width="50px" alt="" />
                    {/* 닉네임 */}
                    {c.nickname}
                    {/* 소식받기버튼 */}
                    <div>
                        {check_n[idx] === 0 && (
                            <b onClick={() => {
                                onNews(c.email, idx);
                            }}>소식받기</b>
                        )}
                        {check_n[idx] === 1 && (
                            <b onClick={() => {
                                offNews(c.email, idx);
                            }}>소식받기취소</b>
                        )}
                    </div>
                    <br />
                    {/* 그외.. */}
                    총글수 : {c.recipecount} | 소식받기수:{c.newscount} | 좋아요 : {c.joayocount} | 스크랩 : {c.scrapcount}

                </div>
            )
        })
        return (
            <div>
                <h2>랭킹페이지</h2>
                {ChefList}
            </div>
        );
    }
}

export default Counter;