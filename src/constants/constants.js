const orderStatus = {
  accepted: {
    title: "accepted",
    color: "#4c7fe5",
    backgroundColor: "#4c7fe5",
    translate: "Подтвержден",
    text: "1 Подтвержден",
  },
  rejected: {
    title: "rejected",
    color: "#f03333",
    backgroundColor: "#f03333",
    translate: "Отклонен",
    text: "2 Отклонен",
  },
  pending: {
    title: "pending",
    color: "#ff9900",
    backgroundColor: "#ff9900",
    translate: "Ожидание",
    text: "3 Ожидание",
  },
  booked: {
    color: "#464040",
    backgroundColor: "#464040",
    text: "4 забронированно",
  },
  otherPending: {
    color: "#c54343",
    backgroundColor: "#c54343",
    text: "5 иным забронированно",
  },
  franchise: {
    color: "#2780FCFF",
    backgroundColor: "#2780FCFF",
    text: "6 франчизи",
  },
};

export default orderStatus;
