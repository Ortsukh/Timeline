import React from "react";
import "./style.css";
import ITEMS_PREORDER_COLOR from "../../constants/itemsPreOrderColor";

const generateClue = () => {
  const clueContent = [];
  Object.keys(ITEMS_PREORDER_COLOR).forEach((status) => {
    clueContent.push(
      <div className="clueItem">
        <div
          className="clueItemColor"
          style={{
            backgroundColor: ITEMS_PREORDER_COLOR[status].backgroundColor,
          }}
        />
        <span style={{ maxWidth: 250 }}>
          {" "}
          {ITEMS_PREORDER_COLOR[status].text}
        </span>
      </div>,
    );
  });
  return clueContent;
};

export default function ClueWindow({ closeBookingWindow }) {
  return (
    <div
      className="clueWindow"
      style={{
        left: "39%",
        top: "33.4%",
      }}
    >
      {generateClue()}

    </div>
  );
}
