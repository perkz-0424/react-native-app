import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import isBangsScreen from "../../assets/js/iPhone";

const Title = (props) => {
  const onPress = () => {
    props.onLeftPress && props.onLeftPress();
  };
  return (
    <View style={{
      backgroundColor: "#f3f3f3",
      borderBottomWidth: 0.2,
      borderColor: "rgba(156,156,156,0.5)",
    }}>
      <View style={{ height: isBangsScreen() ? 35 : 0 }}/>
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
          {props.titleLeft}
        </TouchableOpacity>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
        }}>
          <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
        </View>
        <View style={{ width: "20%" }}/>
      </View>
    </View>
  );
};

export default Title;
