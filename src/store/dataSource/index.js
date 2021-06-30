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
      { level: "station" }
    ],
    level: "province",
    index: 0
  },
  titles: { title: "告警列表" },
  userMessage: { message: {} },
  token: { value: "", decoded: {} }
};
const dataSource = {
  areas: createDataSource("AREA", { ...data.ares }),//地域数据
  titles: createDataSource("TITLE", { ...data.titles }),//Title的组件的title值
  userMessage: createDataSource("USER", { ...data.userMessage }),//用户信息
  token: createDataSource("TOKEN", { ...data.token }),//token
};

export { createDataSource, data };
export default dataSource;
