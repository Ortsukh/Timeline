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
