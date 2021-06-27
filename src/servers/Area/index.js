import request from "../../fetch";
//定义终止请求
const abort = {
  abortCityWarningCounts: null,
};
const api = {
  //获取告警数量
  getCityWarningCounts: (level) => {
    abort.abortCityWarningCounts && abort.abortCityWarningCounts();//终止请求
    const controller = new AbortController();//重新定义终止
    abort.abortCityWarningCounts = () => controller.abort();//赋值终止
    return request("GET", `/warning_count/warning_count_by_area?level=${level}`, {}, controller.signal);
  }
};

export default api;




