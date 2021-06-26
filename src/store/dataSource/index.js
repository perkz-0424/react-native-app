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
//数据源
const data = {
  ares: {
    data: [
      { level: "province", name: "浙江省" },
      { level: "city" },
      { level: "town" },
      { level: "station" }],
    level: "province",
    index: 0
  },
  titles: { title: "告警列表" },
  userMessage: { message: {} }
};
const dataSource = {
  /*地域数据*/
  areas: createDataSource("AREA", { ...data.ares }),
  /*Title的组件的title值*/
  titles: createDataSource("TITLE", { ...data.titles }),
  /*用户信息*/
  userMessage: createDataSource("USER", { ...data.userMessage }),
};

export { createDataSource, data };
export default dataSource;
