/*地域数据*/
const areas = (state = {
  data: [
    { name: "浙江省", level: "province" },
    { level: "city" },
    { level: "town" },
    { level: "station" }
  ]
}, action) => {
  switch (action.type) {
    case "AREA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
/*地域等级*/
const level = (state = {
  level: "province",
  index: 0
}, action) => {
  switch (action.type) {
    case "LEVEL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
/*Title的组件的title值*/
const titles = (state = {
  title: "告警列表"
}, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export { areas, titles, level };
