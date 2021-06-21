import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Dimensions, StyleSheet, Image, Platform, TouchableOpacity, Text } from "react-native";
import Title from "../../components/Title";
import Warning from "./Warning";
import Moint from "./Moint";
import Resours from "./Resours";
import Homework from "./Homework";
import User from "./User";

const Tab = createBottomTabNavigator();
const HomePage = () => {
  const [title, set_title] = useState("告警列表");
  const pressNavigationEvent = (name) => {
    switch (name) {
      case "Warning":
        set_title("告警列表");
        break;
      case "Moint":
        set_title("实时监控");
        break;
      case "Resours":
        set_title("资源信息");
        break;
      case "Homework":
        set_title("维护作业");
        break;
      case "User":
        set_title("个人中心");
        break;
      default:
        set_title("告警列表");
    }
  };
  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25 }}>
      {
        title !== "个人中心" ? <Title
          title={title}
          onLeftPress={() => {}}
          titleLeft={<View><Text>浙江</Text></View>}
        /> : null
      }
      <Tab.Navigator initialRouteName={"Warning"} lazy={true}>
        {
          bottomNav.map((item, index) => {
            return (
              <Tab.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  tabBarButton: (props) => {
                    return (
                      <TouchableOpacity {...props} onPress={() => {
                        props.onPress();
                        pressNavigationEvent(item.name);
                      }}><Image style={{
                        ...styles.image,
                        ...{
                          tintColor: props.accessibilityStates[0] === "selected" ? "#469af7" : "#9c9c9c"
                        }
                      }} source={item.icon}
                      /><Text style={{
                        fontSize: 9,
                        marginTop: 8,
                        fontWeight: "400",
                        color: props.accessibilityStates[0] === "selected" ? "#469af7" : "#9c9c9c"
                      }}>{item.title}
                      </Text>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            );
          })
        }
      </Tab.Navigator>
    </View>
  );
};
const bottomNav = [
  {
    name: "Warning",
    component: Warning,
    title: "告警",
    icon: require("../../assets/images/SDH/war.png")
  },
  {
    name: "Moint",
    component: Moint,
    title: "实时监控",
    icon: require("../../assets/images/SDH/moint.png")
  },
  {
    name: "Resours",
    component: Resours,
    title: "资源信息",
    icon: require("../../assets/images/SDH/resours.png")
  },
  {
    name: "Homework",
    component: Homework,
    title: "维护作业",
    icon: require("../../assets/images/SDH/homework.png")
  },
  {
    name: "User",
    component: User,
    title: "个人",
    icon: require("../../assets/images/SDH/person.png")
  },
];
const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 16,
  },
});
export default HomePage;
