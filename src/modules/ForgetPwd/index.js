import React from "react";
import { View, Dimensions, Image } from "react-native";
import Title from "../../components/Title";

const ForgetPwd = (props) => {
  const onBackPress = () => {
    props.navigation.goBack();
    return true;
  };
  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <Title
        title="重置密码"
        onLeftPress={onBackPress}
        titleLeft={<Image style={{ width: 12, height: 18 }} source={require("../../assets/images/icon/back.png")}/>}
      />
    </View>
  );
};
export default ForgetPwd;
