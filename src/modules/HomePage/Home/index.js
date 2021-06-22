import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Warning from "../Warning";
import Moint from "../Moint";
import Resours from "../Resours";
import Homework from "../Homework";
import User from "../User";

const bottomNav = [
  {
    name: "Warning",
    component: Warning,
    title: "告警",
    icon: require("../../../assets/images/SDH/war.png")
  },
  {
    name: "Moint",
    component: Moint,
    title: "实时监控",
    icon: require("../../../assets/images/SDH/moint.png")
  },
  {
    name: "Resours",
    component: Resours,
    title: "资源信息",
    icon: require("../../../assets/images/SDH/resours.png")
  },
  {
    name: "Homework",
    component: Homework,
    title: "维护作业",
    icon: require("../../../assets/images/SDH/homework.png")
  },
  {
    name: "User",
    component: User,
    title: "个人",
    icon: require("../../../assets/images/SDH/person.png")
  },
];
const Tab = createBottomTabNavigator();
const Home = props => {
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
    <View style={{ width: "100%", flex: 1 }}>
      <Tab.Navigator initialRouteName={"Warning"} lazy={true}>
        {
          bottomNav.map((item, index) => {
            return (
              <Tab.Screen key={index} name={item.name} component={item.component} options={{
                tabBarButton: (props) => {
                  const color = props.accessibilityStates[0] === "selected" ? "#469af7" : "#9c9c9c";
                  return (
                    <TouchableOpacity {...props} onPress={() => {
                      props.onPress();
                      pressNavigationEvent(item.name);
                    }}>
                      <Image style={{ width: 17, height: 16, tintColor: color }} source={item.icon}/>
                      <Text style={{ fontSize: 9, marginTop: 8, fontWeight: "400", color: color }}>
                        {item.title}
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

export default Home;
