import moment from "moment";
import React, { useEffect } from "react";

export default function PreOrderTable({
  itemsPreOrder,
  groups,
  setItemsPreOrder,
  setOrderContent,
}) {
  const handleRemovePreOrderItem = (item) => {
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== item.id));
  };
  const orderContent = [];

  const generateItemsPreOrderWindow = (items) => {
    const result = items.map((item) => {
      const group = groups.find((el) => el.id === item.deviceGroup);
      const data = {
        groupTitle: group.title,
        shiftDate:
          `${item.date
          } ${
            moment(item.start_time).format("HH")
          }-${
            moment(item.end_time).format("HH")}`,
      };
      orderContent.push(data);

      return (
        <div>
          <button type="button" onClick={() => handleRemovePreOrderItem(item)}>x</button>
          <div>{data.groupTitle}</div>
          <div>{data.shiftDate}</div>
        </div>
      );
    });

    return result;
  };

  useEffect(() => {
    setOrderContent(orderContent);
  }, [itemsPreOrder]);

  return <>{generateItemsPreOrderWindow(itemsPreOrder)}</>;
}
