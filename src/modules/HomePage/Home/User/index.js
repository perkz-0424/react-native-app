import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import UserButton from "../../../../components/UserButton";

const User = props => {
  return (
    <View style={{ width: "100%", flex: 1, backgroundColor: "rgb(216,222,222)" }}>
      <View style={{ flexDirection: "row", height: 100, backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <View style={{ paddingLeft: 20, paddingTop: 15, paddingBottom: 15 }}>
          <Image
            style={{ width: 60, height: 60, padding: 5, borderRadius: 30 }}
            source={require("../../../../assets/images/icon/user.png")}
          />
        </View>
        <View style={{ paddingLeft: 20, paddingTop: 15, paddingBottom: 15 }}>
          <View style={{ height: 35, justifyContent: "center" }}>
            <TouchableOpacity onPress={() => {props.navigation.navigate("Login");}}>
              <Text style={{ fontSize: 20, color: "#323A3D" }}>登录</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 35, paddingTop: 0, paddingBottom: 10 }}>

        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <UserButton onPress={() => {}}>我的消息</UserButton>
        <UserButton onPress={() => {}}>工程态管理</UserButton>
      </View>
      <View style={{ paddingTop: 10 }}>
        <UserButton onPress={() => {}}>关于我们</UserButton>
        <UserButton onPress={() => {}}>隐私政策</UserButton>
        <UserButton onPress={() => {}}>服务热线</UserButton>
        <UserButton onPress={() => {}}>退出</UserButton>
      </View>
    </View>
  );
};

export default User;
