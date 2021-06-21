import React, { useState, useEffect, useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Dimensions, StyleSheet, Image, Platform } from "react-native";
import Title from "../../components/Title";
import Warning from "./Warning";
import Moint from "./Moint";
import Resours from "./Resours";
import Homework from "./Homework";
import User from "./User";

const Tab = createBottomTabNavigator();
const HomePage = ({ navigation }) => {
  const [title, set_title] = useState("告警列表");
  const pressNavigationEvent = (e) => {
    console.log(e);
  };

  useMemo(() => {

  }, []);

  useEffect(() => {
    return () => {

    };
  }, []);
  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 24.5 }}>
      <Title
        title={title}
        onLeftPress={() => {}}
        titleLeft={<View></View>}
      />
      <Tab.Navigator initialRouteName={"Warning"} lazy={true}>
        {
          bottomNav.map((item, index) => {
            return (
              <Tab.Screen
                name={item.name}
                component={item.component}
                options={{
                  title: item.title,
                  tabBarIcon: ({ color }) => (
                    <Image
                      style={{ ...styles.image, ...{ tintColor: color } }}
                      source={item.icon}
                    />
                  ),
                }} key={index}/>
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
