import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const UserButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(238,238,238,1)",
      }}
      onPress={props.onPress}
    >
      <Text style={{ marginLeft: 20, fontSize: 16 }}>
        {props.children}
      </Text>
      <Image
        style={{ width: 7, height: 13, marginRight: 20 }}
        source={require("../../assets/images/icon/type_right.png")}
      />
    </TouchableOpacity>
  );
};
export default UserButton;
