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
export default titles;
