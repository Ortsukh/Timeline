import moment from "moment";

export const generateCheckBox = (
  selectedDateSampleGrid,
  handleAddPreOrder,
  itemsPreOrder,
  currentDevice,
  shiftsCount
) => {
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
                    } else
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
