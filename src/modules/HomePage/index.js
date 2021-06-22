import React, { useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View, Dimensions, Platform, Text, Image } from "react-native";
import { connect } from "react-redux";
import Title from "../../components/Title";
import Home from "./Home";
import Area from "./Area";
import MyMessage from "./MyMessage";
import EngineeringManagement from "./EngineeringManagement";
import AboutUs from "./AboutUs";

const Stack = createStackNavigator();
const HomePage = (props) => {
  const title = props.state.titles.title;
  const area = props.state.areas.data;
  const [backTitle, set_backTitle] = useState("告警列表");
  const changeTitle = (title) => {
    props.dispatch(dispatch => {
      dispatch({
        type: "TITLE",
        payload: { title }
      });
    });
  };
  /*title左边的地域或者返回按钮*/
  const onAreaOrBack = () => {
    if (titles[0].includes(title)) {
      changeTitle(backTitle);
      return props.navigation.navigate("Home");
    } else if (titles[1].includes(title)) {
      changeTitle("个人中心");
      return props.navigation.navigate("User");
    } else if (titles[2].includes(title)) {
      set_backTitle(title);
      changeTitle("区域选择");
      return props.navigation.navigate("Area");
    }
  };

  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25 }}>
      <Title
        title={title === "个人中心" ? "" : props.state.titles.title}
        onLeftPress={onAreaOrBack}
        titleLeft={
          <View style={{ display: title === "个人中心" ? "none" : "flex" }}>
            {
              ["区域选择", "消息", "工程态列表", "关于我们"].includes(title) ?
                <Image
                  style={{ width: 12, height: 18 }}
                  source={require("../../assets/images/icon/back.png")}
                /> :
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "300", fontSize: 12 }}>
                    {area}
                  </Text>
                  <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 8 }}>
                    <Image
                      style={{ width: 10, height: 5 }}
                      source={require("../../assets/images/icon/open_up.png")}
                    />
                  </View>
                </View>
            }
          </View>
        }
      />
      <Stack.Navigator initialRouteName="Home">
        {
          routers.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  headerShown: false,
                  ...item.title,
                }}
              />
            );
          })
        }
      </Stack.Navigator>
    </View>
  );
};
const titles = [
  ["区域选择"],
  ["消息", "工程态列表", "关于我们"],
  ["告警列表", "实时监控", "资源信息", "维护作业"],
  ["个人中心"]
];
const routers = [
  {
    title: "主页",
    name: "Home",
    component: Home,
    type: TransitionPresets.ScaleFromCenterAndroid
  },
  {
    title: "区域选择",
    name: "Area",
    component: Area,
    type: TransitionPresets.SlideFromRightIOS
  },
  {
    title: "消息",
    name: "MyMessage",
    component: MyMessage,
    type: TransitionPresets.SlideFromRightIOS
  },
  {
    title: "工程态列表",
    name: "EngineeringManagement",
    component: EngineeringManagement,
    type: TransitionPresets.SlideFromRightIOS
  },
  {
    title: "关于我们",
    name: "AboutUs",
    component: AboutUs,
    type: TransitionPresets.SlideFromRightIOS
  }
];
export default connect(state => ({ state }))(HomePage);
