import React from "react";

export default function Menu({ onChangeView }) {
  return (
    <div className="menu-container">
      <button className="btn btn-green" onClick={() => onChangeView("stocks")}>
        Stock List
      </button>
      <button className="btn btn-blue" onClick={() => onChangeView("exchanges")}>
        Exchange List
      </button>
    </div>
  );
}
