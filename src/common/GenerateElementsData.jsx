import moment from "moment";
import React from "react";
import ITEMS_PREORDER_COLOR from "../constants/itemsPreOrderColor";
import ITEM_COLOR_INFO from "../constants/itemTimelineColorInfo";

export const generateClue = (statusPage) => {
  let colorConstant = "";
  switch (statusPage) {
    case "BOOKING_CALENDAR":
      colorConstant = ITEMS_PREORDER_COLOR;
      break;
    case "TIMELINE_ROLE_MANAGER_MAIN":
      colorConstant = ITEM_COLOR_INFO.role_manager.main;
      break;
    case "TIMELINE_ROLE_MANAGER_CONFLICT":
      colorConstant = ITEM_COLOR_INFO.role_manager.conflict;
      break;
    case "TIMELINE_ROLE_COMPANY_MAIN":
      colorConstant = ITEM_COLOR_INFO.role_company.main;
      break;
    case "TIMELINE_ROLE_COMPANY_CONFLICT":
      colorConstant = ITEM_COLOR_INFO.role_company.conflict;
      break;
    default:
      colorConstant = "";
  }
  const clueContent = [];
  Object.keys(colorConstant).forEach((status) => {
    clueContent.push(
      <div className="clueItem" key={status}>
        <div
          className="clueItemColor"
          style={{
            backgroundColor: colorConstant[status].backgroundColor,
            backgroundImage: colorConstant[status].backgroundImage,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            border: colorConstant[status].border,
            boxSizing: "border-box",
          }}
        />
        <span style={{ maxWidth: 250 }}>
          {` ${colorConstant[status].text}`}
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

export const getStatusComponent = (status) => {
  let result = "";
  console.log(status);
  switch (status) {
    case "Принято":
      result = <td className="badge badge-success">{status}</td>;
      break;

    case "Новый":
      result = <td className="badge badge-info">{status}</td>;
      break;

    case "В работе":
      result = <td className="badge badge-warning">{status}</td>;
      break;

    case "Отменен":
      result = <td className="badge badge-danger">{status}</td>;
      break;

    default:
      result = <td> </td>;
  }
  return result;
};
