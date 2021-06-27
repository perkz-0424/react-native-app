import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const Password = (props) => {
  const [secure, set_secure] = useState(true);//密码对否可见
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
          secureTextEntry={secure}
          keyboardType="default"
          value={props.value}
        />
      </View>
      <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {set_secure(!secure);}}>
        <View style={{ justifyContent: "center", marginRight: 10 }}>
          {secure ? <Image
            style={styles.eyes}
            source={require("../../../assets/images/SDH/closeEyes.png")}
          /> : <Image
            style={styles.eyes}
            source={require("../../../assets/images/SDH/openEyes.png")}
          />}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  eyes: {
    marginTop: 15,
    marginBottom: 15,
    height: 9,
    width: 17,
    alignSelf: "flex-end",
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
  inputTitle: {
    marginLeft: 10,
    justifyContent: "center",
    width: 20,
  },
});
export default Password;
