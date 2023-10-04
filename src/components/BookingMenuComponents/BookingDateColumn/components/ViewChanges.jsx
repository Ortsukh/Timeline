import React from "react";
import style from "../BookingTimeline.module.css";
import { ConflCirle, OkImg } from "../../../../others/importImg";

export default function ViewChanges({ PrevItems, groups, newItems }) {
  const newItemsMap = {};
  newItems.forEach((item) => {
    newItemsMap[item.id.split("_")[1]] = item;
  });
  const content = PrevItems.map((item) => {
    const group = groups.find((groupItem) => groupItem.id === item.group);
    return (

      <div className={style.view_changes_row}>
        <div className={style.view_changes_prev_items}>
          {`${group.shortTitle} - ${item.shiftTime}`}
        </div>
        <div className={style.view_changes_prev_items_status}>
          {item.status === "success" ? <img src={OkImg} alt="ok" /> : <img src={ConflCirle} alt="conflict" /> }
        </div>
        <div className={style.view_changes_arrow}>
          {"->"}
        </div>
        <div className={style.view_changes_new_items}>
          {!newItemsMap[item.id.split("_")[1]].isDeleted ? (newItemsMap[item.id.split("_")[1]].isChanged ? (`${group.shortTitle} - ${item.shiftTime}`) : "") : (
            <span>{`${group.shortTitle} - ${item.shiftTime}`}</span>)}
        </div>
        <div className={style.view_changes_new_items_status}>
          {item.status === "success" ? <img src={OkImg} alt="ok" /> : <img src={ConflCirle} alt="conflict" /> }
        </div>
      </div>
    );
  });

  return (
    <div className={style.view_changes_container}>
      {content}
      <button>Add new</button>
      <button>Delete</button>
    </div>
  );
}
