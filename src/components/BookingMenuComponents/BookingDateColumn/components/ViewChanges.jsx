/* eslint-disable no-nested-ternary */
import React from "react";
import { ConflCirle, OkImg } from "../../../../others/importImg";
import buttonTitleConstants from "../../../../constants/buttonTitleConstants";
import style from "../BookingTimeline.module.css";
import styleConflict from "../ConflictResolutionWindow/Conflict.module.css";

export default function ViewChanges({
  prevItems, groups, newItems, elementForChange, openOverLay, setIsAddNewItem, handleDeleteItem,
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
    const isActiveItemStyle = item.id === elementForChange?.id ? { border: "1px solid #ccc903" } : {};
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
          {newItem.isChanged && "->"}
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
  const handleClickAddNew = () => {
    setIsAddNewItem(true);
    openOverLay(true);
  };
  return (
    <div className={style.view_changes_container}>
      {content}
      {elementForChange
        ? (
          <button
            type="button"
            className={styleConflict.rejectBtn}
            onClick={() => handleDeleteItem()}
          >
            {buttonTitleConstants.DELETE}
          </button>
        )
        : (
          <button
            type="button"
            className={styleConflict.resolveBtn}
            onClick={() => handleClickAddNew()}
          >
            {buttonTitleConstants.ADD_NEW}
          </button>
        )}
    </div>
  );
}
