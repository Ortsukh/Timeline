import { DateRangePicker } from "react-date-range";
import React, { useState } from "react";
import moment from "moment/moment";
import locale from "date-fns/locale/ru";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ru from "date-fns/locale/ru";

export default function CalendarDashboard({ setSelctedTime }) {
  const [orderDate, setOrderDate] = useState({
    selection1: {
      startDate: new Date(moment().add(-7, "days").valueOf()),
      endDate: new Date(),
      key: "selection1",
    },
  });
  console.log(ru);
  const isActiveDate = true;
  const handleChangeDate = (time) => {
    console.log(time);
  };
  return (
    <div className={isActiveDate ? "active" : "hidden"}>
      <DateRangePicker
        locale={ru}
        onChange={(item) => setOrderDate({ ...orderDate, ...item })}
        ranges={[orderDate.selection1]}
      />
    </div>
  );
}
