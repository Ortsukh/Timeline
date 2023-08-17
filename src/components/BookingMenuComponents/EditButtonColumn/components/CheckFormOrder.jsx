import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import { addGrid } from "../../../../DataConvertHelper";

export const CheckFormOrder = ({
  items,
  currentDevice,
  shiftsCount,
  orderDate,
  setItemsPreOrder,
  itemsPreOrder,
}) => {
  const startDate = moment(orderDate.selection1.startDate).startOf("day");
  const endDate = moment(orderDate.selection1.endDate).startOf("day");
  var now = startDate.clone();
  const selectedDateSampleGrid = {};

  while (now.isSameOrBefore(endDate)) {
    selectedDateSampleGrid[now.clone().format("YYYY-MM-DD")] = "".padStart(
      24,
      "0"
    );
    now.add(1, "days");
  }
  const filteredItems = items.filter(
    (item) =>
      item.group === currentDevice.id &&
      moment(item.date).isSameOrAfter(startDate) &&
      moment(item.date).isSameOrBefore(endDate)
  );
  const sampleStr =
    "".padStart(currentDevice.shiftLength, "0") +
    `(?=${"".padStart(currentDevice.shiftLength * shiftsCount, "0")})`;
  const regexp = new RegExp(sampleStr, "g");
  const groupByDateItems = (items) => {
    const dateObj = {};

    items.forEach((item) => {
      if (!dateObj[item.date]) {
        dateObj[item.date] = [];
      }
      dateObj[item.date].push(item.grid);
    });

    for (const key in dateObj) {
      let partA = 2000000000000;
      let partB = 2000000000000;
      dateObj[key].forEach((grid) => {
        partA += Number(grid.slice(0, 12));
        partB += Number(grid.slice(12, 24));
      });

      dateObj[key] = String(partA).slice(1, 13) + String(partB).slice(1, 13);
    }

    return dateObj;
  };

  const groupedItems = groupByDateItems(filteredItems);

  for (const key in selectedDateSampleGrid) {
    let result = groupedItems[key] || selectedDateSampleGrid[key];
    const matchResult = result.matchAll(regexp);
    const matchResultArr = Array.from(matchResult);
    selectedDateSampleGrid[key] = matchResultArr.map((el) =>
      el.index !== undefined ? el.index : null
    );
  }

  const handleAddPreOrder = (value, checked) => {
    const data = JSON.parse(value);

    if (checked) {
      const result = [];
      const today = moment().format("YYYY-MM-DD");
      for (let i = 0; i < shiftsCount; i++) {
        const correctDate = data.interval + currentDevice.shiftLength * i;
        const formatHour = Math.floor(
          Number(correctDate) / Number(currentDevice.shiftLength)
        );
        const formatedDate = {
          start: today + " " + correctDate + ":00",
          end:
            today +
            " " +
            (Number(correctDate) + Number(currentDevice.shiftLength)) +
            ":00",
        };

        const obj = {
          id: uuidv4(),
          group: data.date,
          status: "preOrder",
          canMove: false,
          date: data.date,
          grid: addGrid(formatHour, currentDevice.shiftLength),
          start_time: moment(formatedDate.start).valueOf(),
          end_time: moment(formatedDate.end).valueOf(),
          itemTouchSendsClick: false,
          itemProps: { style: { background: "gray" } },
          deviceGroup: currentDevice.id,
          checkBoxId:
            data.date +
            " " +
            data.interval +
            "-" +
            currentDevice.shiftLength * shiftsCount,
        };
        result.push(obj);
      }

      setItemsPreOrder((pred) => [...pred, ...result]);
    } else {
      for (let i = 0; i < shiftsCount; i++) {
        setItemsPreOrder((pred) =>
          pred.filter(
            (item) =>
              item.checkBoxId !==
              data.date +
                " " +
                data.interval +
                "-" +
                currentDevice.shiftLength * shiftsCount
          )
        );
      }
    }
  };

  const generateCheckBox = (selectedDateSampleGrid) => {
    const result = [];

    for (const key in selectedDateSampleGrid) {
      result.push(
        <div className="one-date-string">
          <p>{key}</p>
          <div className="checkboxes" key={key}>
            {selectedDateSampleGrid[key].map((interval) => {
              return (
                <label htmlFor={key}>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleAddPreOrder(e.target.value, e.target.checked)
                    }
                    checked={itemsPreOrder.find(
                      (item) =>
                        item.checkBoxId ===
                        key +
                          " " +
                          interval +
                          "-" +
                          currentDevice.shiftLength * shiftsCount
                    )}
                    disabled={itemsPreOrder.find((item) => {
                
                      if (
                        itemsPreOrder.find(
                            (item) =>
                              item.checkBoxId ===
                              key +
                                " " +
                                interval +
                                "-" +
                                currentDevice.shiftLength * shiftsCount
                          )
                      ) {
                        return false;
                      }else 
                      return (
                        key + " " + interval ===
                          item.date +
                            " " +
                            moment(item.start_time).format("H") ||
                        key +
                          " " +
                          (interval +
                            currentDevice.shiftLength * shiftsCount) ===
                          item.date + " " + moment(item.end_time).format("H")
                      );
                    })}
                    id={
                      key +
                      " " +
                      interval +
                      "-" +
                      currentDevice.shiftLength * shiftsCount
                    }
                    value={JSON.stringify({
                      date: key,
                      interval: interval,
                      shiftLength: currentDevice.shiftLength,
                    })}
                  />
                  <span>
                    {interval +
                      "-" +
                      (Number(interval) +
                        Number(currentDevice.shiftLength * shiftsCount))}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }
    return result;
  };

  return <>{generateCheckBox(selectedDateSampleGrid)}</>;
};
