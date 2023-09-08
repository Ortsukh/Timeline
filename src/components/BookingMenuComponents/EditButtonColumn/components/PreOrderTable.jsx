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

  const generateItemsPreOrderWindow = (items) => items.map((item) => {
    const group = groups.find((el) => el.id === item.deviceGroup);
    const data = {
      groupTitle: group.title,
      pricePerShift: group.price,
      shiftDate:
            `${moment(item.date).format("DD-MM-YYYY")
            } ${
              moment(item.start_time).format("HH")
            }-${
              moment(item.end_time).format("HH")}`,
    };
    orderContent.push(data);

    return (
      <div className="preOrder itemPreOrder" key={item.id}>
        <div className="preOrderContent">
          <div>{data.groupTitle}</div>
          <div>{data.shiftDate}</div>
        </div>

        <button className="cross" type="button" onClick={() => handleRemovePreOrderItem(item)}>x</button>

      </div>
    );
  });

  useEffect(() => {
    setOrderContent(orderContent);
  }, [itemsPreOrder]);

  return <>{generateItemsPreOrderWindow(itemsPreOrder)}</>;
}
