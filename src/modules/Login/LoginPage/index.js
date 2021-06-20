import React, { useState, useMemo, useEffect } from "react";
import {
  View, Alert, StyleSheet, Dimensions,
  Image, Platform, TextInput, Text, Keyboard,
  TouchableWithoutFeedback, TouchableOpacity,
} from "react-native";
import config from "../../../config";
import api from "../../../servers/Login/index";
import Button from "../../../components/Button/index";

const LoginPage = props => {
  const [userName, set_userName] = useState("");//用户名
  const [password, set_password] = useState("");//密码
  const [imageCode, set_imageCode] = useState("");//图形码
  const [phoneOrMailCode, set_phoneOrMailCode] = useState("");//手机或邮箱验证码
  const [secure, set_secure] = useState(true);//密码对否可见
  const [imageSource, set_imageSource] = useState("data:image/jpeg;base64,111");//图形验证码的图
  const [code, set_code] = useState("");//图形验证码的值
  const [codeKey, set_codeKey] = useState("");
  const [start, set_start] = useState(false);//是否开始计时
  let [times, set_times] = useState(60);//计时时间
  let workForTiming = null;
  /*计时*/
  const startTiming = () => {
    rollBackTiming();
    set_start(true);
    workForTiming = setInterval(() => {
      set_times(--times);
      if (times === 0) {
        rollBackTiming();
      }
    }, 1000);
  };
  /*计时回滚*/
  const rollBackTiming = () => {
    clearInterval(workForTiming);
    set_times(60);
    set_start(false);
  };
  /*获取图形验证码*/
  const getImageCode = () => {
    api.getVerificationCode().then(res => {
      set_imageSource(`data:image/jpeg;base64,${res.img}`);
      set_code(res.key);
      set_codeKey(`${res.key}00000000000000000000000000000000`);
    });
  };
  /*发送验证码接口调用*/
  const getSendVerification = () => {

  };
  /*登录接口调用*/
  const getOnLogin = () => {

  };
  /*跳转到阅读隐私权政策*/
  const showPerson = () => {
    props.navigation.navigate("Person");
  };
  /*跳转到忘记密码*/
  const showForgetPwd = () => {
    props.navigation.navigate("ForgetPwd");
  };
  const userNameChange = text => {
    set_userName(text);
  };
  const passwordChange = text => {
    set_password(text);
  };
  const imageCodeChange = text => {
    set_imageCode(text);
  };
  const phoneOrMailCodeChange = text => {
    set_phoneOrMailCode(text);
  };
  /*判断图形验证码是否正确*/
  const isTrueImageCode = () => {
    const { imagePwd, imageIv } = config;
    // const decipher = crypto.createDecipheriv("aes-128-cbc", imagePwd, imageIv);
    // decipher.setAutoPadding(false);
    // let dec = decipher.update(codeKey, "hex", "utf8");
    // dec += decipher.final("utf8");
    // const dict = dec.split("");
    // const correct = dict[0] + dict[1] + dict[2] + dict[3];
    return true;
  };
  /*弹出错误警告*/
  const alertError = (message) => {
    return Alert.alert("警告", message, [{ text: "确定" }]);
  };
  /*是否可以掉接口*/
  const ready = (condition, message, callback) => {
    if (condition) {
      return alertError(message);
    } else {
      if (isTrueImageCode()) {
        callback();
      } else {
        return alertError("图形验证码错误");
      }
    }
  };
  /*点击发送二维码*/
  const sendVerification = () => {
    if (!start) {
      ready(!userName || !password || !imageCode,
        "请输入登录名、密码和图形验证码",
        () => {
          startTiming();
          getSendVerification();
        });
      Keyboard.dismiss();
    }
  };
  /*登录*/
  const onLogin = () => {
    ready(!userName || !password || !imageCode || !phoneOrMailCode,
      "请输入登录名、密码、图形验证码和手机或邮箱验证码",
      getOnLogin);
  };

  useMemo(() => {
    getImageCode();
  }, []);

  useEffect(() => {
    return () => {
      rollBackTiming();
    };
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
              onChangeText={userNameChange}
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
              onChangeText={passwordChange}
              style={styles.inputText}
              placeholder="输入你的密码"
              clear
              autoCapitalize="none"
              secureTextEntry={secure}
              keyboardType="default"
              value={password}
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
              onChangeText={imageCodeChange}
              style={styles.inputText}
              placeholder="请输入验证码"
              clear
              autoCapitalize="none"
              keyboardType="default"
              value={imageCode}
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
              maxLength={6}
              onChangeText={phoneOrMailCodeChange}
              style={styles.inputText}
              placeholder="请输入电信手机或邮箱验证码"
              clear
              autoCapitalize="none"
              keyboardType="numeric"
              value={phoneOrMailCode}
            />
          </View>
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={sendVerification}>
            <View style={{ justifyContent: "center", marginRight: 5 }}>
              <View style={styles.line}>
                <Text style={{ fontSize: 10, color: start ? "#9c9c9c" : "#1D9AFF" }}>{
                  start ? `${times}秒后重新获取` : "获取验证码"
                }</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.inputBox, ...{ marginTop: 15, borderBottomWidth: 0 } }}>
          <Button onPress={onLogin}>登录</Button>
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
    height: Dimensions.get("window").width / 5.5,
    width: Dimensions.get("window").width / 5.5,
    borderRadius: Dimensions.get("window").width / 30,
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
