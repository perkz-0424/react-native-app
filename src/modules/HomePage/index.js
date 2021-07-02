import React, { useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View, Dimensions, Platform, Text, Image } from "react-native";
import { connect } from "react-redux";
import Title from "../../components/Title";
import Home from "./Home";
import Area from "./Area";
import EngineeringManagement from "./EngineeringManagement";
import AboutUs from "./AboutUs";
import UserInfo from "./UserInfo";
import { abort } from "../../servers/Area";

const Stack = createStackNavigator();
const titles = [
  ["区域选择"],
  ["工程态列表", "关于我们", "个人资料"],
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
  },
  {
    title: "个人资料",
    name: "UserInfo",
    component: UserInfo,
    type: TransitionPresets.SlideFromRightIOS,
  }
];
const HomePage = (props) => {
  const { data, level } = props.state.areas;
  const [backTitle, set_backTitle] = useState("告警列表");
  const [homeTitle, set_homeTitle] = useState("告警列表");
  const setArea = () => data.filter(v => v.level === level)[0].name;
  const changeTitle = (title) => {
    set_homeTitle(title);
  };
  /*title左边的地域或者返回按钮*/
  const onAreaOrBack = () => {
    if (titles[0].includes(homeTitle)) {
      abort.abortCityWarningCounts && abort.abortCityWarningCounts();
      abort.abortTownWarningCounts && abort.abortTownWarningCounts();
      abort.abortStationByAIDAndNetType && abort.abortStationByAIDAndNetType();
      changeTitle(backTitle);
      return props.navigation.navigate("Home");
    } else if (titles[1].includes(homeTitle)) {
      changeTitle("个人中心");
      return props.navigation.navigate("User");
    } else if (titles[2].includes(homeTitle)) {
      set_backTitle(homeTitle);
      changeTitle("区域选择");
      return props.navigation.navigate("Area", {
        fromRouteName: homeTitle,//来自哪个页面
      });
    }
  };

  const leftIcon = () => {
    return (
      <View style={{ display: homeTitle === "个人中心" ? "none" : "flex" }}>
        {titles[0].concat(titles[1]).includes(homeTitle) ?
          <Image
            style={{ width: 12, height: 18 }}
            source={require("../../assets/images/icon/back.png")}
          /> :
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "300", fontSize: 12, }} numberOfLines={1} ellipsizeMode="tail">
              {setArea()}
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 8 }}>
              <Image
                style={{ width: 10, height: 5 }}
                source={require("../../assets/images/icon/open_up.png")}
              />
            </View>
          </View>}
      </View>
    );
  };

  const setTitle = (title) => {
    return title === "个人中心" ? "" : title;
  };
  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25 }}>
      <Title
        title={setTitle(homeTitle)}
        onLeftPress={onAreaOrBack}
        titleLeft={leftIcon()}
      />
      <Stack.Navigator initialRouteName="Home">
        {
          routers.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                options={{
                  headerShown: false,
                  ...item.type,
                }}
              >
                {(props) => <item.component {...props} changeTitle={changeTitle}/>}
              </Stack.Screen>
            );
          })
        }
      </Stack.Navigator>
    </View>
  );
};
export default connect(state => ({ state }))(HomePage);
