import moment from "moment";
import { useEffect } from "react";

export const PreOrderTable = ({
  itemsPreOrder,
  groups,
  setItemsPreOrder,
  setOrderContent,
}) => {

  const handleRemovePreOrderItem = (item) => {
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== item.id));
  };
  const orderContent = [];

  const generateItemsPreOrderWindow = (itemsPreOrder) => {
    const result = itemsPreOrder.map((item) => {
      const group = groups.find((group) => group.id === item.deviceGroup);
      const data = {
        groupTitle: group.title,
        shiftDate:
          item.date +
          " " +
          moment(item.start_time).format("HH") +
          "-" +
          moment(item.end_time).format("HH"),
      };
      orderContent.push(data);

      return (
        <div>
          <button onClick={() => handleRemovePreOrderItem(item)}>{"x"}</button>
          <div>{data.groupTitle}</div>
          <div>{data.shiftDate}</div>
        </div>
      );
    });

    return result;
  };

  useEffect(()=> {
      setOrderContent(orderContent);
  },[itemsPreOrder])


  return <>{generateItemsPreOrderWindow(itemsPreOrder)}</>;
};
