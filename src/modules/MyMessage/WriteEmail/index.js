import React, { useState } from "react";
import { View, Text } from "react-native";

const WriteEmail = props => {
  const writeMessage = () => {
    props.sendMessageInfo({});
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Text>写邮件</Text>
    </View>
  );
};

export default WriteEmail;
