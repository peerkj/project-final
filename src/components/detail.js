import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "../css/detail.css";
import Info from "@material-ui/icons/InfoOutlined";

// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
@inject((stores) => ({
    all: stores.detail.all,
    getRecipe: stores.detail.getRecipe,
}))

@observer
class Detail extends Component {

    componentWillMount = () => {
        this.props.getRecipe();

    };
    render() {

        const {
            all,
        } = this.props;


        //<img src={`http://localhost:9000/acorn/image/recipe/${all.repre_photo}`} alt="" />
        let l = all.comp_photo.split(',');

        const comp_list = l.map(img => {
            return (<div><img src={`http://localhost:9000/acorn/image/recipe/${img}`} alt="" /> </div>);
        });

        return (
            <div>
                <div style={{ width: "100%", height: "300px", border: "1px solid black" }}>
                    {comp_list}
                </div>
                <div>
                    <div style={{ position: "relative", width: "100%", border: "1px solid black" }}>
                        <img className="de_profile" src="img/basic_user.png" alt="" />
                        <br />
                        <br />
                        <p style={{ textAlign: "center" }}>비와이프</p>
                        <p style={{ textAlign: "center" }}><b>{all.subject}</b></p>
                        <p style={{ textAlign: "center" }}>"{all.summary}"</p>
                        <div className="ptdGroup">
                            <div className="ptd">{all.portion}</div>
                            <div className="ptd">{all.time}</div>
                            <div className="ptd">{all.difficult}</div>
                        </div>
                    </div>
                    <div style={{ width: "100%", border: "1px solid black" }}>
                        재료<br />
                        <b>주재료</b><br />
                        주재료1 <Info />
                        <hr />
                        주재료2 <Info />
                        <hr />
                        <br />
                        <b>부재료</b><br />
                        부재료1 <Info />
                        <hr />
                        부재료2 <Info />
                        <hr />

                        <b>조리순서</b><br />
                        <br />
                        <br />
                        <b>완성사진</b><br />
                        <div>

                        </div><br /><br />
                        <b>요리 Tip!</b><br />
                        {all.tip}
                    </div>

                </div>
            </div>
        );
    }
}

export default Detail;
