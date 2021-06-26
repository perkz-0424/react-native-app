import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import UserButton from "../../../../components/UserButton";
import { ActionSheet } from "@ant-design/react-native";
import { connect } from "react-redux";
import config from "../../../../config";
import { clearAllCookie } from "../../../../assets/cookie";
import { data } from "../../../../store/dataSource";

const User = props => {
  const changeTitle = (title) => {
    props.dispatch(dispatch => {
      dispatch({
        type: "TITLE",
        payload: { title }
      });
    });
  };
  const goToMyMessage = () => {
    changeTitle("消息");
    props.navigation.navigate("MyMessage");
  };
  const goToEngineeringManagement = () => {
    changeTitle("工程态列表");
    props.navigation.navigate("EngineeringManagement");
  };
  const goToAboutUs = () => {
    changeTitle("关于我们");
    props.navigation.navigate("AboutUs");
  };
  const goToPerson = () => {
    props.navigation.navigate("Person");
  };
  const callMe = () => {
    Linking.openURL("tel:057188083103").then(() => {});
  };
  const signOut = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        message: "确定退出吗?",
        options: [
          "退出",
          "取消",
        ],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      }, n => {
        if (n === 0) {
          clearDataAndSignOut();
        }
      }
    );
  };
  const clearDataAndSignOut = () => {
    clearAllCookie();//清空cookie
    //重置数据源
    props.dispatch(dispatch => {
      dispatch({ type: "TITLE", payload: { ...data.titles } });
      dispatch({ type: "USER", payload: { ...data.userMessage } });
      dispatch({ type: "AREA", payload: { ...data.ares } });
    });
    props.navigation.navigate("Login");//跳转到登录页
  };
  return (
    <View style={{ width: "100%", flex: 1, backgroundColor: config.bgColor }}>
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
        <UserButton onPress={goToMyMessage}>我的消息</UserButton>
        <UserButton onPress={goToEngineeringManagement}>工程态管理</UserButton>
      </View>
      <View style={{ paddingTop: 10 }}>
        <UserButton onPress={goToAboutUs}>关于我们</UserButton>
        <UserButton onPress={goToPerson}>隐私政策</UserButton>
        <UserButton onPress={callMe}>服务热线</UserButton>
        <UserButton onPress={signOut}>退出</UserButton>
      </View>
    </View>
  );
};

export default connect(state => ({ state }))(User);
