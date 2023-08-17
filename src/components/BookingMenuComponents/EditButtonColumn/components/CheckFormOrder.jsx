import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import { addGrid, groupByDateItems } from "../../../../common/DataConvertHelper";
import { generateCheckBox } from "../../../../common/GenerateElementsData";

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
  var currentDate = startDate.clone();
  const selectedDateSampleGrid = {};

  while (currentDate.isSameOrBefore(endDate)) {
    selectedDateSampleGrid[currentDate.clone().format("YYYY-MM-DD")] = "".padStart(
      24,
      "0"
    );
    currentDate.add(1, "days");
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

  return <>{generateCheckBox (selectedDateSampleGrid, handleAddPreOrder, itemsPreOrder, currentDevice, shiftsCount)}</>;
};
