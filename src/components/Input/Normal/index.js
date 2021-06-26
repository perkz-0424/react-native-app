import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Normal = (props) => {
  const onChange = (text) => {
    props.onChangeText && props.onChangeText(text);
  };
  return (
    <View style={styles.inputBox}>
      <View style={styles.inputContainer}>
        {props.leftImage ? props.leftImage : null}
        <TextInput
          maxLength={props.maxLength ? props.maxLength : null}
          onChangeText={onChange}
          style={styles.inputText}
          placeholder={props.placeholder}
          clear
          autoCapitalize="none"
          keyboardType="default"
          value={props.value}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
export default Normal;
