import React, { useState } from "react";
import { View } from "react-native";
import Title from "../../components/Title";
import Password from "../../components/Input/Password";

const ForcedPasswordChange = (props) => {
  const [oldPassword, set_oldPassword] = useState("");//旧密码
  /*旧密码*/
  const oldPasswordChange = text => {
    set_oldPassword(text);
  };
  return (
    <View>
      <Title title="重置密码"/>
      <View>
        <Password
          placeholder="输入旧密码"
          onChangeText={oldPasswordChange}
          value={oldPassword}
        />
      </View>
    </View>
  );
};
export default ForcedPasswordChange;
