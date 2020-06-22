import React, { useState, useEffect } from "react";
import useIntersect from "./useIntersect";
import { inject, observer } from "mobx-react";
import "./styles.css";

const fakeFetch = (delay = 800) => new Promise((res) => setTimeout(res, delay));
// const ListItem = ({ number }) => (
//   <div className="ListItem">
//     <span>{number}</span>
//   </div>
// );
const R = ({ list, state, getList, changeState, addState }) => {
  //   // const [state, setState] = useState({ itemCount: 0, isLoading: false });
  //   /* fake async fetch */

  const ListItem = list.slice(0, state.itemCount).map((l, limit) => {
    return <div className="ListItem">{l.rec_num}</div>;
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
      {/* {[...Array(state.itemCount)].map((_, i) => {
        return <ListItem key={i} number={i} />;
      })} */}
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
}))(observer(R));
