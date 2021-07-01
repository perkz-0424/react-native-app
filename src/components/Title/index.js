import React from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import isBangsScreen from "../../assets/js/iPhone";

const Title = (props) => {
  const onPress = () => {
    props.onLeftPress && props.onLeftPress();
  };

  const onRightPress = () => {
    props.onRightPress && props.onRightPress();
  };
  let height = 0;
  if (Platform.OS === "ios") {
    if (isBangsScreen()) {
      height = 35; //是刘海屏
    } else {
      height = 20;
    }
  }
  return (
    <View style={{
      backgroundColor: "#e7e6e6",
      borderBottomWidth: 0.3,
      borderColor: "rgba(156,156,156,0.3)",
    }}>
      <View style={{ height }}/>
      <View style={{
        width: "100%",
        height: 35,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}>
        <TouchableOpacity onPress={onPress} style={{
          paddingLeft: 15,
          height: "100%",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          elevation: 2,
          width: "20%",
        }}>
          {props.titleLeft ? props.titleLeft : null}
        </TouchableOpacity>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
        }}>
          <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
        </View>
        <TouchableOpacity onPress={onRightPress} style={{
          paddingRight: 15,
          height: "100%",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          elevation: 2,
          width: "20%",
          alignItems: "flex-end"
        }}>
          {props.titleRight ? props.titleRight : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Title;
