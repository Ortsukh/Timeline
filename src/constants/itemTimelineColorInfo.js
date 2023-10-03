import { ConflCirle } from "../others/importImg";

const ITEM_COLOR_INFO = {
  role_manager: {
    main: {
      accepted: {
        backgroundColor: "#464040", // условно чёрный
        backgroundImage: "none",
        border: "none",
        text: "Бронирование подтверждено.",
      },
      // rejected: {
      //   backgroundColor: "#f03333", // красный
      //   text: "Отклонённое бронирование.",
      // },
      pending: {
        backgroundColor: "#ff9900", // жёлтый
        backgroundImage: "none",
        border: "none",
        text: "В ожидании подтверждения.",
      },
    },
    conflict: {
      accepted: {
        backgroundColor: "#ffa4a4", // светло-красный
        backgroundImage: "none",
        border: "none",
        text: "Смена забронирована.",
      },
      addShift: {
        backgroundColor: "#90ef90", // светло-зелёный
        backgroundImage: "none",
        border: "none",
        text: "Выбранная Вами смена.",
      },
      changedShift: {
        backgroundColor: "none", // серый
        backgroundImage: "none",
        border: "2px solid yellow",
        text: "Нажатая Вами смена.",
      },
      conflictShift: {
        backgroundColor: "#ffa4a4", // серый
        backgroundImage: `url(${ConflCirle})`,
        border: "none",
        text: "Конфликтная смена.",
      },
    },
  },
  role_company: {
    main: {
      accepted: {
        backgroundColor: "#90ef90", // светло-зелёный
        backgroundImage: "none",
        border: "none",
        text: "Забронирована Вами.",
      },
      pending: {
        backgroundColor: "#ffd884", // светло-жёлтый
        backgroundImage: "none",
        border: "none",
        text: "Ваше бронирование в ожидании подтверждения.",
      },
      other: {
        backgroundColor: "#ffa4a4", // светло-красный
        backgroundImage: "none",
        border: "none",
        text: "Забронирована другим клиентом.",
      },
    },
    conflict: {
      accepted: {
        backgroundColor: "#ffa4a4", // светло-красный
        backgroundImage: "none",
        border: "none",
        text: "Смена забронирована.",
      },
      addShift: {
        backgroundColor: "#90ef90", // светло-зелёный
        backgroundImage: "none",
        border: "none",
        text: "Выбранная Вами смена.",
      },
      changedShift: {
        backgroundColor: "none", // серый
        backgroundImage: "none",
        border: "2px solid yellow",
        text: "Нажатая Вами смена.",
      },
      conflictShift: {
        backgroundColor: "#ffa4a4", // серый
        backgroundImage: `url(${ConflCirle})`,
        border: "none",
        text: "Конфликтная смена.",
      },
    },
  },
};

export default ITEM_COLOR_INFO;
