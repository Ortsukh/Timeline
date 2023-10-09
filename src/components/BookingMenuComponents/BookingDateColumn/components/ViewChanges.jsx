/* eslint-disable no-nested-ternary */
import React from "react";
import { ConflCirle, OkImg } from "../../../../others/importImg";
import style from "../BookingTimeline.module.css";

export default function ViewChanges({
  prevItems, groups, newItems, elementForChange,
}) {
  // console.log(prevItems, groups, newItems);
  const newItemsMap = {};
  newItems.forEach((item) => {
    item.currentGroup = groups.find((groupItem) => groupItem.id === item.group);
    newItemsMap[item.id.split("_")[1]] = item;
  });
  // console.log("newItemsMap", newItemsMap);
  const content = prevItems.map((item) => {
    const group = groups.find((groupItem) => groupItem.id === item.group);
    const newItem = newItemsMap[item.id.split("_")[1]];
    // console.log("item", item.id, elementForChange?.id);
    const isActiveItemStyle = item.id.split("_")[1] === elementForChange?.id.split("_")[1] ? { backgroundColor: "#ccc903" } : {};
    return (
      <div className={style.view_changes_row} style={isActiveItemStyle} key={item.id}>
        <div className={style.view_changes_items_title}>
          {`${group.shortTitle} : ${item.shiftTime}-${item.shiftTime + group.shiftLength}`}
        </div>
        <div className={style.view_changes_items_status}>
          {item.itemStatus === "success"
            ? <img src={OkImg} alt="ok" />
            : <img src={ConflCirle} alt="conflict" /> }
        </div>
        <div className={style.view_changes_arrow}>
          {newItem.isChanged && "➜"}
        </div>
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
    );
  });

  return (
    <div className={style.view_changes_container}>
      {content}
    </div>
  );
}
