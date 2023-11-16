//! Когда появяться Разделы раскомментить
// const priority = [
//   { chapter: "Кухни", category: ["Кухни", "Цеха"] },
//   { chapter: "Холодильное оборудование", category: ["Холодильники", "Морозилки"] },
//   { chapter: "Тепловое оборудование", category: ["Печи", "Фритюр"] },
//   { chapter: "Другое", category: "Другое" },
// ];
//
// const getIndPrChapt = (name) => priority.findIndex((el) => el.chapter === name);
// const getIndPrCat = (index, name) => (
//   priority[index].category.findIndex((el) => el === name)
// );
//
// const sortingArrayGroups = (array) => {
//   const sorted = array.toSorted((a, b) => {
//     const indA = getIndPrChapt(a.chapter);
//     const indB = getIndPrChapt(b.chapter);
//
//     if (indA(a) < indB(b)) return -1;
//     if (indA(a) > indB(b)) return 1;
//
//     // Если одинаковые разделы, то сравниваем по полю категории
//     // if (getIndPrCat(indA, a.category) < getIndPrCat(indB, b.category)) return -1;
//     // if (getIndPrCat(indA, a.category) > getIndPrCat(indB, b.category)) return 1;
//
//     Если в одном разделе, то сравниваем по алфавиту
//     if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
//     if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
//
//     return 0;
//   });
//   return sorted;
// };

const categoryPriority = [
  "Кухни", "Цеха",
  "Холодильники", "Морозилки",
  "Печи", "Фритюр",
  "Другое",
];
// const chapterPriority = ["Кухни", "Холодильное оборудование", "Тепловое оборудование", "Другое"];

const sortingArrayGroups = (array) => {
  const sorted = array.sort((a, b) => {
    // if (chapterPriority.indexOf(a.chapter) < chapterPriority.indexOf(b.chapter)) return -1;
    // if (chapterPriority.indexOf(a.chapter) > chapterPriority.indexOf(b.chapter)) return 1;

    // Если одинаковые разделы, то сравниваем по полю категории
    const indexCategory = (category) => categoryPriority.indexOf(category);
    if (indexCategory(a.category) < indexCategory(b.category)) return -1;
    if (indexCategory(a.category) > indexCategory(b.category)) return 1;

    // Если в одном разделе, то сравниваем по алфавиту
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;

    return 0;
  });
  return sorted;
};

export default sortingArrayGroups;
