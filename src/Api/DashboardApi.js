/* eslint-disable */
import moment from "moment";

export const getProfitData = (start, end) => {
  const generateTimeRangeData = () => {
    let day = moment(start);
    const result = [];
    while (day.isSameOrBefore(moment(end))) {
      const profitValue = Math.floor(Math.random() * 3000);
      const profitDate = day.format("YYYY-MM-DD");
      result.push({
        y: profitValue, x: profitDate,
      });
      day = day.add(1, "day");
    }
    return result;
  };

  return new Promise((resolve) => {
    resolve(generateTimeRangeData());
  });
};
