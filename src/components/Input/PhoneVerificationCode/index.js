import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const PhoneVerificationCode = (props) => {
  const onChange = (text) => {
    props.onChangeText && props.onChangeText(text);
  };
  const onPress = (v) => {
    props.onPress && props.onPress(v);
  };
  return(
    <View style={styles.inputBox}>
      <View style={styles.inputContainer}>
        {props.leftImage ? props.leftImage : null}
        <TextInput
          maxLength={15}
          onChangeText={onChange}
          style={styles.inputText}
          placeholder={props.placeholder}
          clear
          autoCapitalize="none"
          keyboardType="numeric"
          value={props.value}
        />
      </View>
      <TouchableOpacity style={{ justifyContent: "center" }} onPress={onPress}>
        <View style={{ justifyContent: "center", marginRight: 5 }}>
          <View style={styles.line}>
            <Text style={{ fontSize: 10, color: props.start ? "#9c9c9c" : "#1D9AFF" }}>
              {props.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
};
const styles = StyleSheet.create({
  line: {
    height: 20,
    width: 80,
    borderLeftWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderStyle: "solid",
    flexDirection: "row",
  },
  inputBox: {
    borderBottomWidth: 0.2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  inputText: {
    height: 45,
    marginLeft: 5,
    paddingLeft: 5,
  },
});
export default PhoneVerificationCode;
