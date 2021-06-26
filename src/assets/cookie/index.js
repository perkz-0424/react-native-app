import cookieManager from "react-native-cookie";
import config from "../../config";

//存cookie
const setCookie = (key, value) => {
  cookieManager.set(config.Url, key, value).then(cookie => {
    return cookie;
  });
};

//取cookie
const getCookie = (key) => {
  return new Promise((resolve, reject) => {
    cookieManager.get(config.Url, key).then(resolve).catch(reject);
  });
};

//清除cookie
const clearAllCookie = () => {
  return new Promise((resolve, reject) => {
    cookieManager.clear(config.Url).then(resolve).catch(reject);
  });
};

export {
  setCookie, getCookie, clearAllCookie
};
