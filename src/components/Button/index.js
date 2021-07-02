import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = props => {
  const style = props.style ? props.style : {};
  return (
    <TouchableOpacity style={{ ...styles.buttonStyle, ...style }} onPress={props.onPress}>
      <Text style={styles.text}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#1D9AFF",
    width: "100%",
    height: 35,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    color: "#FFF",
  },
});
export default Button;
