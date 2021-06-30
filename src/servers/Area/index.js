import request from "../../fetch";
import util from "../../assets/js/util";
//定义终止请求
const abort = {
  abortCityWarningCounts: null,
  abortTownWarningCounts: null,
  abortStationByAIDAndNetType: null,
  abortStationsByKeyword: null
};
const api = {
  //获取告警数量
  getCityWarningCounts: (level) => {
    abort.abortCityWarningCounts && abort.abortCityWarningCounts();//终止请求
    const controller = new AbortController();//重新定义终止
    abort.abortCityWarningCounts = () => controller.abort();//赋值终止
    return request("GET", `/warning_count/warning_count_by_area?level=${level}`, {}, controller.signal);
  },
  getTownWarningCounts: (level, cityName) => {
    abort.abortTownWarningCounts && abort.abortTownWarningCounts();
    const controller = new AbortController();
    abort.abortTownWarningCounts = () => controller.abort();
    return request("GET", `/warning_count/warning_count_by_area?level=${level}&area_name=${cityName}`, {}, controller.signal);
  },
  getStationByAIDAndNetType: (AID, netType) => {
    abort.abortStationByAIDAndNetType && abort.abortStationByAIDAndNetType();
    const controller = new AbortController();
    abort.abortStationByAIDAndNetType = () => controller.abort();
    return request("GET", `/monitoring_manage/get_stations?AID=${AID}&net_type=${netType}`, {}, controller.signal);
  },
  getStationsByKeyword: (params) => {
    abort.abortStationsByKeyword && abort.abortStationsByKeyword();
    const controller = new AbortController();
    abort.abortStationsByKeyword = () => controller.abort();
    return request("GET", `/resource_manager/search_station_by_keyword${util.objToQueryString(params)}`, {}, controller.signal);
  }
};
export { abort };
export default api;

