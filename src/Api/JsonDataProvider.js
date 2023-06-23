

export default class JsonDataProvider {
  static  tools = [
    { name: "Комбайн", assignedOrderId: ["order1", "order2"], category:"Комбайн" },
    {
      name: "Холодильник",
      assignedOrderId: [
        "order3",
        "order4",
        "order5",
        "order6",
        "order7",
        "order8"
      ]
      , category:"Холодильник"
    },
    {
      name: "Холодильник1",
      assignedOrderId: [
        "order23",
        "order24",
        "order25",
      ]
      , category:"Холодильник"
    },
    { name: "Морозильник", assignedOrderId: ["order9", "order10", "order11"] , category:"Морозильник"},
    {
      name: "Чайник",
      assignedOrderId: [
        "order12",
        "order13",
        "order14",
        "order15",
        "order16"
      ], category:"Чайник"
    },
    {
      name: "Плита",
      assignedOrderId: ["order17", "order18", "order19", "order20"], category:"Плита"
    },
    { name: "Скалка", assignedOrderId: ["order21", "order22"], category:"Скалка" },
    {
      name: "Микроволновка",
      assignedOrderId: ["order23", "order24", "order25", "order26"], category:"Микроволновка"
    },
  ]
  static orders = [
    {
      id: "order1",
      from: "2020.02.01 10:00:00",
      to: "2020.02.01 12:00:00"
    },
    {
      id: "order2",
      from: "2020.02.01 16:00:00",
      to: "2020.02.01 18:00:00"
    },
    {
      id: "order3",
      from: "2020.02.01 10:00:00",
      to: "2020.02.01 12:00:00"
    },
    {
      id: "order4",
      from: "2020.02.02 02:00:00",
      to: "2020.02.02 04:00:00"
    },
    {
      id: "order5",
      from: "2020.02.02 10:00:00",
      to: "2020.02.02 12:00:00"
    },
    {
      id: "order6",
      from: "2020.02.03 08:00:00",
      to: "2020.02.03 10:00:00"
    },
    {
      id: "order7",
      from: "2020.02.04 12:00:00",
      to: "2020.02.04 14:00:00"
    },
    {
      id: "order8",
      from: "2020.02.04 16:00:00",
      to: "2020.02.04 18:00:00"
    },
    {
      id: "order9",
      from: "2020.02.01 16:00:00",
      to: "2020.02.01 18:00:00"
    },
    {
      id: "order10",
      from: "2020.02.02 14:00:00",
      to: "2020.02.02 16:00:00"
    },
    {
      id: "order11",
      from: "2020.02.03 18:00:00",
      to: "2020.02.03 20:00:00"
    },
    {
      id: "order12",
      from: "2020.02.01 06:00:00",
      to: "2020.02.01 08:00:00"
    },
    {
      id: "order13",
      from: "2020.02.01 20:00:00",
      to: "2020.02.01 22:00:00"
    },
    {
      id: "order14",
      from: "2020.02.02 08:00:00",
      to: "2020.02.02 10:00:00"
    },
    {
      id: "order15",
      from: "2020.02.03 12:00:00",
      to: "2020.02.03 14:00:00"
    },
    {
      id: "order16",
      from: "2020.02.03 16:00:00",
      to: "2020.02.03 18:00:00"
    },
    {
      id: "order17",
      from: "2020.02.01 14:00:00",
      to: "2020.02.01 16:00:00"
    },
    {
      id: "order18",
      from: "2020.02.02 18:00:00",
      to: "2020.02.02 20:00:00"
    },
    {
      id: "order19",
      from: "2020.02.03 02:00:00",
      to: "2020.02.03 04:00:00"
    },
    {
      id: "order20",
      from: "2020.02.03 20:00:00",
      to: "2020.02.03 22:00:00"
    },
    {
      id: "order21",
      from: "2020.02.01 08:00:00",
      to: "2020.02.01 10:00:00"
    },
    {
      id: "order22",
      from: "2020.02.02 16:00:00",
      to: "2020.02.02 18:00:00"
    },
    {
      id: "order23",
      from: "2020.02.03 20:00:00",
      to: "2020.02.03 22:00:00"
    },
    {
      id: "order24",
      from: "2020.02.01 08:00:00",
      to: "2020.02.01 10:00:00"
    },
    {
      id: "order25",
      from: "2020.02.02 16:00:00",
      to: "2020.02.02 18:00:00"
    },
  ]

  static companies = [
    {
      id:1,
      name: 'title'
    },
    {
      id:2,
      name: 'title1'
    },
    {
      id:3,
      name: 'title2'
    },
    {
      id:4,
      name: 'title3'
    }
  ]

  static add = (order, toolId) => {
    this.orders.push(order)
    this.tools[0].assignedOrderId.push(order.id)
  }

  static callMockApiCall = () => {
    return {
      tools: this.tools,
      orders: this.orders,
      companies: this.companies
    };
  };
}
