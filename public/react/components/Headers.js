import React from "react";
import "./Headers.css";

export const Headers = () => {
  return (
    <header className="titleContainer">
      <div className="row justify-content-evenly">
        <div className="col-3 text-center itemTitle">
          <h4>ITEM</h4>
        </div>
        <div className="col-4 text-center itemTitle">
          <h4>DESCRIPTION</h4>
        </div>
        <div className="col-1 text-center itemTitle">
          <h4>PRICE</h4>
        </div>
        <div className="col-1 text-center itemTitle">
          <h4>CATEGORY</h4>
        </div>
        <div className="col-3 text-center itemTitle">
          <h4>IMAGE</h4>
        </div>
      </div>
    </header>
  );
};
