import React, { useState } from "react";
import { View, Text, Platform, Dimensions, Image, StyleSheet } from "react-native";
import Title from "../../components/Title";
import config from "../../config";
import EmailList from "./EmailList";
import EmailDetails from "./EmailDetails";
import WriteEmail from "./WriteEmail";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MyMessage = props => {
  const [title, set_title] = useState("消息");
  const leftIcon = () => {
    return (
      <Image
        style={styles.img}
        source={require("../../assets/images/icon/back.png")}
      />
    );
  };
  const rightIcon = () => {
    switch (title) {
      case "消息":
        return <Text style={styles.message}>+</Text>;
      case "写信息":
        return <View style={styles.write}><Text style={styles.text}>发送</Text></View>;
      default:
        return null;
    }
  };
  //发送邮件
  const sendEmail = () => {

  };
  const changeTitle = (message) => {
    set_title(message);
  };
  const goWriteEmail = () => {
    switch (title) {
      case "消息":
        changeTitle("写信息");
        props.navigation.navigate("WriteEmail");
        break;
      case "写信息":
        sendEmail();
        break;
      default:
    }
  };
  const goBack = () => {
    switch (title) {
      case "消息":
        props.navigation.goBack();
        break;
      default:
        changeTitle("消息");
        props.navigation.navigate("EmailList");
    }
  };

  //写邮件
  const sendMessageInfo = (message) => {

  };
  return (
    <View style={styles.container}>
      <Title
        title={title}
        titleLeft={leftIcon()}
        titleRight={rightIcon()}
        onLeftPress={goBack}
        onRightPress={goWriteEmail}
      />
      <Stack.Navigator initialRouteName="EmailList">
        <Stack.Screen
          key="消息"
          name="EmailList"
          options={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          {() => <EmailList changeTitle={changeTitle} navigate={props.navigation.navigate}/>}
        </Stack.Screen>
        <Stack.Screen
          key="邮件详情"
          name="EmailDetails"
          options={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          {() => <EmailDetails/>}
        </Stack.Screen>
        <Stack.Screen
          key="写信息"
          name="WriteEmail"
          options={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          {() => <WriteEmail sendMessageInfo={sendMessageInfo}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25
  },
  bg: {
    width: "100%",
    flex: 1,
    backgroundColor: config.bgColor
  },
  img: {
    width: 12,
    height: 18
  },
  message: {
    fontSize: 25,
    fontWeight: "200",
    color: "#2f5694"
  },
  write: {
    width: 60,
    height: "80%",
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#2f5694",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: "#FFF"
  }

});
export default MyMessage;
