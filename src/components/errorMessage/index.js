import React from "react";
import { Toast } from "@ant-design/react-native";

const errorMessage = (err = "网络错误") => {
  Toast.info(err, 2);
};

export default errorMessage;
