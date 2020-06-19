import React, { useEffect, useState, useContext } from "react";
// ...

function ProductPage() {
  const [target, setTarget] = useState(null);
  // ...

  const _fetchProductItems = () => {
    const productItems = apiProductItems(itemLength);

    if (!productItems.length) {
      actions.isLoaded(dispatch)(false);
      return;
    }

    // ...
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(_onIntersect, { threshold: 1 });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  const _onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      _fetchProductItems();
    }
  };

  // ...

  return (
    <>
      // ...
      {state.isLoaded && <div ref={setTarget}>loading</div>}
    </>
  );
}

export default ProductPage;
