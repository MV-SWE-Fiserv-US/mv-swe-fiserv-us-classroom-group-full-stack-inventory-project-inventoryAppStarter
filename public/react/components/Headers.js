import React from "react";
import "./Headers.css"

export const Headers = () => {
  return <header className="titleContainer">
    <div className="row justify-content-evenly">
        <div className="col-3 text-center itemTitle">
        <h4>Item</h4>

        </div>
        <div className="col-4 text-center itemTitle">
        <h4>Description</h4>

        </div>
        <div className="col-1 text-center itemTitle">
        <h4>Price</h4>

        </div>
        <div className="col-1 text-center itemTitle">
        <h4>Category</h4>

        </div>
        <div className="col-3 text-center itemTitle">
        <h4>Image</h4>

        </div>
        
      
    </div>

  </header>
}