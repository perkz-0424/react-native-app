import React, { useState, useMemo, useEffect } from "react";
import { View, Alert, StyleSheet, Dimensions, Text, Keyboard, Image, Platform, TouchableOpacity } from "react-native";
import { Password, Normal, ImageVerificationCode, PhoneVerificationCode } from "../../../components/Input/index";
import { connect } from "react-redux";
import { Icon } from "@ant-design/react-native";
import config from "../../../config";
import api from "../../../servers/Login/index";
import Button from "../../../components/Button/index";
import Loading from "../../../components/Loading";
import { encrypt } from "../../../assets/crypto";
import { clearAllCookie, setCookie } from "../../../assets/cookie";
import messages from "../../../assets/js/message";
import errorMessage from "../../../components/errorMessage";
import { data } from "../../../store/dataSource";

const LoginPage = props => {
  const [userName, set_userName] = useState("");//用户名
  const [password, set_password] = useState("");//密码
  const [imageCode, set_imageCode] = useState("");//图形码
  const [phoneOrMailCode, set_phoneOrMailCode] = useState("");//手机或邮箱验证码
  const [imageSource, set_imageSource] = useState("data:image/jpeg;base64,111");//图形验证码的图
  const [code, set_code] = useState("");//图形验证码的值
  const [start, set_start] = useState(false);//是否开始计时
  const [loading, set_loading] = useState(false);
  const [remainDays, set_remainDays] = useState(0);
  let [times, set_times] = useState(60);//计时时间
  const token = props.state.token.value;
  let workForTiming = null;
  /*计时*/
  const startTiming = () => {
    workForTiming && rollBackTiming();
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
    });
  };
  /*发送验证码接口调用*/
  const getSendVerification = () => {
    api.sendPhoneOrMailVerificationCode(
      encrypt(userName),
      encrypt(password),
      imageCode.toUpperCase()
      //没有method短信和邮箱都发送
    ).then(res => {
      if (res.msg !== "success") {
        failSend(res.message);
      } else {
        startTiming();//成功发送，开始倒计时
      }
    }).catch(() => {failSend("发送失败");});
  };
  /*登录接口调用*/
  const getOnLogin = () => {
    set_loading(true);
    api.onLogin(
      encrypt(userName),
      encrypt(password),
      imageCode.toUpperCase(),
      encrypt(phoneOrMailCode),
    ).then(res => {
      set_loading(false);
      if (res.token || res.message === "success") {
        const RD = parseInt(res["remain_days"], 10);//距离过期还剩多少天
        set_remainDays(RD);
        if (RD) {
          if (RD > 10 && RD <= 20) {
            // TODO: 密码快超期（10-20）
          } else if (RD > 0 && RD <= 10) {
            setCookie("temp_token", res.token);//存临时的token用于重置密码
            props.navigation.navigate("ForcedPasswordChange");//跳至强制修改密码
            set_password("");
            set_phoneOrMailCode("");
            set_imageCode("");
          } else if (RD === -1) {
            errorMessage("用户已被锁定，请联系管理员");
            getImageCode();
          }
        } else {
          props.dispatch(dispatch => {
            dispatch({ type: "TOKEN", payload: { value: res.token } });
          });
          saveUserMessage(res);
        }
      } else {
        getImageCode();
        errorMessage(messages[res.message]);
      }
    }).catch(() => {
      errorMessage();
      getImageCode();
      set_loading(false);
    });
  };
  /*发送失败*/
  const failSend = (message) => {
    rollBackTiming();
    getImageCode();
    errorMessage(message);
  };
  /*存储用户信息*/
  const saveUserMessage = (res) => {
    props.dispatch(dispatch => {
      dispatch({ type: "USER", payload: { message: { ...res } } });
    });
    setCookie("token", res.token);//存token
    props.navigation.navigate("HomePage");//打开页面
    set_phoneOrMailCode("");
    set_imageCode("");
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
    //TODO: 前端没办法解密图形验证码 config.imageKey、config.imageIv分别是解密的key和iv
    return true;
  };
  /*弹出错误警告*/
  const alertError = (message) => {
    return Alert.alert("警告", message, [{ text: "确定" }]);
  };
  /*是否可以调接口*/
  const ready = (condition, message, callback) => {
    return new Promise((resolve) => {
      if (condition) {
        return alertError(message);
      } else {
        if (isTrueImageCode()) {
          callback();
          return resolve();
        } else {
          return alertError("图形验证码错误");
        }
      }
    });
  };
  /*点击发送二维码*/
  const sendVerification = () => {
    const condition = !userName || !password || !imageCode;
    const message = "请输入登录名、密码和图形验证码";
    if (!start) {
      ready(condition, message, () => {
        getSendVerification();
      }).then(() => {
        Keyboard.dismiss();
      });
    }
  };
  /*登录*/
  const onLogin = () => {
    const condition = !userName || !password || !imageCode || !phoneOrMailCode;
    const message = "请输入登录名、密码、图形验证码和手机或邮箱验证码";
    ready(condition, message, getOnLogin).then(() => {
      Keyboard.dismiss();
    });
  };

  const LeftIcon = (type) => {
    switch (type) {
      case "yonghu":
        return (
          <View style={styles.inputTitle}>
            <Icon name="user" size="md" color="#9c9c9c"/>
          </View>
        );
      case "mima":
        return (
          <View style={styles.inputTitle}>
            <Icon name="lock" size="md" color="#9c9c9c"/>
          </View>
        );
      default:
    }
  };
  /*初始化*/
  const init = () => {
    clearAllCookie();//清空cookie
    props.dispatch(dispatch => {//重置数据源
      dispatch({ type: "TITLE", payload: { ...data.titles } });
      dispatch({ type: "USER", payload: { ...data.userMessage } });
      dispatch({ type: "AREA", payload: { ...data.ares } });
      dispatch({ type: "TOKEN", payload: { ...data.token } });
    });
  };
  useMemo(() => {
    getImageCode();
  }, [token]);

  useEffect(() => {
    init();
    return () => {
      rollBackTiming();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Loading loading={loading} text="登入中"/>
      <View style={styles.icon}>
        <Image
          style={styles.iconImage}
          source={require("../../../assets/images/SDH/ic_launcher.png")}
        />
      </View>
      <View style={styles.bg}>
        <Normal
          leftImage={LeftIcon("yonghu")}
          onChangeText={userNameChange}
          value={userName}
          placeholder="输入你的登录名"
        />
        <Password
          leftImage={LeftIcon("mima")}
          onChangeText={passwordChange}
          placeholder="输入你的密码"
          value={password}
        />
        <ImageVerificationCode
          maxLength={4}
          onChangeText={imageCodeChange}
          placeholder="请输入验证码"
          onPress={getImageCode}
          value={imageCode}
          uri={imageSource}
        />
        <PhoneVerificationCode
          maxLength={15}
          placeholder="请输入电信手机或邮箱验证码"
          onChangeText={phoneOrMailCodeChange}
          value={phoneOrMailCode}
          onPress={sendVerification}
          start={start}
          title={start ? `${times}秒后重新获取` : "获取验证码"}
        />
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
  inputBox: {
    borderBottomWidth: 0.2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  inputTitle: {
    marginLeft: 10,
    justifyContent: "center",
    width: 20,
    alignItems: "center"
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

export default connect(state => ({ state }))(LoginPage);
