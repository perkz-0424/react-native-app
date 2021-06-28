import config from "../../config";
import { getCookie } from "../../assets/cookie";

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
  //发送验证码（手机和验证码都发）
  sendPhoneOrMailVerificationCode: (userName, password, code) => {
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
        }),
      }).then(res => {res.json().then(resolve).catch(reject);}).catch(reject);
    });
  },
  //登录
  onLogin: (userName, password, code, phoneOrMailVerification) => {
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
  },
  //重置密码
  onResetPassword: (oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      getCookie("temp_token").then((token) => {
        fetch(`${config.Url}/user/reset_password`, {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `${token}`
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword
          })
        }).then(res => {res.json().then(resolve).catch(reject);}).catch(reject);
      });
    });
  }
};

export default api;
