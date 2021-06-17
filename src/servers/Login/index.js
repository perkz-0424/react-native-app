import request from "../../fetch";
import config from "../../config";

const api = {
  getVerificationCode: () => {
    return new Promise((resolve, reject) => {
      fetch(`${config.Url}/user/code`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(res => {res.json().then(resolve).catch(reject);}).catch(reject);
    });

  },
};

export default api;
