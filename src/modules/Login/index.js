import React from "react";
import { KeyboardAvoidingView, Dimensions } from "react-native";
import LoginPage from "./LoginPage";
import isBangsScreen from "../../assets/js/iPhone";

const Login = props => {
  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.container}
      keyboardVerticalOffset={isBangsScreen() ? -200 : -90}
    >
      <LoginPage {...props}/>
    </KeyboardAvoidingView>
  );
};
const styles = {
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "#FBFBFB",
  },
};
export default Login;
