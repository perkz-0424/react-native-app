import React from "react";
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";

const ImageVerificationCode = (props) => {
  const onChange = (text) => {
    props.onChangeText && props.onChangeText(text);
  };
  const onPress = (v) => {
    props.onPress && props.onPress(v);
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
      <TouchableWithoutFeedback style={{ justifyContent: "center" }} onPress={onPress}>
        <View style={{ justifyContent: "center", marginRight: 5 }}>
          <Image
            style={{ width: 80, height: 20 }}
            source={{ uri: props.uri }}
          />
        </View>
      </TouchableWithoutFeedback>
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
export default ImageVerificationCode;
