import request from "../../fetch";
import config from "../../config";

const api = {
  //获取图形验证码
  getVerificationCode: () => {
    return new Promise((resolve, reject) => {
      fetch(`${config.Url}/user/code`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(res => {res.json().then(resolve).catch(reject);}).catch(reject);
    });
  },
  //发送验证码
  sendPhoneOrMailVerificationCode: (userName, password, code, method) => {
    return new Promise((resolve, reject) => {
      fetch(`${config.Url}/user/get_login_verify`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          email: userName,
          password,
          code,
          method,
        }),
      }).then(res => {res.json().then(resolve).catch(reject);}).catch(reject);
    });
  },
  //登录
  getLogin: (userName, password, code, phoneOrMailVerification) => {
    return new Promise((resolve, reject) => {
      fetch(`${config.Url}/user/login_verify`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          email: userName,
          password,
          code,
          phone_or_mail_verification: phoneOrMailVerification,
        }),
      }).then(res => {res.json().then(resolve).catch(reject);}).catch(reject);
    });
  }
};

export default api;
