/* eslint-disable no-nested-ternary */
import React from "react";
import style from "../BookingTimeline.module.css";
import { ConflCirle, OkImg } from "../../../../others/importImg";

export default function ViewChanges({
  prevItems, groups, newItems, elementForChange, openOverLay,
}) {
  console.log(prevItems, groups, newItems);
  console.log(elementForChange);
  const newItemsMap = {};
  newItems.forEach((item) => {
    item.currentGroup = groups.find((groupItem) => groupItem.id === item.group);
    newItemsMap[item.id.split("_")[1]] = item;
  });
  console.log(newItemsMap);
  const content = prevItems.map((item) => {
    const group = groups.find((groupItem) => groupItem.id === item.group);
    const newItem = newItemsMap[item.id.split("_")[1]];
    console.log(newItem);
    return (

      <div className={style.view_changes_row} key={item.id}>
        <div className={style.view_changes_items_title}>
          {`${group.shortTitle} : ${item.shiftTime}-${item.shiftTime + group.shiftLength}`}
        </div>
        <div className={style.view_changes_items_status}>
          {item.itemStatus === "success" ? <img src={OkImg} alt="ok" /> : <img src={ConflCirle} alt="conflict" /> }
        </div>
        <div className={style.view_changes_arrow}>
          {newItem.isChanged && "->"}
        </div>
        <div className={style.view_changes_items_title}>

          {!newItem.isDelete ? (newItem.isChanged
            ? (`${newItem.currentGroup.shortTitle} : ${newItem.shiftTime}-${newItem.shiftTime + newItem.currentGroup.shiftLength}`) : "") : (
              <del>{`${group.shortTitle} - ${item.shiftTime}`}</del>)}
        </div>
        <div className={style.view_changes_items_status}>
          {newItem.isChanged ? (newItem.itemStatus === "success" ? <img src={OkImg} alt="ok" /> : <img src={ConflCirle} alt="conflict" />) : "" }
        </div>
      </div>
    );
  });

  return (
    <div className={style.view_changes_container}>
      {content}
      {elementForChange
        ? <button type="button">Delete</button>
        : <button type="button" onClick={openOverLay}>Add new</button>}
    </div>
  );
}
