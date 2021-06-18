import React, { useState, useMemo } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import config from "../../../config";
import api from "../../../servers/Login/index";
import Button from "../../../components/Button/index";

const LoginPage = props => {
  const [userName, set_userName] = useState(props.username);
  const [secure, set_secure] = useState(true);
  const [appType, set_appType] = useState("省电信");
  const [imageAddress, set_imageAddress] = useState("");
  const [imageSource, set_imageSource] = useState("data:image/jpeg;base64,123");//图形验证码的图
  const [code, set_code] = useState("");//图形验证码的值
  const [codeTitle, set_codeTitle] = useState("获取验证码");
  const [times, set_times] = useState(60);
  /*获取图形验证码*/
  const getImageCode = () => {
    api.getVerificationCode().then(res => {
      set_imageSource(`data:image/jpeg;base64,${res.img}`);
      set_code(res.key);
    });
  };
  /*跳转到阅读隐私权政策*/
  const showPerson = () => {
    props.navigation.navigate("Person");
  };
  const showForgetPwd = () => {
    props.navigation.navigate("ForgetPwd");
  }
  useMemo(() => {
    getImageCode();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image
          style={styles.iconImage}
          source={require("../../../assets/images/SDH/ic_launcher.png")}
        />
      </View>
      <View style={styles.bg}>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 13, height: 15 }}
                source={require("../../../assets/images/icon/yonghu.png")}
              />
            </View>
            <TextInput
              style={styles.inputText}
              placeholder="输入你的登录名"
              clear
              autoCapitalize="none"
              keyboardType="default"
              value={userName}
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 13, height: 15 }}
                source={require("../../../assets/images/icon/mima.png")}
              />
            </View>
            <TextInput
              style={styles.inputText}
              placeholder="输入你的密码"
              clear
              autoCapitalize="none"
              secureTextEntry={secure}
              keyboardType="default"
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
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="请输入验证码"
              clear
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          <TouchableWithoutFeedback style={{ justifyContent: "center" }} onPress={getImageCode}>
            <View style={{ justifyContent: "center", marginRight: 5 }}>
              <Image
                style={{ width: 80, height: 20 }}
                source={{ uri: imageSource }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="请输入手机或邮箱验证码"
              clear
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {}}>
            <View style={{ justifyContent: "center", marginRight: 5 }}>
              <View style={styles.line}>
                <Text style={{ fontSize: 10, color: "#1D9AFF" }}>{codeTitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.inputBox, ...{ marginTop: 15, borderBottomWidth: 0 } }}>
          <Button onPress={() => {props.navigation.navigate("NewDonghuanH5")}}>登录</Button>
        </View>
        <View style={{ ...styles.inputBox, ...{ marginTop: 15, borderBottomWidth: 0 } }}>
          <TouchableOpacity onPress={showForgetPwd}>
            <Text style={styles.text}>忘记密码</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ ...styles.versionContainer, ...{ marginBottom: 10 } }}>
          <Text style={styles.versionText}>
            登录即代表你已同意
            <Text
              onPress={showPerson}
              style={{ color: "#1D9AFF" }}>
              {" 隐私权政策"}
            </Text>
          </Text>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            {`浙江省邮电工程建设有限公司 版本号: ${config.version}`}
          </Text>
        </View>
      </View>
    </View>
  );
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
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "#FBFBFB",
  },
  icon: {
    top: 80,
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    shadowColor: "rgb(159, 205, 243)",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.4,
  },
  iconImage: {
    height: 86,
    width: 86,
    borderRadius: 15,
  },
  title: {
    marginTop: 20,
    fontSize: config.titleFontSizeBigBig,
    color: config.blue,
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    bottom: 0,
    justifyContent: "center",
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: 320,
    alignSelf: "center",
    borderWidth: 0,
    backgroundColor: "#1D9AFF",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  versionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 10 : 30,
  },
  text: {
    fontSize: config.textFontSize,
    color: "#1D9AFF",
  },
  versionText: {
    fontSize: 11,
    color: "grey",
  },
  close: {
    position: "absolute",
    right: 20,
    top: 40,
  },
  touchableOpacityLeft: {
    padding: 10,
    alignItems: "flex-start",
  },
  touchableOpacityRight: {
    padding: 10,
    alignItems: "flex-end",
  },
});

export default LoginPage;
