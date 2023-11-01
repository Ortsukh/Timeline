import moment from "moment";

const backendUrl = "http://freekitchen.loc/";

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

export async function getRentCompanies() {
  // const str = "http://freekitchen.loc/admin/api/get_companies";
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  return testCompany;
  // return res.json();
}
export async function getUserInfo() {
  // const str = "http://freekitchen.loc/admin/api/get_manager_info";
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  return testUser;
  // return res.json();
}
export async function getOrders() {
  // const str = "http://freekitchen.loc/admin/api/get_orders";http://freekitchen.loc/admin/api/get_orders
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // // console.log("getOrders:", res);
  // return res.json();
  return testOrders;
}
const testUser = {
  lesseeCompanies: 3,
  kitchens: 2,
  kitchensFree: 1,
  equipment: 6,
  equipmentFree: 5,
  marketPlaces: 3,
  name: "Франчайзи 001",
};
const testCompany = [
  {
    id: 23,
    name: "name1",
    lastPlace: "Минск",
    contactPerson: "Олег",
  },
  {
    id: 23,
    name: "name2",
    lastPlace: "Минск",
    contactPerson: "Олег",
  },
  {
    id: 23,
    name: "name3",
    lastPlace: "Минск",
    contactPerson: "Олег",
  }, {
    id: 23,
    name: "name4",
    lastPlace: "Минск",
    contactPerson: "Олег",
  },
  {
    id: 23,
    name: "name5",
    lastPlace: "Минск",
    contactPerson: "Олег",
  },
  {
    id: 23,
    name: "name6",
    lastPlace: "Минск",
    contactPerson: "Олег",
  },

];
const testOrders = [
  {
    id: 272,
    category: "Кухни",
    company: "компания1",
    price: "50.0000",
    total: 400,
    date: "2023-11-01",
    shift: 8,
    status: "Принято",
    equipment: "Кухня 1",
  },
  {
    id: 271,
    category: "Другое",
    company: "Франчайзи 001",
    price: "100.0000",
    total: 100,
    date: "2023-11-01",
    shift: 1,
    status: "Принято",
    equipment: "Альпака",
  },
  {
    id: 270,
    category: "Кухни",
    company: "компания1",
    price: "50.0000",
    total: 400,
    date: "2023-11-01",
    shift: 8,
    status: "Принято",
    equipment: "Кухня 1",
  },
  {
    id: 269,
    category: "Морозилки",
    company: "Франчайзи 001",
    price: "28.0000",
    total: 112,
    date: "2023-11-01",
    shift: 4,
    status: "Принято",
    equipment: "Морозидка",
  },
  {
    id: 268,
    category: "Печи",
    company: "компания1",
    price: "88.0000",
    total: 352,
    date: "2023-11-01",
    shift: 4,
    status: "Принято",
    equipment: "Плавильная печь",
  },
  {
    id: 267,
    category: "Холодильники",
    company: "Франчайзи 001",
    price: "10.0000",
    total: 40,
    date: "2023-11-01",
    shift: 4,
    status: "Принято",
    equipment: "Холодильник Sumsung",
  },
  {
    id: 266,
    category: "Кухни",
    company: "Франчайзи 001",
    price: "50.0000",
    total: 400,
    date: "2023-11-01",
    shift: 8,
    status: "Принято",
    equipment: "Кухня 1",
  },
  {
    id: 265,
    category: "Другое",
    company: "компания",
    price: "5.0000",
    total: 5,
    date: "2023-10-31",
    shift: 1,
    status: "Принято",
    equipment: "Чайник",
  },
  {
    id: 264,
    category: "Кухни",
    company: "компания1",
    price: "50.0000",
    total: 200,
    date: "2023-10-27",
    shift: 4,
    status: "Принято",
    equipment: "Кухня 1",
  },
];
