import React, { useEffect } from "react";
import useIntersect from "./useIntersect";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

import "./styles.css";

const fakeFetch = (delay = 800) => new Promise((res) => setTimeout(res, delay));
// const ListItem = ({ number }) => (
//   <div className="ListItem">
//     <span>{number}</span>
//   </div>
// );
const R = ({
  list,
  state,
  getList,
  changeState,
  addState,
  history,
  updateList,
  setView,
}) => {
  //   // const [state, setState] = useState({ itemCount: 0, isLoading: false });
  //   /* fake async fetch */

  useEffect(() => {
    updateList();
  });
  const ListItem = list.slice(0, state.itemCount).map((l, idx) => {
    return (
      <Link
        key={l.rec_num}
        className="ListItem"
        to={`/detail?recipe=${l.rec_num}`}
        onClick={() => {
          setView(l.rec_num, idx);
        }}
      >
        <div>
          <img
            width="35px"
            src={`http://localhost:9000/acorn/image/profile/${l.profile}`}
            alt=""
          />
          {l.subject}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {l.writeday.substring(0, 10)}
          <br />
          {l.nickname}
          &nbsp;&nbsp;&nbsp;&nbsp; 조회수{l.readcount}
        </div>
        <br />
        <hr />
        <div>
          <img
            width="100px"
            src={`http://localhost:9000/acorn/image/recipe/${l.repre_photo}`}
            alt=""
          />
        </div>
        <br />
        조아용{l.joayo}&nbsp;&nbsp;&nbsp;&nbsp; 스크랩수{l.scrap}
        <br />
      </Link>
    );
  });

  const fetchItems = async () => {
    changeState();
    getList();
    await fakeFetch();
    addState();
  };
  /* initial fetch */

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  //if (state1.itemCount) return null;

  return (
    <div className="App">
      <button
        style={{ position: "fixed", left: "250px", top: "600px" }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        TOP
      </button>
      <button
        style={{ position: "fixed", left: "300px", top: "600px" }}
        onClick={() => {
          history.push("/write");
        }}
      >
        글쓰기
      </button>
      {ListItem}
      <div ref={setRef} className="Loading">
        {state.isLoading && "Loading..."}
      </div>
    </div>
  );
};

export default inject(({ recipe }) => ({
  list: recipe.list,
  getList: recipe.getList,
  state: recipe.state,
  changeState: recipe.changeState,
  addState: recipe.addState,
  updateList: recipe.updateList,
  setView: recipe.setView,
}))(observer(R));
