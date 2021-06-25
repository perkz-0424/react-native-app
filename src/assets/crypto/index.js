/****
 * 加密函数
 * 用于文件
 * src/general/components/ValidatePasswordModal.js
 * src/modules/UserSession/components/LoginForm.jsx
 * 用来加密登录和验证
 * ***/

import CryptoJS from "crypto-js";

// 加密密钥
const key1 = CryptoJS.enc.Utf8.parse("1234567890123456");

export function encrypt (msgString) {
  // msgString is expected to be Utf8 encoded
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(msgString, key1, {
    iv: iv
  });
  return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

export function decrypt (ciphertextStr) {
  const ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

  // split IV and ciphertext
  const iv = ciphertext.clone();
  iv.sigBytes = 16;
  iv.clamp();
  ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
  ciphertext.sigBytes -= 16;

  // decryption
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key1, {
    iv: iv
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
