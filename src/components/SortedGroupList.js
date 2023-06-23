import React from "react";
import SortedGroupItem from "./SortedGroupItem";

export default function SortedGroupList({ groups, romoveItem }) {
  return (
    <div onClick={romoveItem}>
      {groups.map((group) => (
        <SortedGroupItem group={group} key={group} />
      ))}
    </div>
  );
}
