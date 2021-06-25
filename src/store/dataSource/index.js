const createDataSource = (type, data) => {
  return (state = data, action) => {
    switch (action.type) {
      case type:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
};
const dataSource = {
  /*地域数据*/
  areas: createDataSource("AREA", {
    data: [{ level: "province", name: "浙江省" }, { level: "city" }, { level: "town" }, { level: "station" }],
    level: "province", index: 0
  }),
  /*Title的组件的title值*/
  titles: createDataSource("TITLE", { title: "告警列表" }),
  /*用户信息*/
  userMessage: createDataSource("USERMESSAGE", {}),
};

export { createDataSource };
export default dataSource;
