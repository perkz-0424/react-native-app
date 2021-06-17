/**fetch封装**/
import config from "./config";

const { Url } = config;
const request = (method, url, signal, body) => {
  return new Promise((resolve, reject) => {
    fetch(`${Url}${url}`, {
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        method, signal, body,
      },).then(res => {
        res.json().then(resolve).catch(reject);
      },).catch(reject);
  });
};
export default request;
