/*地域数据*/
const areas = (state = {
  data: "浙江省"
}, action) => {
  switch (action.type) {
    case "AREA":
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
export { areas, titles };
