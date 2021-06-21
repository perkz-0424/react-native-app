import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Dimensions, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import Title from "../../components/Title";

const HomePage = () => {
  const [title, set_title] = useState("告警列表");
  const [active, set_active] = useState("告警");

  const changeNav = (title) => {
    if (title !== active) {
      set_active(title);
      switch (title) {
        case "告警":
          set_title("告警列表");
          break;
        case "实时监控":
          set_title("实时监控");
          break;
        case "资源信息":
          set_title("资源信息");
          break;
        case "维护作业":
          set_title("维护作业");
          break;
        case "个人":
          set_title("个人");
          break;
        default:
          set_title("告警列表");
      }
    }
  };

  useMemo(() => {

  }, []);

  useEffect(() => {
    return () => {

    };
  }, []);
  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <Title
        title={title}
        onLeftPress={() => {}}
        titleLeft={
          <View>

          </View>
        }
      />
      <View>

      </View>
      <View style={styles.navContainer}>
        {
          bottomNav.map((item, index) => {
            return (
              <TouchableOpacity style={styles.iconContainer} key={index} onPress={() => {changeNav(item.title);}}>
                <Image style={active === item.title ? styles.activeImage : styles.image} source={item.icon}/>
                <Text style={active === item.title ? styles.activeText : styles.text}>{item.title}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    </View>
  );
};
const bottomNav = [
  {
    title: "告警",
    icon: require("../../assets/images/SDH/war.png")
  },
  {
    title: "实时监控",
    icon: require("../../assets/images/SDH/moint.png")
  },
  {
    title: "资源信息",
    icon: require("../../assets/images/SDH/resours.png")
  },
  {
    title: "维护作业",
    icon: require("../../assets/images/SDH/homework.png")
  },
  {
    title: "个人",
    icon: require("../../assets/images/SDH/person.png")
  },
];
const styles = StyleSheet.create({
  navContainer: {
    width: "100%",
    height: 60,
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    marginBottom: Platform.OS === "ios" ? 0 : 24,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 0.3,
    paddingTop: 10,
    backgroundColor: "#e7e6e6",
    borderColor: "rgba(156,156,156,0.3)",
  },
  iconContainer: {
    alignItems: "center"
  },
  image: {
    width: 15,
    height: 15,
    tintColor: "#808080",
    marginBottom: 7
  },
  text: {
    color: "#808080",
    fontWeight: "400",
    fontSize: 10
  },
  activeImage: {
    width: 15,
    height: 15,
    tintColor: "#4a7cf4",
    marginBottom: 7
  },
  activeText: {
    color: "#4a7cf4",
    fontWeight: "400",
    fontSize: 10
  }
});
export default HomePage;
