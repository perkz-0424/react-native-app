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
export default areas;
