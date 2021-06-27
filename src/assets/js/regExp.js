const regExps = {
  mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,//邮件1
  phoneNumber: /^1\d{10}$/,//手机号
  sendMail: /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/,//邮件2
  password: new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}"),//密码
  haveChinese: new RegExp("[\\u4E00-\\u9FFF]+"),//匹配双字节字符
  haveChineseGlobal:  new RegExp("[\\u4E00-\\u9FFF]+", "g"),//匹配双字节字符
  specialCharacters: /[\t\n\r\v\f ]/,//检索特殊字符
  specialCharactersGlobal: /[\t\n\r\v\f ]/g,
  number: /[^\d/]/g//数字
};
export default regExps;
