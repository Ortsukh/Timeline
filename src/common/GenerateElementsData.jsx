import moment from "moment";
import React from "react";
import ITEMS_PREORDER_COLOR from "../constants/itemsPreOrderColor";

export const generateClue = () => {
  const clueContent = [];
  Object.keys(ITEMS_PREORDER_COLOR).forEach((status) => {
    console.log(ITEMS_PREORDER_COLOR[status].backgroundColor);
    clueContent.push(
      <div className="clueItem" key={status}>
        <div
          className="clueItemColor"
          style={{
            backgroundColor: ITEMS_PREORDER_COLOR[status].backgroundColor,
          }}
        />
        <span style={{ maxWidth: 250 }}>
          {` ${ITEMS_PREORDER_COLOR[status].text}`}
        </span>
      </div>,
    );
  });
  return clueContent;
};

export default function generateCheckBox(
  selectedDateSampleGrid,
  handleAddPreOrder,
  itemsPreOrder,
  currentDevice,
  shiftsCount,
) {
  const result = [];
  const keys = Object.keys(selectedDateSampleGrid);

  keys.forEach((key) => {
    result.push(
      <div className="one-date-string" key={key}>
        <p>{moment(key).format("DD-MM-YYYY")}</p>
        <div className="checkboxes" key={key}>
          {selectedDateSampleGrid[key].map((interval) => (
            <label htmlFor={key} key={`${key}-${interval}`}>
              <input
                type="checkbox"
                onChange={(e) => handleAddPreOrder(e.target.value, e.target.checked)}
                checked={itemsPreOrder.find(
                  (item) => item.checkBoxId
                    === `${key} ${interval}-${
                      currentDevice.shiftLength * shiftsCount
                    }`,
                )}
                disabled={itemsPreOrder.find((item) => {
                  if (
                    itemsPreOrder.find(
                      (el) => el.checkBoxId
                        === `${key} ${interval}-${
                          currentDevice.shiftLength * shiftsCount
                        }`,
                    )
                  ) {
                    return false;
                  }
                  return (
                    `${key} ${interval}`
                      === `${item.date} ${moment(item.start_time).format("H")}`
                    || `${key} ${
                      interval + currentDevice.shiftLength * shiftsCount
                    }` === `${item.date} ${moment(item.end_time).format("H")}`
                  );
                })}
                id={`${key} ${interval}-${
                  currentDevice.shiftLength * shiftsCount
                }`}
                value={JSON.stringify({
                  date: key,
                  interval,
                  shiftLength: currentDevice.shiftLength,
                })}
              />
              <span>
                {`${interval}-${
                  Number(interval)
                  + Number(currentDevice.shiftLength * shiftsCount)
                }`}
              </span>
            </label>
          ))}
        </div>
      </div>,
    );
  });
  return result;
}
