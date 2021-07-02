import React from "react";
import { View, Text } from "react-native";

const EmailList = props => {
  //前往详情页
  const gotoEmailDetails = (item) => {
    props.changeTitle("邮件详情");
    props.navigate("EmailDetails", { item });
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Text>邮件列表</Text>
    </View>
  );
};

export default EmailList;
