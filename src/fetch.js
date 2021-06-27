/**fetch封装**/
import config from "./config";
import { getCookie } from "./assets/cookie";

const { Url } = config;
const request = (method, url, body = {}, signal = null) => {
  if (method.toUpperCase() === "GET" || method.toUpperCase() === "HEAD") {
    return new Promise((resolve, reject) => {
      getCookie("token").then(token => {
        fetch(`${Url}${url}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `${token}`
          },
          method,
          signal,
        }).then(res => {
          res.json().then(resolve).catch(reject);
        }).catch(reject);
      }).catch(reject);
    });
  } else {
    return new Promise((resolve, reject) => {
      getCookie("token").then((token) => {
        fetch(`${Url}${url}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `${token}`
          },
          method,
          signal,
          body: JSON.stringify({ ...body }),
        },).then(res => {
          res.json().then(resolve).catch(reject);
        },).catch(reject);
      }).catch(reject);
    });
  }
};
export default request;
