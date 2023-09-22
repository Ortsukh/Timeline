const ITEMS_PREORDER_COLOR = {
  empty: {
    backgroundColor: "#90ef90",
    text: "Свободно.",
  },
  orderedButFreeInOtherEquipment: {
    backgroundColor: "#ffd884",
    text: "Занято, но можно выбрать другое оборудование в эту смену.",
  },
  orderedInAllEquipment: {
    backgroundColor: "#ffa4a4",
    text: "Занято на всех оборудованиях в эту смену.",
  },
  orderedInThisShiftAndNear: {
    backgroundColor: "#100e0e",
    text: "Занято на всех оборудованиях на эту и соседние смены.",
  },
};

export default ITEMS_PREORDER_COLOR;
