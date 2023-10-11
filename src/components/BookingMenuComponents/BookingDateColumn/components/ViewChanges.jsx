/* eslint-disable no-nested-ternary */
import React from "react";
import { ConflCirle, OkImg } from "../../../../others/importImg";
import style from "../BookingTimeline.module.css";

export default function ViewChanges({
  prevItems, groups, newItems, elementForChange, handleItemSelect,
}) {
  // console.log(prevItems, groups, newItems);
  const newItemsMap = {};
  newItems.forEach((item) => {
    item.currentGroup = groups.find((groupItem) => groupItem.id === item.group);
    newItemsMap[item.id.split("_")[1]] = item;
  });
  const content = prevItems.map((item) => {
    const group = groups.find((groupItem) => groupItem.id === item.group);
    const newItem = newItemsMap[item.id.split("_")[1]];
    const isActiveItemStyle = item.id.split("_")[1] === elementForChange?.id.split("_")[1] ? { backgroundColor: "rgb(255 231 115)" } : {};
    const isDeletedItemStyle = newItem.isDeleted === true ? { cursor: "not-allowed" } : {};

    return (
      <div
        className={style.view_changes_row}
        style={{ ...isActiveItemStyle, ...isDeletedItemStyle }}
        key={item.id}
        aria-hidden="true"
        onClick={() => {
          if (newItem.isDeleted === false) {
            handleItemSelect(newItem.id);
          }
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "47%" }}>
          <div className={style.view_changes_items_title}>
            {`${group.shortTitle} : ${item.shiftTime}-${item.shiftTime + group.shiftLength}`}
          </div>
          <div className={style.view_changes_items_status}>
            {item.itemStatus === "success"
              ? <img src={OkImg} alt="ok" />
              : <img src={ConflCirle} alt="conflict" /> }
          </div>
        </div>

        <div className={style.view_changes_arrow}>
          {(newItem.isChanged || newItem.isDeleted) && "➜"}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", width: "47%" }}>
          <div className={style.view_changes_items_title}>
            {!newItem.isDeleted
              ? (newItem.isChanged
                ? (`${newItem.currentGroup.shortTitle} : ${newItem.shiftTime}-${newItem.shiftTime + newItem.currentGroup.shiftLength}`)
                : ""
              )
              : (<del>{`${group.shortTitle}: ${item.shiftTime}-${item.shiftTime + group.shiftLength}`}</del>)}
          </div>
          <div className={style.view_changes_items_status}>
            {newItem.isChanged && !newItem.isDeleted
              ? (newItem.itemStatus === "success"
                ? <img src={OkImg} alt="ok" />
                : <img src={ConflCirle} alt="conflict" />
              )
              : ""}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={style.view_changes_container}>
      {content}
    </div>
  );
}
