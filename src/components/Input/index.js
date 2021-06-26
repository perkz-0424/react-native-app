import React from "react";
import { TextInput } from "react-native";
import Normal from "./Normal";
import Password from "./Password";
import PhoneVerificationCode from "./PhoneVerificationCode";
import ImageVerificationCode from "./ImageVerificationCode";

const Input = (props) => {
  return (
    <TextInput {...props}/>
  );
};
export {
  Normal,//普通输入框
  Password,//密码输入框
  PhoneVerificationCode,//短信验证码输入框
  ImageVerificationCode,//图形验证码输入框
};
export default Input;
