import request from "../../fetch";
//定义终止请求
const userAbort = {
  abortUserInfo: null
};

const api = {
  getUserInfo: (id) => {
    userAbort.abortUserInfo && userAbort.abortUserInfo();
    const controller = new AbortController();
    userAbort.abortUserInfo = () => controller.abort();
    return request("GET", `/user/get_user?id=${id}`, {}, controller.signal);
  }
};
export { userAbort };
export default api;
